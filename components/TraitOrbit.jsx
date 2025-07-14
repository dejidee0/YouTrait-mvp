"use client";

import { motion } from "framer-motion";
import TraitBubble from "./TraitBubble";

export default function TraitOrbit({ traits, userAvatar, userName }) {
  const radius = 120;

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Center avatar */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className={`w-20 h-20 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-2xl shadow-md ${
            userAvatar ? "" : "bg-black text-white"
          }`}
          style={{
            backgroundImage: userAvatar ? `url(${userAvatar})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!userAvatar && userName?.[0]?.toUpperCase()}
        </div>
      </div>

      {/* Orbiting trait bubbles */}
      {traits.map((trait, index) => {
        const angle = (index / traits.length) * 2 * Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={trait}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(${x - 40}px, ${y - 40}px)`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20 + index * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <TraitBubble
              trait={trait}
              size="md"
              endorsements={Math.floor(Math.random() * 10) + 1}
              delay={index * 0.1}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
