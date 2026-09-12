"use client";

import React, { useState, useEffect } from "react";
import { useOSStore } from "@/lib/store";
import { Cpu, Wifi } from "lucide-react";
import { ControlCenter } from "@/components/os/ControlCenter";

interface TaskbarProps {
  currentWallpaper: string;
  setWallpaper: (wp: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  currentWallpaper,
  setWallpaper,
  soundEnabled,
  setSoundEnabled,
}) => {
  const { activeWindowId } = useOSStore();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-8 w-full bg-neutral-950/80 backdrop-blur-md border-b border-white/10 px-4 flex items-center justify-between text-xs text-neutral-300 select-none z-50">
      <div className="flex items-center gap-4 font-mono">
        <span className="font-bold text-emerald-400 flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5" /> PrabhatOS
        </span>
        {activeWindowId && (
          <span className="text-neutral-500 flex items-center gap-1 capitalize">
            / <span className="text-neutral-300">{activeWindowId}.app</span>
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 font-mono text-neutral-400">
        <div className="flex items-center gap-1.5 text-emerald-400/90">
          <Wifi className="h-3.5 w-3.5" />
          <span className="text-[10px] hidden sm:inline">ONLINE</span>
        </div>

        {/* Control Center Popover Widget */}
        <ControlCenter
          currentWallpaper={currentWallpaper}
          setWallpaper={setWallpaper}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
        />

        <div className="text-neutral-200 font-semibold">{time || "00:00 AM"}</div>
      </div>
    </header>
  );
};