"use client";

import React, { useState, useEffect } from "react";
import {
  Terminal,
  ShieldCheck,
  User,
  Code2,
  FolderGit2,
  Mail,
  BookOpen,
  Monitor,
  X,
  Palette,
} from "lucide-react";
import { ContactApp } from "@/components/apps/ContactApp";
import { GuestbookApp } from "@/components/apps/GuestbookApp";

type AppId = "about" | "skills" | "projects" | "contact" | "guest" | null;
type ThemeColor = "rose" | "emerald" | "cyan" | "amber";

const themeConfig: Record<
  ThemeColor,
  {
    name: string;
    text: string;
    border: string;
    borderHover: string;
    bgBadge: string;
    bgButton: string;
    ring: string;
    activeBorder: string;
  }
> = {
  rose: {
    name: "Rose",
    text: "text-rose-400",
    border: "border-rose-500/50",
    borderHover: "hover:border-rose-500/40",
    bgBadge: "bg-rose-500/10",
    bgButton: "bg-rose-500 hover:bg-rose-600",
    ring: "ring-rose-500",
    activeBorder: "border-rose-500/50 shadow-rose-500/5",
  },
  emerald: {
    name: "Emerald",
    text: "text-emerald-400",
    border: "border-emerald-500/50",
    borderHover: "hover:border-emerald-500/40",
    bgBadge: "bg-emerald-500/10",
    bgButton: "bg-emerald-500 hover:bg-emerald-600",
    ring: "ring-emerald-500",
    activeBorder: "border-emerald-500/50 shadow-emerald-500/5",
  },
  cyan: {
    name: "Cyan",
    text: "text-cyan-400",
    border: "border-cyan-500/50",
    borderHover: "hover:border-cyan-500/40",
    bgBadge: "bg-cyan-500/10",
    bgButton: "bg-cyan-500 hover:bg-cyan-600",
    ring: "ring-cyan-500",
    activeBorder: "border-cyan-500/50 shadow-cyan-500/5",
  },
  amber: {
    name: "Amber",
    text: "text-amber-400",
    border: "border-amber-500/50",
    borderHover: "hover:border-amber-500/40",
    bgBadge: "bg-amber-500/10",
    bgButton: "bg-amber-500 hover:bg-amber-600",
    ring: "ring-amber-500",
    activeBorder: "border-amber-500/50 shadow-amber-500/5",
  },
};

