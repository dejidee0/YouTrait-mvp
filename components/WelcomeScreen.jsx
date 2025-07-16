"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const traits = [
  "Creative",
  "Bold",
  "Loyal",
  "Curious",
  "Witty",
  "Empathetic",
  "Resilient",
  "Passionate",
  "Authentic",
  "Visionary",
];

function getRandomStyles(index) {
  const size = Math.floor(Math.random() * 40) + 30; // 30px - 70px
  const colors = [
    "rgba(255, 255, 255, 0.06)",
    "rgba(255, 255, 255, 0.09)",
    "rgba(255, 255, 255, 0.12)",
    "rgba(255, 255, 255, 0.08)",
  ];
  return {
    width: `${size}px`,
    height: `${size}px`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    backgroundColor: colors[index % colors.length],
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${5 + Math.random() * 10}s`,
  };
}

export default function WelcomeScreen({ onContinue }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#120027] via-[#1f0039] to-[#320054] flex items-center justify-center px-4 py-12">
      {/* Bubble Background */}
      {Array.from({ length: 30 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-xl pointer-events-none"
          style={getRandomStyles(index)}
          animate={{
            y: ["0%", "-30%", "0%"],
            x: ["0%", "5%", "-5%", "0%"],
          }}
          transition={{
            repeat: Infinity,
            ease: "easeInOut",
            duration: parseFloat(getRandomStyles(index).animationDuration),
            delay: parseFloat(getRandomStyles(index).animationDelay),
          }}
        />
      ))}

      {/* Central Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl px-10 py-14 text-center shadow-[0_15px_40px_rgba(255,255,255,0.05)]"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          className="mb-8"
        >
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center text-4xl font-extrabold shadow-inner border border-white/20">
            YT
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-extrabold text-white drop-shadow mb-3 tracking-wide"
        >
          YOU<span className="text-yellow-300">TRAIT</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-white/70 text-base max-w-md mx-auto mb-10"
        >
          Discover your identity through traits. No filters. No noise. Just the
          real you.
        </motion.p>

        {/* Trait Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {traits.map((trait, index) => (
            <motion.div
              key={trait}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className="text-white bg-white/10 px-4 py-2 rounded-full border border-white/20 text-sm font-medium backdrop-blur-lg hover:scale-105 transition-transform"
            >
              {trait}
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white px-10 py-3 rounded-full text-lg font-semibold transition-all shadow-lg"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
