"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TraitBubble from "./TraitBubble";
import { SAMPLE_TRAITS } from "../lib/constants";

export default function TraitCloud() {
  const [traits, setTraits] = useState([]);
  const [selectedTrait, setSelectedTrait] = useState(null);

  useEffect(() => {
    const traitData = SAMPLE_TRAITS.slice(0, 30).map((trait) => ({
      name: trait,
      endorsements: Math.floor(Math.random() * 100) + 1,
      users: Math.floor(Math.random() * 50) + 1,
    }));
    setTraits(traitData);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23d1d5db%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10 pointer-events-none z-0" />

      {/* Header */}
      <div className="relative z-10 text-center py-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Trait Cloud
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Explore the universe of human traits
        </p>
      </div>

      {/* Trait Grid */}
      <div className="relative z-10 px-4 pb-16">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 justify-items-center">
          {traits.map((trait, index) => (
            <motion.div
              key={trait.name}
              animate={{ y: ["0%", "-8%", "0%"] }}
              transition={{
                duration: 2 + Math.random() * 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                type: "tween",
              }}
              whileHover={{ scale: 1.1 }}
              className="w-full flex justify-center"
            >
              <TraitBubble
                trait={trait.name}
                size="md"
                endorsements={trait.endorsements}
                onClick={() => setSelectedTrait(trait)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Trait Modal */}
      {selectedTrait && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 left-4 right-4 md:left-1/4 md:right-1/4 bg-white border border-gray-200 shadow-xl rounded-xl p-6 z-[9999]"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-900 capitalize">
              {selectedTrait.name}
            </h3>
            <button
              onClick={() => setSelectedTrait(null)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-yellow-500 text-2xl font-bold">
                {selectedTrait.endorsements}
              </p>
              <p className="text-gray-500 text-sm">Endorsements</p>
            </div>
            <div>
              <p className="text-green-500 text-2xl font-bold">
                {selectedTrait.users}
              </p>
              <p className="text-gray-500 text-sm">Users</p>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-all text-sm">
              View People with this Trait
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
