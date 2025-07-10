"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Heart,
  UserPlus,
  MessageCircle,
  Trophy,
  Flame,
} from "lucide-react";
import { useStore } from "../lib/store";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { clearNotifications } = useStore();

  useEffect(() => {
    // Sample notifications
    const sampleNotifications = [
      {
        id: 1,
        type: "trait_endorsed",
        message: 'Sarah Chen endorsed your "creative" trait!',
        timestamp: "2 min ago",
        icon: Heart,
        color: "text-red-400",
      },
      {
        id: 2,
        type: "friend_request",
        message: "Marcus Johnson wants to be your friend",
        timestamp: "10 min ago",
        icon: UserPlus,
        color: "text-blue-400",
      },
      {
        id: 3,
        type: "comment",
        message: "Luna Park commented on your post",
        timestamp: "1 hour ago",
        icon: MessageCircle,
        color: "text-green-400",
      },
      {
        id: 4,
        type: "bestie_streak",
        message: "You hit 5 days streak with Sarah Chen! 🔥",
        timestamp: "2 hours ago",
        icon: Flame,
        color: "text-orange-400",
      },
      {
        id: 5,
        type: "leaderboard",
        message: 'You\'re trending for "witty" today!',
        timestamp: "3 hours ago",
        icon: Trophy,
        color: "text-yellow-400",
      },
    ];

    setNotifications(sampleNotifications);
  }, []);

  const handleClearAll = () => {
    setNotifications([]);
    clearNotifications();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold text-white">
          <Bell className="inline mr-2 text-blue-400" size={32} />
          Notifications
        </h2>
        {notifications.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="text-center py-16">
          <Bell className="text-gray-500 mx-auto mb-4" size={48} />
          <p className="text-gray-400 text-lg">No new notifications</p>
          <p className="text-gray-500 text-sm mt-2">You're all caught up! 🎉</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 backdrop-blur-md rounded-xl p-4 hover:bg-black/40 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`${notification.color} mt-1`}>
                  <notification.icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium mb-1">
                    {notification.message}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
