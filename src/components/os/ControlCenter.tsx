"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, Volume2, VolumeX, Palette, Monitor, Cpu, Sparkles } from "lucide-react";

interface ControlCenterProps {
  currentWallpaper: string;
  setWallpaper: (wallpaper: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({
  currentWallpaper,
  setWallpaper,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const wallpapers = [
    { id: "radial", label: "Midnight Glow", class: "bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" },
    { id: "cyberpunk", label: "Cyber Neon", class: "bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(236,72,153,0.15),rgba(168,85,247,0.1))]" },
    { id: "matrix", label: "Emerald Grid", class: "bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.18),rgba(0,0,0,0))]" },
  ];

  return (
    <div className="relative">
      {/* Control Center Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 text-neutral-300 transition-colors"
        title="Control Center"
      >
        <Sliders className="h-3.5 w-3.5 text-emerald-400" />
      </button>

      {/* Popover Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-8 w-72 p-4 rounded-2xl bg-neutral-900/95 border border-neutral-800 backdrop-blur-2xl shadow-2xl z-[100] text-xs font-sans text-neutral-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 font-mono">
              <span className="font-bold flex items-center gap-1.5 text-neutral-100">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Control Center
              </span>
              <span className="text-[10px] text-neutral-500">v1.2.0</span>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 my-3">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex items-center gap-2 p-2.5 rounded-xl border transition-colors ${
                  soundEnabled
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400"
                }`}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                <div className="text-left font-mono">
                  <div className="text-[10px] font-bold">Audio SFX</div>
                  <div className="text-[9px] opacity-70">{soundEnabled ? "Enabled" : "Muted"}</div>
                </div>
              </button>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300">
                <Cpu className="h-4 w-4 text-cyan-400" />
                <div className="font-mono">
                  <div className="text-[10px] font-bold">System RAM</div>
                  <div className="text-[9px] text-neutral-400">1.2 GB / 16 GB</div>
                </div>
              </div>
            </div>

            {/* Wallpaper Selection */}
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
                <Palette className="h-3 w-3" /> Desktop Theme
              </div>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
                {wallpapers.map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => setWallpaper(wp.class)}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                      currentWallpaper === wp.class
                        ? "bg-neutral-800 border-emerald-500/50 text-emerald-400 font-bold"
                        : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {wp.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};