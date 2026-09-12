"use client";

import React, { useState } from "react";
import { User, Code2, Terminal, Cpu, Flame, Layers } from "lucide-react";

const skills = [
  { category: "Languages & Core", items: ["TypeScript", "JavaScript", "C", "C++", "SQL"] },
  { category: "Frontend Engine", items: ["Next.js (App Router)", "React", "Tailwind CSS", "Framer Motion", "Zustand"] },
  { category: "Backend & Systems", items: ["Supabase", "PostgreSQL", "REST APIs", "WebSockets", "Git"] },
];

export const AboutApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"bio" | "skills" | "architecture">("bio");

  return (
    <div className="h-full flex flex-col font-sans text-neutral-200">
      {/* App Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 mb-4">
        <button
          onClick={() => setActiveTab("bio")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            activeTab === "bio" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-neutral-400 hover:text-white"
          }`}
        >
          <User className="h-3.5 w-3.5" /> Bio
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            activeTab === "skills" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-neutral-400 hover:text-white"
          }`}
        >
          <Code2 className="h-3.5 w-3.5" /> Tech Stack
        </button>
        <button
          onClick={() => setActiveTab("architecture")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            activeTab === "architecture" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-neutral-400 hover:text-white"
          }`}
        >
          <Layers className="h-3.5 w-3.5" /> Philosophy
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto pr-1">
        {activeTab === "bio" && (
          <div className="space-y-4 text-xs leading-relaxed">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-400 flex items-center justify-center text-xl font-mono font-bold text-black shadow-lg shadow-blue-500/20">
                PN
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-mono">Prabhat Neupane</h3>
                <p className="text-neutral-400">Full-Stack Developer & Software Engineer</p>
              </div>
            </div>

            <p className="text-neutral-300">
              I specialize in engineering high-performance web applications, interactive system architectures, and visually compelling digital experiences. My work sits at the intersection of robust backend mechanics and responsive, ultra-smooth frontend design.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <span className="text-neutral-400 text-[10px] uppercase font-mono tracking-wider block">Primary Focus</span>
                <span className="text-emerald-400 font-semibold text-xs">Full-Stack & OS Simulation</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <span className="text-neutral-400 text-[10px] uppercase font-mono tracking-wider block">Core Discipline</span>
                <span className="text-cyan-400 font-semibold text-xs">Deep Work & Clean Code</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-4">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{skillGroup.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 hover:border-blue-500/50 hover:text-blue-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "architecture" && (
          <div className="space-y-3 text-xs text-neutral-300 leading-relaxed font-mono">
            <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-amber-400 font-bold block">01. Underground Mastery</span>
              <p className="text-neutral-400 text-[11px]">Building complex projects with long-term engineering depth over surface-level output.</p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 space-y-1">
              <span className="text-emerald-400 font-bold block">02. Uncompromising Performance</span>
              <p className="text-neutral-400 text-[11px]">Zero bloated scripts. Minimal re-renders through state slice optimization and lightweight UI primitives.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};