"use client";

import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { LOTTIE_ANIMATIONS } from "../lib/constants";

export default function WelcomeScreen({ onContinue }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="mb-8"
        >
          <Player
            autoplay
            loop
            src={LOTTIE_ANIMATIONS.WELCOME}
            className="w-32 h-32 mx-auto"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-6xl font-bold text-white mb-4"
        >
          YOU<span className="text-yellow-400">TRAIT</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl text-gray-300 mb-12 max-w-md mx-auto"
        >
          Discover yourself through traits, not images. Connect with your true
          identity.
        </motion.p>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Continue
        </motion.button>

        {/* Floating traits */}
        <div className="absolute inset-0 pointer-events-none">
          {["creative", "bold", "kind", "witty", "loyal"].map(
            (trait, index) => (
              <motion.div
                key={trait}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [-20, -100, -200],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeOut",
                }}
                className="absolute text-white/40 text-sm font-medium"
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${60 + index * 10}%`,
                }}
              >
                {trait}
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}
