"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Share, Edit3, Users, Award } from "lucide-react";
import { useStore } from "../lib/store";
import TraitOrbit from "./TraitOrbit";
import { Button } from "../components/ui/button";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");
  const { user, signOut } = useStore();

  useEffect(() => {
    const sampleProfile = {
      name: user?.user_metadata?.username || "Your Name",
      username: user?.user_metadata?.username || "username",
      bio: "Living life one trait at a time ✨",
      traits: [
        "creative",
        "empathetic",
        "adventurous",
        "witty",
        "loyal",
        "bold",
        "curious",
        "passionate",
      ],
      stats: {
        friends: 247,
        endorsements: 1205,
        posts: 89,
        streaks: 12,
      },
      posts: [
        {
          id: 1,
          content:
            "Just discovered a new coffee shop with the most amazing atmosphere! ☕",
          timestamp: "2 hours ago",
          likes: 23,
        },
        {
          id: 2,
          content: "Feeling grateful for all the creative souls in my life 🎨",
          timestamp: "1 day ago",
          likes: 45,
        },
      ],
    };

    setProfile(sampleProfile);
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  if (!profile) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 rounded-full bg-muted text-white flex items-center justify-center font-bold text-3xl shadow-md">
            {profile.name[0]}
          </div>
          <button className="absolute -bottom-2 -right-2 bg-yellow-400 text-black p-2 rounded-full shadow hover:scale-105 transition">
            <Edit3 size={16} />
          </button>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
          {profile.name}
        </h1>
        <p className="text-gray-200 mb-2 text-sm">@{profile.username}</p>
        <p className="text-gray-200 text-sm max-w-md mx-auto">{profile.bio}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Users size={20} />}
          label="Friends"
          value={profile.stats.friends}
        />
        <StatCard
          icon={<Award size={20} />}
          label="Endorsements"
          value={profile.stats.endorsements}
        />
        <StatCard
          icon={<Edit3 size={20} />}
          label="Posts"
          value={profile.stats.posts}
        />
        <StatCard
          icon={<div className="text-orange-500 text-lg">🔥</div>}
          label="Streaks"
          value={profile.stats.streaks}
        />
      </div>

      {/* Trait Orbit */}
      <div className="mb-8">
        <h3 className="text-gray-200 text-xl font-semibold mb-4 text-center">
          Your Trait Universe
        </h3>
        <TraitOrbit
          traits={profile.traits}
          userAvatar={null}
          userName={profile.name}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl">
          <Share className="mr-2" size={16} />
          Share Profile
        </Button>
        <Button className="flex-1 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 py-3 rounded-xl">
          <Settings className="mr-2" size={16} />
          Settings
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex bg-zinc-200 rounded-xl p-1 overflow-x-auto">
          {["posts", "traits", "stories"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mb-10">
        {activeTab === "posts" && (
          <div className="space-y-4">
            {profile.posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border rounded-xl p-4 shadow-sm"
              >
                <p className="text-gray-800 mb-2">{post.content}</p>
                <div className="flex items-center justify-between text-gray-500 text-sm">
                  <span>{post.timestamp}</span>
                  <span>{post.likes} likes</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "traits" && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Your trait DNA and endorsement history
            </p>
            <p className="text-gray-700 mt-2">Coming soon...</p>
          </div>
        )}

        {activeTab === "stories" && (
          <div className="text-center py-8">
            <p className="text-gray-500">Your trait stories and highlights</p>
            <p className="text-gray-700 mt-2">Coming soon...</p>
          </div>
        )}
      </div>

      {/* Sign Out */}
      <div className="text-center">
        <button
          onClick={handleSignOut}
          className="text-red-500 hover:text-red-400 font-medium transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

// Sub-component for Stats
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white border rounded-xl p-4 text-center shadow-sm">
      <div className="text-purple-600 mx-auto mb-2">{icon}</div>
      <p className="text-gray-900 font-bold text-lg">{value}</p>
      <p className="text-gray-500 text-xs">{label}</p>
    </div>
  );
}
