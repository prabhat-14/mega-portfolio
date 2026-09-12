"use client";

import React, { useState } from "react";
import { ExternalLink, FolderGit2, Star, Code2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  metrics?: string;
}

const projectData: Project[] = [
  {
    id: "mega-portfolio-os",
    title: "Mega Portfolio OS",
    tagline: "Web Desktop Operating System",
    description: "An immersive web desktop environment featuring a Z-Index window manager, interactive CLI terminal, Zustand state engine, and Framer Motion animations.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
    githubUrl: "https://github.com",
    liveUrl: "http://localhost:3000",
    featured: true,
    metrics: "100ms UI latency",
  },
  {
    id: "realtime-guestbook",
    title: "Realtime Presence Engine",
    tagline: "Live Visitor Synchronization",
    description: "Multiplayer cursor tracking and live instant guestbook message broadcasting built with Supabase Realtime WebSockets.",
    tags: ["Supabase", "PostgreSQL", "WebSockets", "Next.js"],
    githubUrl: "https://github.com",
    featured: true,
    metrics: "Realtime CDC Sync",
  },
  {
    id: "cpp-algorithm-visualizer",
    title: "C++ & Algorithm Engine",
    tagline: "Data Structures & Performance",
    description: "High-performance computational algorithms and memory manipulation modules converted for browser-based interactive execution.",
    tags: ["C++", "C", "WebAssembly", "Data Structures"],
    githubUrl: "https://github.com",
    featured: false,
    metrics: "O(log N) Execution",
  },
];

export const ProjectsApp: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const filteredProjects = filter === "all" ? projectData : projectData.filter((p) => p.featured);

  return (
    <div className="h-full flex flex-col font-sans text-neutral-200">
      {/* Top Controls & Filters */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
              filter === "all" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-neutral-400 hover:text-white"
            }`}
          >
            All Projects ({projectData.length})
          </button>
          <button
            onClick={() => setFilter("featured")}
            className={`px-3 py-1 rounded-md text-xs font-mono transition-colors flex items-center gap-1 ${
              filter === "featured" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "text-neutral-400 hover:text-white"
            }`}
          >
            <Star className="h-3 w-3" /> Featured Only
          </button>
        </div>

        <div className="text-[11px] font-mono text-neutral-500 hidden sm:block">
          // Click links to view repositories
        </div>
      </div>

      {/* Projects Grid Container */}
      <div className="flex-1 overflow-auto space-y-4 pr-1">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-purple-500/40 hover:bg-neutral-900/80 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white font-mono group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  {project.metrics && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                      {project.metrics}
                    </span>
                  )}
                </div>
                <p className="text-xs text-purple-400/90 font-mono mt-0.5">{project.tagline}</p>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                    title="Source Code"
                  >
                    <FolderGit2 className="h-4 w-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 text-purple-300 transition-colors"
                    title="Live Project"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <p className="text-xs text-neutral-300 mt-2.5 leading-relaxed">{project.description}</p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {project.tags.map((tag, tIdx) => (
                <span key={tIdx} className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-[10px] font-mono text-neutral-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};