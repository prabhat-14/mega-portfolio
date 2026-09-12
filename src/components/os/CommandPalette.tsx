"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, User, FolderGit2, BookOpen, Mail, X } from "lucide-react";
import { useOSStore } from "@/lib/store";
import { AppId } from "@/types/os";

interface CommandItem {
  id: AppId;
  label: string;
  category: string;
  icon: React.ReactNode;
}

const commands: CommandItem[] = [
  { id: "terminal", label: "Open Terminal", category: "Applications", icon: <Terminal className="h-4 w-4 text-emerald-400" /> },
  { id: "about", label: "Open About Me", category: "Applications", icon: <User className="h-4 w-4 text-blue-400" /> },
  { id: "projects", label: "Open Projects Showcase", category: "Applications", icon: <FolderGit2 className="h-4 w-4 text-purple-400" /> },
  { id: "guestbook", label: "Open Live Guestbook", category: "Applications", icon: <BookOpen className="h-4 w-4 text-amber-400" /> },
  { id: "contact", label: "Open Contact Form", category: "Applications", icon: <Mail className="h-4 w-4 text-rose-400" /> },
];

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { openWindow, focusWindow, windows } = useOSStore();

  // Listen for Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelect = (id: AppId) => {
    if (windows[id]?.isOpen) {
      focusWindow(id);
    } else {
      openWindow(id);
    }
    setIsOpen(false);
    setQuery("");
  };

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl rounded-2xl bg-neutral-900 border border-neutral-700/80 shadow-2xl overflow-hidden font-sans"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3 border-b border-neutral-800">
              <Search className="h-4 w-4 text-neutral-400 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or app name..."
                className="w-full bg-transparent text-sm text-neutral-100 placeholder-neutral-500 outline-none font-mono"
                autoFocus
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-neutral-500 hover:text-neutral-300 rounded-md"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-72 overflow-auto p-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => handleSelect(cmd.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-800 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {cmd.icon}
                      <span className="text-xs text-neutral-200 group-hover:text-white font-medium">
                        {cmd.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                      Jump to App
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs font-mono text-neutral-500">
                  No commands found matching "{query}"
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-neutral-950/60 border-t border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>Navigation Shortcut</span>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">ESC</kbd> to exit
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};