"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, Zap, Target } from "lucide-react";
import { SAMPLE_TRAITS } from "../lib/constants";

export default function Games() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    const generateLeaderboard = () => {
      const leaders = SAMPLE_TRAITS.slice(0, 10).map((trait, index) => ({
        rank: index + 1,
        trait,
        endorsements: Math.floor(Math.random() * 500) + 100,
        growth: Math.floor(Math.random() * 50) + 5,
        users: Math.floor(Math.random() * 200) + 50,
      }));

      leaders.sort((a, b) => b.endorsements - a.endorsements);
      leaders.forEach((leader, index) => (leader.rank = index + 1));

      setLeaderboard(leaders);
      setUserRank(Math.floor(Math.random() * 50) + 15);
    };

    generateLeaderboard();
    const interval = setInterval(generateLeaderboard, 10000);
    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500" size={24} />;
      case 2:
        return <Trophy className="text-gray-400" size={24} />;
      case 3:
        return <Trophy className="text-orange-500" size={24} />;
      default:
        return <span className="text-gray-700 font-bold text-lg">{rank}</span>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 text-gray-800">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl text-white font-bold mb-2">
          <Zap className="inline mr-2 text-yellow-500" size={32} />
          Word Battle Royale
        </h2>
        <p className="text-gray-100">Most endorsed traits today</p>
      </div>

      {/* User Rank */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-purple-100 border border-purple-300 rounded-xl p-6 mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-purple-800 font-semibold mb-1">Your Rank</h3>
            <p className="text-purple-600 text-sm">Keep climbing!</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-900 mb-1">
              #{userRank}
            </div>
            <div className="text-purple-600 text-sm">Global</div>
          </div>
        </div>
      </motion.div>

      {/* Game Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-center">
          <Target className="text-green-500 mx-auto mb-2" size={24} />
          <p className="text-gray-800 font-semibold">Active Battle</p>
          <p className="text-gray-500 text-sm">Today's Round</p>
        </div>
        <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-center">
          <Zap className="text-yellow-500 mx-auto mb-2" size={24} />
          <p className="text-gray-800 font-semibold">Live Updates</p>
          <p className="text-gray-500 text-sm">Real-time</p>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Trophy className="text-yellow-500" size={24} />
          Today's Leaderboard
        </h3>

        <div className="space-y-3">
          {leaderboard.map((leader, index) => (
            <motion.div
              key={leader.trait}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-xl border ${
                leader.rank <= 3
                  ? "bg-yellow-100 border-yellow-300"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              {/* Rank */}
              <div className="w-10 h-10 flex items-center justify-center">
                {getRankIcon(leader.rank)}
              </div>

              {/* Trait Info */}
              <div className="flex-1">
                <h4 className="font-semibold capitalize text-lg">
                  {leader.trait}
                </h4>
                <p className="text-gray-500 text-sm">
                  {leader.users} users • +{leader.growth}% today
                </p>
              </div>

              {/* Endorsements */}
              <div className="text-right">
                <p className="text-green-600 font-bold text-xl">
                  {leader.endorsements.toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm">endorsements</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <button className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105">
          Endorse Your Traits
        </button>
      </motion.div>
    </div>
  );
}
