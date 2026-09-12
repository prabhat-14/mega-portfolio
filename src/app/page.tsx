"use client";

import React, { useState } from "react";
import { Taskbar } from "@/components/os/Taskbar";
import { Dock } from "@/components/os/Dock";
import { Window } from "@/components/os/Window";
import { CommandPalette } from "@/components/os/CommandPalette";

import { TerminalApp } from "@/components/apps/TerminalApp";
import { AboutApp } from "@/components/apps/AboutApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { GuestbookApp } from "@/components/apps/GuestbookApp";
import { ContactApp } from "@/components/apps/ContactApp";

export default function OSDesktop() {
  const [wallpaper, setWallpaper] = useState(
    "bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"
  );
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <main className={`relative h-screen w-screen overflow-hidden bg-neutral-950 font-sans select-none transition-colors duration-500 ${wallpaper}`}>
      {/* System Status & Control Bar */}
      <Taskbar
        currentWallpaper={wallpaper}
        setWallpaper={setWallpaper}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main OS Work Area */}
      <div className="relative h-[calc(100vh-2rem)] w-full p-4 overflow-hidden">
        <Window id="terminal" title="Terminal — guest@prabhat:~">
          <TerminalApp />
        </Window>

        <Window id="about" title="About Me.app">
          <AboutApp />
        </Window>

        <Window id="projects" title="Projects.app">
          <ProjectsApp />
        </Window>

        <Window id="guestbook" title="Guestbook.app">
          <GuestbookApp />
        </Window>

        <Window id="contact" title="Contact.app">
          <ContactApp />
        </Window>
      </div>

      <Dock />
      <CommandPalette />
    </main>
  );
}