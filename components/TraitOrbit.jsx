"use client";

import { motion } from "framer-motion";
import TraitBubble from "./TraitBubble";

export default function TraitOrbit({ traits, userAvatar, userName }) {
  const bubbleSize = 80;
  const maxPerRing = 10;
  const rings = [];

  // Group traits into rings
  for (let i = 0; i < Math.ceil(traits.length / maxPerRing); i++) {
    rings.push(traits.slice(i * maxPerRing, (i + 1) * maxPerRing));
  }

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="relative mx-auto"
        style={{
          width: "min(100%, 400px)",
          height: "min(100vw, 400px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {/* Center avatar */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ width: bubbleSize, height: bubbleSize }}
        >
          <div
            className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-2xl shadow-md ${
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

        {/* Trait rings */}
        {rings.map((ringTraits, ringIndex) => {
          const baseRadius = 100;
          const ringGap = 70;
          const radius = baseRadius + ringIndex * ringGap;

          return ringTraits.map((trait, index) => {
            const angle = (index / ringTraits.length) * 2 * Math.PI;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={`${trait}-${ringIndex}`}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: bubbleSize,
                  height: bubbleSize,
                  transform: `translate(${x - bubbleSize / 2}px, ${
                    y - bubbleSize / 2
                  }px)`,
                }}
              >
                <TraitBubble
                  trait={trait}
                  size="md"
                  endorsements={Math.floor(Math.random() * 10) + 1}
                />
              </div>
            );
          });
        })}
      </motion.div>
    </div>
  );
}
