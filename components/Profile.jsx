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
    // Sample profile data
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
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-xl">
            {profile.name[0]}
          </div>
          <button className="absolute -bottom-2 -right-2 bg-yellow-400 text-black p-2 rounded-full">
            <Edit3 size={16} />
          </button>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">{profile.name}</h1>
        <p className="text-gray-300 mb-2">@{profile.username}</p>
        <p className="text-gray-400 max-w-md mx-auto">{profile.bio}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 text-center">
          <Users className="text-blue-400 mx-auto mb-2" size={20} />
          <p className="text-white font-bold text-lg">
            {profile.stats.friends}
          </p>
          <p className="text-gray-400 text-xs">Friends</p>
        </div>
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 text-center">
          <Award className="text-yellow-400 mx-auto mb-2" size={20} />
          <p className="text-white font-bold text-lg">
            {profile.stats.endorsements}
          </p>
          <p className="text-gray-400 text-xs">Endorsements</p>
        </div>
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 text-center">
          <Edit3 className="text-green-400 mx-auto mb-2" size={20} />
          <p className="text-white font-bold text-lg">{profile.stats.posts}</p>
          <p className="text-gray-400 text-xs">Posts</p>
        </div>
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-4 text-center">
          <div className="text-orange-400 mx-auto mb-2 text-lg">🔥</div>
          <p className="text-white font-bold text-lg">
            {profile.stats.streaks}
          </p>
          <p className="text-gray-400 text-xs">Streaks</p>
        </div>
      </div>

      {/* Trait Orbit */}
      <div className="mb-8">
        <h3 className="text-white text-xl font-semibold mb-4 text-center">
          Your Trait Universe
        </h3>
        <TraitOrbit
          traits={profile.traits}
          userAvatar={null}
          userName={profile.name}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 rounded-xl">
          <Share className="mr-2" size={16} />
          Share Profile
        </Button>
        <Button className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl">
          <Settings className="mr-2" size={16} />
          Settings
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex bg-black/30 backdrop-blur-md rounded-xl p-1">
          {["posts", "traits", "stories"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === "posts" && (
          <div className="space-y-4">
            {profile.posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/30 backdrop-blur-md rounded-xl p-4"
              >
                <p className="text-white mb-2">{post.content}</p>
                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <span>{post.timestamp}</span>
                  <span>{post.likes} likes</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "traits" && (
          <div className="text-center py-8">
            <p className="text-gray-400">
              Your trait DNA and endorsement history
            </p>
            <p className="text-white mt-2">Coming soon...</p>
          </div>
        )}

        {activeTab === "stories" && (
          <div className="text-center py-8">
            <p className="text-gray-400">Your trait stories and highlights</p>
            <p className="text-white mt-2">Coming soon...</p>
          </div>
        )}
      </div>

      {/* Sign Out Button */}
      <div className="text-center">
        <button
          onClick={handleSignOut}
          className="text-red-400 hover:text-red-300 font-medium transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
