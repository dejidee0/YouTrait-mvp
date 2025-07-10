"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useStore } from "../lib/store";
import WelcomeScreen from "../components/WelcomeScreen";
import AuthForm from "../components/AuthForm";
import TraitSelection from "../components/TraitSelection";
import MainLayout from "../components/MainLayout";
import Feed from "../components/Feed";
import TraitCloud from "../components/TraitCloud";
import Games from "../components/Games";
import Besties from "../components/Besties";
import Notifications from "../components/Notifications";
import Profile from "../components/Profile";

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState("welcome");
  const [activeTab, setActiveTab] = useState("feed");
  const { user, setUser } = useStore();

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setCurrentStep("main");
      }
    };

    checkSession();

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
  }, [setUser]);

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
