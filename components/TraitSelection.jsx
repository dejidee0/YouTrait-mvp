"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TraitBubble from "./TraitBubble";
import { SAMPLE_TRAITS } from "../lib/constants";
import { generateTraitSuggestions } from "../lib/openai";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

export default function TraitSelection({ onComplete }) {
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [suggestedTraits, setSuggestedTraits] = useState([]);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSuggestedTraits(SAMPLE_TRAITS.slice(0, 15));
  }, []);

  const handleTraitClick = (trait) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter((t) => t !== trait));
    } else if (selectedTraits.length < 10) {
      setSelectedTraits([...selectedTraits, trait]);
    }
  };

  const handleAISuggestions = async () => {
    if (!bio.trim()) return;

    setLoading(true);
    try {
      const suggestions = await generateTraitSuggestions(bio, selectedTraits);
      setSuggestedTraits([...new Set([...suggestions, ...suggestedTraits])]);
    } catch (error) {
      console.error("Error getting AI suggestions:", error);
    }
    setLoading(false);
  };

  const handleComplete = () => {
    if (selectedTraits.length >= 3) {
      onComplete(selectedTraits);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Traits
          </h2>
          <p className="text-gray-300 text-lg">
            Select {selectedTraits.length}/10 traits that define who you are
          </p>
        </div>

        {/* Bio input for AI suggestions */}
        <div className="mb-8 max-w-md mx-auto">
          <Label htmlFor="bio" className="text-white mb-2 block">
            Tell us about yourself (optional)
          </Label>
          <div className="flex gap-2">
            <Input
              id="bio"
              placeholder="I'm a creative person who loves..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
            <Button
              onClick={handleAISuggestions}
              disabled={loading || !bio.trim()}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6"
            >
              {loading ? "..." : "AI"}
            </Button>
          </div>
        </div>

        {/* Selected traits display */}
        <div className="mb-8">
          <h3 className="text-white text-xl font-semibold mb-4 text-center">
            Your Selected Traits
          </h3>
          <div className="flex flex-wrap gap-4 justify-center min-h-[100px] items-center">
            {selectedTraits.length === 0 ? (
              <p className="text-gray-400 text-center">
                No traits selected yet
              </p>
            ) : (
              selectedTraits.map((trait, index) => (
                <TraitBubble
                  key={trait}
                  trait={trait}
                  size="lg"
                  onClick={() => handleTraitClick(trait)}
                  isActive={true}
                  delay={index * 0.1}
                />
              ))
            )}
          </div>
        </div>

        {/* Available traits */}
        <div className="mb-8">
          <h3 className="text-white text-xl font-semibold mb-4 text-center">
            Available Traits
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-items-center">
            {suggestedTraits
              .filter((trait) => !selectedTraits.includes(trait))
              .map((trait, index) => (
                <TraitBubble
                  key={trait}
                  trait={trait}
                  size="md"
                  onClick={() => handleTraitClick(trait)}
                  delay={index * 0.05}
                />
              ))}
          </div>
        </div>

        {/* Progress and continue */}
        <div className="text-center">
          <div className="mb-4">
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(selectedTraits.length / 10) * 100}%` }}
              />
            </div>
            <p className="text-gray-300 text-sm">
              {selectedTraits.length}/10 traits selected
            </p>
          </div>

          <Button
            onClick={handleComplete}
            disabled={selectedTraits.length < 3}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl disabled:opacity-50"
          >
            {selectedTraits.length < 3
              ? "Select at least 3 traits"
              : "Complete Profile"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
