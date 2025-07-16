"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Flame, Calendar, Users } from "lucide-react";

export default function Besties() {
  const [besties, setBesties] = useState([]);
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    totalExchanges: 0,
  });

  useEffect(() => {
    const sampleBesties = [
      {
        id: 1,
        name: "Sarah Chen",
        username: "sarah_c",
        streakCount: 7,
        lastExchange: "2h ago",
        status: "online",
        mutualTraits: ["creative", "adventurous", "loyal"],
      },
      {
        id: 2,
        name: "Marcus Johnson",
        username: "marcus_j",
        streakCount: 12,
        lastExchange: "1d ago",
        status: "away",
        mutualTraits: ["witty", "empathetic", "bold"],
      },
      {
        id: 3,
        name: "Luna Park",
        username: "luna_p",
        streakCount: 3,
        lastExchange: "4h ago",
        status: "online",
        mutualTraits: ["wise", "gentle", "curious"],
      },
    ];

    setBesties(sampleBesties);
    setStreakData({
      currentStreak: 5,
      longestStreak: 15,
      totalExchanges: 247,
    });
  }, []);

  const getStreakIcon = (streak) => {
    if (streak >= 7) return <Flame className="text-orange-500" size={20} />;
    if (streak >= 3) return <Heart className="text-red-500" size={20} />;
    return <Heart className="text-gray-400" size={20} />;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2 text-white">
          <Heart className="inline mr-2 text-red-500" size={32} />
          Besties
        </h2>
        <p className="text-gray-100">Your closest trait connections</p>
      </div>

      {/* Streak Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Flame className="text-orange-500 mx-auto mb-2" size={24} />
          <p className="text-gray-800 font-bold text-2xl">
            {streakData.currentStreak}
          </p>
          <p className="text-gray-500 text-sm">Current Streak</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Calendar className="text-purple-500 mx-auto mb-2" size={24} />
          <p className="text-gray-800 font-bold text-2xl">
            {streakData.longestStreak}
          </p>
          <p className="text-gray-500 text-sm">Longest Streak</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <Users className="text-green-500 mx-auto mb-2" size={24} />
          <p className="text-gray-800 font-bold text-2xl">
            {streakData.totalExchanges}
          </p>
          <p className="text-gray-500 text-sm">Total Exchanges</p>
        </div>
      </div>

      {/* Besties List */}
      <div className="space-y-4">
        {besties.map((bestie, index) => (
          <motion.div
            key={bestie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {bestie.name[0]}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                      bestie.status === "online"
                        ? "bg-green-400"
                        : "bg-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="text-gray-800 font-semibold text-lg">
                    {bestie.name}
                  </h3>
                  <p className="text-gray-500">@{bestie.username}</p>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 mb-1">
                  {getStreakIcon(bestie.streakCount)}
                  <span className="text-gray-800 font-bold">
                    {bestie.streakCount}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">day streak</p>
              </div>
            </div>

            {/* Mutual Traits */}
            <div className="mb-4">
              <p className="text-gray-500 text-sm mb-2">Mutual Traits:</p>
              <div className="flex flex-wrap gap-2">
                {bestie.mutualTraits.map((trait) => (
                  <span
                    key={trait}
                    className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Last Exchange */}
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Last exchange: {bestie.lastExchange}
              </p>
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg text-sm">
                Send Trait
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Bestie CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105">
          Find New Besties
        </button>
      </motion.div>
    </div>
  );
}
