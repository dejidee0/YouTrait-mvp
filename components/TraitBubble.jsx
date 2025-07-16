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
    sm: "w-16 h-16 text-[10px]",
    md: "w-20 h-20 text-xs",
    lg: "w-24 h-24 text-sm",
    xl: "w-32 h-32 text-base",
  };

  const color = TRAIT_COLORS[trait.length % TRAIT_COLORS.length];

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay, duration: 0.3 }}
      onClick={onClick}
      className={`relative cursor-pointer ${sizeClasses[size]}`}
    >
      <div
        className={`relative w-full h-full rounded-full flex flex-col items-center justify-center font-semibold text-white shadow-md text-center leading-tight transition-all duration-300 ${
          isActive ? "ring-4 ring-gray-300" : ""
        }`}
        style={{ backgroundColor: color }}
      >
        <span
          className="px-2 max-w-full truncate overflow-hidden whitespace-nowrap"
          title={trait}
        >
          {trait}
        </span>
        {endorsements > 0 && (
          <span className="text-[10px] mt-1 font-normal text-white">
            {endorsements}
          </span>
        )}
      </div>
    </motion.div>
  );
}
