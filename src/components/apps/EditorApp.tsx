"use client";

import React, { useState } from "react";
import { Play, Code, CheckCircle, Terminal } from "lucide-react";

interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  output: string;
}

const snippets: CodeSnippet[] = [
  {
    title: "Fast Matrix Transpose (C++)",
    language: "cpp",
    code: `#include <iostream>\n#include <vector>\n\nvoid transpose(int A[3][3]) {\n    for(int i=0; i<3; ++i)\n        for(int j=i+1; j<3; ++j)\n            std::swap(A[i][j], A[j][i]);\n}\n\nint main() {\n    std::cout << "Executing optimized C++ memory transpose...";\n    return 0;\n}`,
    output: "Executing optimized C++ memory transpose...\n[Matrix updated in 0.04ms]",
  },
  {
    title: "Dynamic State Slice (TypeScript)",
    language: "typescript",
    code: `import { create } from 'zustand';\n\ntype OSState = { zIndex: number; focus: () => void };\n\nexport const useOS = create<OSState>((set) => ({\n  zIndex: 100,\n  focus: () => set((state) => ({ zIndex: state.zIndex + 1 })),\n}));`,
    output: "Store compiled successfully.\n[State Slice active across 5 registered windows]",
  },
];

export const EditorApp: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string | null>(null);

  const activeSnippet = snippets[selectedIdx];

  const handleRun = () => {
    setIsRunning(true);
    setConsoleLogs(null);
    setTimeout(() => {
      setIsRunning(false);
      setConsoleLogs(activeSnippet.output);
    }, 600);
  };

  return (
    <div className="h-full flex flex-col font-mono text-xs text-neutral-200">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-cyan-400" />
          <span className="font-bold text-neutral-200">Interactive Snippet Engine</span>
        </div>
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-colors disabled:opacity-50"
        >
          <Play className="h-3 w-3 fill-current" /> {isRunning ? "Executing..." : "Run Snippet"}
        </button>
      </div>

      {/* Snippet Selector */}
      <div className="flex items-center gap-2 mb-3">
        {snippets.map((snip, idx) => (
          <button
            key={idx}
            onClick={() => { setSelectedIdx(idx); setConsoleLogs(null); }}
            className={`px-2.5 py-1 rounded border text-[11px] transition-colors ${
              selectedIdx === idx
                ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"
                : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
            }`}
          >
            {snip.title}
          </button>
        ))}
      </div>

      {/* Code Editor View */}
      <div className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-auto text-cyan-300">
        <pre>{activeSnippet.code}</pre>
      </div>

      {/* Execution Output Console */}
      {consoleLogs && (
        <div className="mt-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
            <CheckCircle className="h-3 w-3" /> Execution Log Output:
          </div>
          <p className="text-neutral-300 text-[11px] whitespace-pre-line">{consoleLogs}</p>
        </div>
      )}
    </div>
  );
};