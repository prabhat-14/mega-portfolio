"use client";

import React from "react";
import { motion } from "framer-motion";
import { useOSStore } from "@/lib/store";
import { AppId } from "@/types/os";
import { Terminal, User, FolderGit2, BookOpen, Mail } from "lucide-react";

interface DockItem {
  id: AppId;
  label: string;
  icon: React.ReactNode;
}

const dockApps: DockItem[] = [
  { id: "terminal", label: "Terminal", icon: <Terminal className="h-5 w-5 text-emerald-400" /> },
  { id: "about", label: "About Me", icon: <User className="h-5 w-5 text-blue-400" /> },
  { id: "projects", label: "Projects", icon: <FolderGit2 className="h-5 w-5 text-purple-400" /> },
  { id: "guestbook", label: "Guestbook", icon: <BookOpen className="h-5 w-5 text-amber-400" /> },
  { id: "contact", label: "Contact", icon: <Mail className="h-5 w-5 text-rose-400" /> },
];

export const Dock: React.FC = () => {
  const { openWindow, focusWindow, windows } = useOSStore();

  const handleAppClick = (id: AppId) => {
    if (windows[id]?.isOpen) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-neutral-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80"
      >
        {dockApps.map((app) => {
          const isOpen = windows[app.id]?.isOpen;
          return (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className="relative group p-2.5 rounded-xl hover:bg-white/10 transition-all duration-200 flex flex-col items-center"
              title={app.label}
            >
              {app.icon}
              <span className="absolute -top-10 px-2 py-1 rounded bg-neutral-900 border border-neutral-700 text-[10px] text-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                {app.label}
              </span>
              {isOpen && <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};