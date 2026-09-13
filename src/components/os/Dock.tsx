"use client";

import React from "react";
import { useOSStore } from "@/store/useOSStore";

export const Dock = () => {
  const windows = useOSStore((state) => state.windows) || {};
  const toggleWindow = useOSStore((state) => state.toggleWindow);

  const windowList = Object.values(windows);

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
      <div className="flex items-center gap-1.5 sm:gap-2.5 px-3 py-2 bg-neutral-900/85 backdrop-blur-2xl border border-neutral-800/80 rounded-2xl shadow-2xl overflow-x-auto no-scrollbar">
        {(windowList || []).map((item) => (
          <button
            key={item.id}
            onClick={() => toggleWindow(item.id)}
            title={item.title}
            className="relative group p-2 rounded-xl hover:bg-neutral-800/60 active:scale-90 transition-all duration-150 shrink-0 flex flex-col items-center justify-center min-w-[42px] min-h-[42px]"
          >
            <span className="text-xs font-mono text-neutral-300">{item.title[0]}</span>
            {item.isOpen && (
              <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};