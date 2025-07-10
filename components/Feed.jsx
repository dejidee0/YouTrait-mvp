"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share, Music } from "lucide-react";
import { useStore } from "../lib/store";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import TraitBubble from "./TraitBubble";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [musicLink, setMusicLink] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const { user } = useStore();

  // Sample posts data
  useEffect(() => {
    const samplePosts = [
      {
        id: 1,
        user: {
          name: "Alex Chen",
          username: "alexc",
          traits: ["creative", "bold", "empathetic"],
        },
        content:
          "Just finished a new art piece! Feeling so inspired by the colors of sunset 🌅",
        musicLink: "Lofi Hip Hop - Sunset Vibes",
        likes: 23,
        comments: 5,
        timestamp: "2h ago",
      },
      {
        id: 2,
        user: {
          name: "Maya Rodriguez",
          username: "maya_r",
          traits: ["adventurous", "witty", "loyal"],
        },
        content:
          "Who else thinks pineapple on pizza is actually genius? Fight me 😂",
        likes: 87,
        comments: 34,
        timestamp: "4h ago",
      },
      {
        id: 3,
        user: {
          name: "Jordan Kim",
          username: "jordank",
          traits: ["wise", "gentle", "curious"],
        },
        content:
          "Today I learned that octopuses have three hearts. Nature is absolutely fascinating!",
        musicLink: "Ambient Sounds - Ocean Waves",
        likes: 45,
        comments: 12,
        timestamp: "6h ago",
      },
    ];
    setPosts(samplePosts);
  }, []);

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      user: {
        name: user?.user_metadata?.username || "You",
        username: user?.user_metadata?.username || "you",
        traits: ["creative", "authentic", "bold"], // This would come from user data
      },
      content: newPost,
      musicLink: musicLink || null,
      likes: 0,
      comments: 0,
      timestamp: "now",
    };

    setPosts([post, ...posts]);
    setNewPost("");
    setMusicLink("");
    setShowNewPost(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* New Post Button */}
      <div className="mb-6">
        <Button
          onClick={() => setShowNewPost(!showNewPost)}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl"
        >
          What's on your mind?
        </Button>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-black/30 backdrop-blur-md rounded-xl p-6 mb-6"
        >
          <Textarea
            placeholder="Share your thoughts..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder-gray-400 mb-4 min-h-[100px]"
          />
          <Input
            placeholder="Add music (optional)"
            value={musicLink}
            onChange={(e) => setMusicLink(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder-gray-400 mb-4"
          />
          <div className="flex gap-2">
            <Button
              onClick={handlePostSubmit}
              className="bg-green-500 hover:bg-green-600 text-white px-6"
            >
              Post
            </Button>
            <Button
              onClick={() => setShowNewPost(false)}
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/30 backdrop-blur-md rounded-xl p-6"
          >
            {/* User Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {post.user.name[0]}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{post.user.name}</h3>
                  <p className="text-gray-400 text-sm">@{post.user.username}</p>
                </div>
              </div>
              <span className="text-gray-400 text-sm">{post.timestamp}</span>
            </div>

            {/* User Traits */}
            <div className="flex gap-2 mb-4">
              {post.user.traits.map((trait) => (
                <TraitBubble key={trait} trait={trait} size="sm" />
              ))}
            </div>

            {/* Content */}
            <p className="text-white mb-4 text-lg leading-relaxed">
              {post.content}
            </p>

            {/* Music */}
            {post.musicLink && (
              <div className="bg-purple-600/20 rounded-lg p-3 mb-4 flex items-center gap-2">
                <Music size={16} className="text-purple-400" />
                <span className="text-purple-300 text-sm">
                  {post.musicLink}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
                <Heart size={20} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                <MessageCircle size={20} />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
                <Share size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
