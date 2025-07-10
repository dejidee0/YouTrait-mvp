"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "../lib/store";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function AuthForm({ onSuccess }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");

  const { signUp, signIn, loading } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let result;
      if (isSignUp) {
        result = await signUp(
          formData.email,
          formData.password,
          formData.username
        );
      } else {
        result = await signIn(formData.email, formData.password);
      }

      if (result.error) {
        setError(result.error.message);
      } else {
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? "Join YOUTRAIT" : "Welcome Back"}
          </h2>
          <p className="text-gray-300">
            {isSignUp
              ? "Create your trait identity"
              : "Sign in to your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <div>
              <Label htmlFor="username" className="text-white mb-2 block">
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
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-white mb-2 block">
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
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white mb-2 block">
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
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl"
          >
            {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gray-300 hover:text-white transition-colors"
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
