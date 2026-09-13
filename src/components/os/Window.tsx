"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  zIndex: number;
  onFocus: () => void;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  zIndex,
  onFocus,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen || isMinimized) return null;

  return (
    <motion.div
      onClick={onFocus}
      style={{ zIndex }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className={`fixed flex flex-col bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 shadow-2xl overflow-hidden
        ${
          isMobile
            ? "inset-0 top-10 rounded-t-xl rounded-b-none w-full h-[calc(100dvh-2.5rem)]"
            : "top-16 left-4 md:left-1/4 w-[92vw] md:w-[680px] h-[520px] rounded-xl"
        }`}
    >
      {/* Window Title Bar */}
      <div className="h-9 bg-neutral-950/80 border-b border-neutral-800/80 px-3 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-2">
          {/* Mac-style traffic lights */}
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 flex items-center justify-center group"
          >
            <X className="w-2 h-2 text-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={onMinimize}
            className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 flex items-center justify-center group"
          >
            <Minus className="w-2 h-2 text-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono font-medium text-neutral-400 truncate max-w-[180px] sm:max-w-none">
            {title}
          </span>
        </div>

        {isMobile && (
          <button
            onClick={onClose}
            className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 active:bg-neutral-700"
          >
            Close
          </button>
        )}
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto p-3 sm:p-4 text-neutral-200">
        {children}
      </div>
    </motion.div>
  );
};