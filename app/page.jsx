"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamic imports to prevent SSR issues
const WelcomeScreen = dynamic(() => import("../components/WelcomeScreen"), {
  ssr: false,
});
const AuthForm = dynamic(() => import("../components/AuthForm"), {
  ssr: false,
});
const TraitSelection = dynamic(() => import("../components/TraitSelection"), {
  ssr: false,
});
const MainLayout = dynamic(() => import("../components/MainLayout"), {
  ssr: false,
});
const Feed = dynamic(() => import("../components/Feed"), { ssr: false });
const TraitCloud = dynamic(() => import("../components/TraitCloud"), {
  ssr: false,
});
const Games = dynamic(() => import("../components/Games"), { ssr: false });
const Besties = dynamic(() => import("../components/Besties"), { ssr: false });
const Notifications = dynamic(() => import("../components/Notifications"), {
  ssr: false,
});
const Profile = dynamic(() => import("../components/Profile"), { ssr: false });

// Dynamic store import
const useStore = dynamic(
  () => import("../lib/store").then((mod) => ({ default: mod.useStore })),
  { ssr: false }
);
const supabase = dynamic(
  () => import("../lib/supabase").then((mod) => ({ default: mod.supabase })),
  { ssr: false }
);

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState("welcome");
  const [activeTab, setActiveTab] = useState("feed");
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check for existing session
    const checkSession = async () => {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey);
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session) {
            setUser(session.user);
            setCurrentStep("main");
          }

          // Listen for auth changes
          const {
            data: { subscription },
          } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN") {
              setUser(session.user);
              setCurrentStep("traits");
            } else if (event === "SIGNED_OUT") {
              setUser(null);
              setCurrentStep("welcome");
            }
          });

          return () => subscription.unsubscribe();
        }
      } catch (error) {
        console.error("Auth error:", error);
      }
    };

    checkSession();
  }, [mounted]);

  const handleWelcomeContinue = () => {
    setCurrentStep("auth");
  };

  const handleAuthSuccess = () => {
    setCurrentStep("traits");
  };

  const handleTraitSelectionComplete = (selectedTraits) => {
    // In a real app, save traits to database
    console.log("Selected traits:", selectedTraits);
    setCurrentStep("main");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "feed":
        return <Feed />;
      case "cloud":
        return <TraitCloud />;
      case "games":
        return <Games />;
      case "besties":
        return <Besties />;
      case "notifications":
        return <Notifications />;
      case "profile":
        return <Profile />;
      default:
        return <Feed />;
    }
  };

  // Show loading state until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Render different steps
  if (currentStep === "welcome") {
    return <WelcomeScreen onContinue={handleWelcomeContinue} />;
  }

  if (currentStep === "auth") {
    return <AuthForm onSuccess={handleAuthSuccess} />;
  }

  if (currentStep === "traits") {
    return <TraitSelection onComplete={handleTraitSelectionComplete} />;
  }

  if (currentStep === "main") {
    return (
      <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderTabContent()}
      </MainLayout>
    );
  }

  return null;
}