export default function Home() {
  const [time, setTime] = useState("");
  const [activeApp, setActiveApp] = useState<AppId>("about");
  const [theme, setTheme] = useState<ThemeColor>("rose");

  const currentTheme = themeConfig[theme];

  // Real-time system clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const apps = [
    { id: "about", name: "About Me", icon: User, tag: "BIO" },
    { id: "skills", name: "Skills & Tech", icon: Code2, tag: "STACK" },
    { id: "projects", name: "Projects", icon: FolderGit2, tag: "WORK" },
    { id: "contact", name: "Contact System", icon: Mail, tag: "DISPATCH" },
    { id: "guest", name: "Guestbook", icon: BookOpen, tag: "GUEST" },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 sm:p-6 font-mono text-xs selection:bg-neutral-800 selection:text-neutral-100 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full space-y-6">
        
        {/* Top System Status Header with Theme Selector */}
        <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800 space-y-2 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
            <div className={`flex items-center gap-2 ${currentTheme.text} font-bold tracking-wider text-[11px] uppercase transition-colors`}>
              <Terminal className="w-3.5 h-3.5" />
              <span>About System</span>
            </div>

            {/* Theme Picker Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 mr-2 border-r border-neutral-800 pr-3">
                <Palette className="w-3 h-3 text-neutral-400" />
                {(["rose", "emerald", "cyan", "amber"] as ThemeColor[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    title={`Switch to ${t}`}
                    className={`w-3.5 h-3.5 rounded-full transition-transform ${
                      t === "rose"
                        ? "bg-rose-500"
                        : t === "emerald"
                        ? "bg-emerald-500"
                        : t === "cyan"
                        ? "bg-cyan-500"
                        : "bg-amber-500"
                    } ${theme === t ? "scale-125 ring-2 ring-offset-2 ring-offset-neutral-950 " + currentTheme.ring : "opacity-60 hover:opacity-100"}`}
                  />
                ))}
              </div>

              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-neutral-400 font-semibold tracking-wider hidden sm:inline">
                SYSTEM ONLINE
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-0.5 text-[11px]">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
              <span>Local Time:</span>
            </div>
            <span className="text-neutral-200 font-bold tracking-widest">
              {time || "00:00:00 AM"}
            </span>
          </div>
        </div>

        {/* Desktop Apps Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {apps.map((app) => {
            const Icon = app.icon;
            const isActive = activeApp === app.id;
            return (
              <button
                key={app.id}
                onClick={() => setActiveApp(app.id as AppId)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-3 group relative overflow-hidden ${
                  isActive
                    ? `bg-neutral-900 ${currentTheme.activeBorder} shadow-lg`
                    : "bg-neutral-900/40 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive ? currentTheme.text : "text-neutral-400 group-hover:text-neutral-200"
                    }`}
                  />
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 font-bold tracking-wider">
                    {app.tag}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-neutral-200 text-xs sm:text-sm">{app.name}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Application Window */}
        {activeApp && (
          <div className="bg-neutral-900/70 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl backdrop-blur-md">
            {/* Window Titlebar */}
            <div className="px-4 py-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActiveApp(null)}
                    className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors flex items-center justify-center group"
                  >
                    <X className="w-2 h-2 text-neutral-950 opacity-0 group-hover:opacity-100" />
                  </button>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="ml-2 text-neutral-400 text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                  <Monitor className={`w-3.5 h-3.5 ${currentTheme.text}`} />
                  {activeApp}.exe
                </span>
              </div>
              <div className="text-neutral-500 text-[10px]">OS_V2.0.26</div>
            </div>

            {/* Window Body */}
            <div className="p-5 sm:p-6">
              {activeApp === "about" && (
                <div className="space-y-4">
                  <div className={`flex items-center gap-2 ${currentTheme.text} font-bold`}>
                    <User className="w-4 h-4" />
                    <h2 className="text-sm uppercase tracking-wider">Developer Profile</h2>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-neutral-100">
                    Prabhat Neupane
                  </h1>
                  <p className="text-neutral-300 leading-relaxed max-w-2xl text-xs sm:text-sm">
                    Frontend & Full-Stack Developer specializing in building modern, interactive, and responsive web applications using React, Next.js, TypeScript, and Tailwind CSS.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                    <span className="px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-md text-neutral-400">
                      📍 Nepal
                    </span>
                    <span className={`px-2.5 py-1 bg-neutral-950 border border-neutral-800 rounded-md ${currentTheme.text} font-semibold`}>
                      ⚡ Open for Opportunities
                    </span>
                  </div>
                </div>
              )}

              {activeApp === "skills" && (
                <div className="space-y-4">
                  <div className={`flex items-center gap-2 ${currentTheme.text} font-bold`}>
                    <Code2 className="w-4 h-4" />
                    <h2 className="text-sm uppercase tracking-wider">Technical Stack</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                    {[
                      "Next.js",
                      "React",
                      "TypeScript",
                      "Tailwind CSS",
                      "C / C++",
                      "Node.js",
                      "Shadcn UI",
                      "Git & GitHub",
                      "REST APIs",
                    ].map((skill) => (
                      <div
                        key={skill}
                        className={`p-2.5 bg-neutral-950/80 rounded-lg border border-neutral-800 text-neutral-200 font-bold text-center ${currentTheme.borderHover} transition-colors`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeApp === "projects" && (
                <div className="space-y-4">
                  <div className={`flex items-center gap-2 ${currentTheme.text} font-bold`}>
                    <FolderGit2 className="w-4 h-4" />
                    <h2 className="text-sm uppercase tracking-wider">Featured Projects</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 bg-neutral-950/80 rounded-xl border border-neutral-800 space-y-2 hover:border-neutral-700 transition-colors">
                      <h3 className="font-bold text-neutral-100 text-sm">mega-portfolio</h3>
                      <p className="text-neutral-400 text-[11px] leading-relaxed">
                        Interactive terminal and desktop OS interface constructed with Next.js, Tailwind CSS, and Lucide Icons.
                      </p>
                      <div className="flex gap-1.5 pt-1">
                        <span className={`px-2 py-0.5 ${currentTheme.bgBadge} ${currentTheme.text} rounded text-[10px]`}>
                          Next.js
                        </span>
                        <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded text-[10px]">
                          Tailwind
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-neutral-950/80 rounded-xl border border-neutral-800 space-y-2 hover:border-neutral-700 transition-colors">
                      <h3 className="font-bold text-neutral-100 text-sm">Full-Stack Web App</h3>
                      <p className="text-neutral-400 text-[11px] leading-relaxed">
                        Dynamic web application featuring API integration, custom component architecture, and interactive widgets.
                      </p>
                      <div className="flex gap-1.5 pt-1">
                        <span className={`px-2 py-0.5 ${currentTheme.bgBadge} ${currentTheme.text} rounded text-[10px]`}>
                          TypeScript
                        </span>
                        <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 rounded text-[10px]">
                          React
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeApp === "contact" && <ContactApp />}
              {activeApp === "guest" && <GuestbookApp />}
            </div>
          </div>
        )}
      </div>

      {/* Footer Bar */}
      <div className="max-w-5xl mx-auto w-full pt-6 text-center text-neutral-600 text-[10px]">
        Designed & Developed by Prabhat Neupane
      </div>
    </main>
  );
}