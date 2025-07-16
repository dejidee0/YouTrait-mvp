"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const bubbleVariants = {
  animate: {
    y: [0, -20, 0],
    x: [0, 20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const bubbleColors = [
  "bg-pink-400",
  "bg-purple-400",
  "bg-indigo-400",
  "bg-fuchsia-500",
  "bg-purple-600",
  "bg-pink-600",
  "bg-violet-500",
];

const generateBubbles = (count = 10) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 60) + 20,
    color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 5,
  }));

export default function AuthForm({ onSuccess }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    setMounted(true);
    setBubbles(generateBubbles(12)); // generate 12 bubbles
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      let result;
      if (isSignUp) {
        result = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: { username: formData.username },
          },
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
      }

      if (result.error) {
        setError(result.error.message);
      } else {
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#2a0845] via-[#6441a5] to-[#1c1c1c] overflow-hidden">
      {/* Bouncing Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          variants={bubbleVariants}
          animate="animate"
          className={`absolute rounded-full opacity-30 ${bubble.color}`}
          style={{
            width: bubble.size,
            height: bubble.size,
            top: `${bubble.top}%`,
            left: `${bubble.left}%`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md p-8 rounded-2xl shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md text-white z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 drop-shadow-sm">
            {isSignUp ? "Join YOUTRAIT" : "Welcome Back"}
          </h2>
          <p className="text-sm text-white/70">
            {isSignUp
              ? "Create your trait identity"
              : "Sign in to your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <Label htmlFor="username" className="text-white/80 block mb-1">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a unique username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
                className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-purple-400"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-white/80 block mb-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-purple-400"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white/80 block mb-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-purple-400"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-fuchsia-600 to-indigo-700 hover:from-fuchsia-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl"
          >
            {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Need an account? Sign up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
