"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TraitBubble from "./TraitBubble";
import { SAMPLE_TRAITS } from "../lib/constants";

export default function TraitCloud() {
  const [traits, setTraits] = useState([]);
  const [selectedTrait, setSelectedTrait] = useState(null);

  useEffect(() => {
    // Create trait data with random endorsements and positions
    const traitData = SAMPLE_TRAITS.map((trait) => ({
      name: trait,
      endorsements: Math.floor(Math.random() * 100) + 1,
      users: Math.floor(Math.random() * 50) + 1,
      x: Math.random() * 80 + 10, // 10% to 90% of screen width
      y: Math.random() * 80 + 10, // 10% to 90% of screen height
    }));
    setTraits(traitData);
  }, []);

  const handleTraitClick = (trait) => {
    setSelectedTrait(trait);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center py-8">
        <h2 className="text-4xl font-bold text-white mb-2">Trait Cloud</h2>
        <p className="text-gray-300">Explore the universe of human traits</p>
      </div>

      {/* Trait Cloud */}
      <div className="relative z-10 px-4 h-96">
        {traits.map((trait, index) => (
          <motion.div
            key={trait.name}
            className="absolute"
            style={{
              left: `${trait.x}%`,
              top: `${trait.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
          >
            <TraitBubble
              trait={trait.name}
              size="md"
              endorsements={trait.endorsements}
              onClick={() => handleTraitClick(trait)}
            />
          </motion.div>
        ))}
      </div>

      {/* Selected Trait Details */}
      {selectedTrait && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 left-4 right-4 bg-black/50 backdrop-blur-md rounded-xl p-6 z-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white capitalize">
              {selectedTrait.name}
            </h3>
            <button
              onClick={() => setSelectedTrait(null)}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-yellow-400 text-2xl font-bold">
                {selectedTrait.endorsements}
              </p>
              <p className="text-gray-300 text-sm">Endorsements</p>
            </div>
            <div>
              <p className="text-green-400 text-2xl font-bold">
                {selectedTrait.users}
              </p>
              <p className="text-gray-300 text-sm">Users</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl">
              View People with this Trait
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
