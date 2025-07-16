"use client";

import { motion } from "framer-motion";
import { Home, User, Globe, Gamepad2, Heart, Bell } from "lucide-react";
import { useStore } from "../lib/store";

export default function MainLayout({ children, activeTab, onTabChange }) {
  const { notifications } = useStore();

  const tabs = [
    { id: "feed", icon: Home, label: "Feed" },
    { id: "cloud", icon: Globe, label: "Cloud" },
    { id: "games", icon: Gamepad2, label: "Games" },
    { id: "besties", icon: Heart, label: "Besties" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900 text-gray-900">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            YOU<span className="text-purple-500">TRAIT</span>
          </h1>
        </div>
      </div>

      {/* Page Content */}
      <div className="pb-20 px-4">{children}</div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-200 shadow-t z-50">
        <div className="flex justify-around items-center py-2">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                activeTab === id
                  ? "text-purple-600 font-semibold"
                  : "text-gray-500 hover:text-purple-500"
              }`}
            >
              <div className="relative">
                <Icon size={24} />
                {id === "notifications" && notifications.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </div>
                )}
              </div>
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
