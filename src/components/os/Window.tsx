"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import { useOSStore } from "@/lib/store";
import { AppId } from "@/types/os";

interface WindowProps {
  id: AppId;
  title: string;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ id, title, children }) => {
  const { windows, closeWindow, minimizeWindow, focusWindow, toggleMaximize, activeWindowId } = useOSStore();
  const winState = windows[id];
  const [position, setPosition] = useState(winState?.position || { x: 100, y: 80 });

  if (!winState || !winState.isOpen || winState.isMinimized) return null;

  const isActive = activeWindowId === id;

  return (
    <motion.div
      drag={!winState.isMaximized}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        setPosition((prev) => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }));
      }}
      initial={{ scale: 0.95, opacity: 0, x: position.x, y: position.y }}
      animate={{
        scale: 1,
        opacity: 1,
        x: winState.isMaximized ? 0 : position.x,
        y: winState.isMaximized ? 0 : position.y,
        width: winState.isMaximized ? "100vw" : "680px",
        height: winState.isMaximized ? "100vh" : "440px",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onMouseDown={() => focusWindow(id)}
      style={{ zIndex: winState.zIndex, position: "absolute", top: 0, left: 0 }}
      className={`flex flex-col rounded-xl overflow-hidden border backdrop-blur-xl transition-shadow duration-200 ${
        isActive
          ? "border-neutral-600/80 bg-neutral-900/90 shadow-2xl shadow-black/60 ring-1 ring-white/10"
          : "border-neutral-800/60 bg-neutral-950/75 shadow-lg shadow-black/40 opacity-90"
      }`}
    >
      <div className={`flex items-center justify-between px-4 py-2.5 select-none cursor-grab active:cursor-grabbing border-b ${isActive ? "bg-neutral-800/50 border-neutral-700/50" : "bg-neutral-900/30 border-neutral-800/40"}`}>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); closeWindow(id); }} className="group flex h-3 w-3 items-center justify-center rounded-full bg-red-500/80 hover:bg-red-500">
            <X className="h-2 w-2 opacity-0 group-hover:opacity-100 text-black stroke-[3]" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} className="group flex h-3 w-3 items-center justify-center rounded-full bg-yellow-500/80 hover:bg-yellow-500">
            <Minus className="h-2 w-2 opacity-0 group-hover:opacity-100 text-black stroke-[3]" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }} className="group flex h-3 w-3 items-center justify-center rounded-full bg-green-500/80 hover:bg-green-500">
            <Square className="h-1.5 w-1.5 opacity-0 group-hover:opacity-100 text-black stroke-[3]" />
          </button>
        </div>
        <div className="text-xs font-medium tracking-wide text-neutral-300 font-mono">{title}</div>
        <div className="w-12" />
      </div>
      <div className="flex-1 overflow-auto p-4 text-neutral-200">{children}</div>
    </motion.div>
  );
};