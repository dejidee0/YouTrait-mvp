"use client";

import { motion } from "framer-motion";
import { TRAIT_COLORS } from "../lib/constants";

export default function TraitBubble({
  trait,
  size = "md",
  endorsements = 0,
  onClick,
  isActive = false,
  delay = 0,
}) {
  const sizeClasses = {
    sm: "w-16 h-16 text-xs",
    md: "w-20 h-20 text-sm",
    lg: "w-24 h-24 text-base",
    xl: "w-32 h-32 text-lg",
  };

  const color = TRAIT_COLORS[trait.length % TRAIT_COLORS.length];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay, duration: 0.3 }}
      onClick={onClick}
      className={`${sizeClasses[size]} relative cursor-pointer`}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full opacity-50 blur-sm"
        style={{ backgroundColor: color }}
      />

      {/* Main bubble */}
      <div
        className={`relative w-full h-full rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 ${
          isActive ? "ring-4 ring-white/50" : ""
        }`}
        style={{ backgroundColor: color }}
      >
        <span className="text-center leading-tight px-2">{trait}</span>

        {/* Endorsement count */}
        {endorsements > 0 && (
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {endorsements}
          </div>
        )}
      </div>

      {/* Orbit effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
