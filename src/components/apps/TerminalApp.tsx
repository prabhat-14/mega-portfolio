"use client";

import React, { useState, useRef, useEffect } from "react";
import { useOSStore } from "@/lib/store";
import { AppId } from "@/types/os";

interface CommandOutput {
  command: string;
  response: React.ReactNode;
}

export const TerminalApp: React.FC = () => {
  const { openWindow } = useOSStore();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "welcome",
      response: (
        <div className="text-neutral-400 space-y-1">
          <p className="text-emerald-400 font-bold">Prabhat OS [Version 1.0.0]</p>
          <p>Type <span className="text-amber-300">help</span> to view available system commands.</p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let response: React.ReactNode = "";

    switch (cmd) {
      case "help":
        response = (
          <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-1 text-xs font-mono">
            <span className="text-amber-300">about</span><span>Open biography & skills app</span>
            <span className="text-amber-300">projects</span><span>View featured projects</span>
            <span className="text-amber-300">guestbook</span><span>Open real-time guestbook</span>
            <span className="text-amber-300">clear</span><span>Clear terminal screen</span>
            <span className="text-amber-300">whoami</span><span>Display active user identity</span>
          </div>
        );
        break;

      case "about":
      case "projects":
      case "guestbook":
      case "contact":
        openWindow(cmd as AppId);
        response = <span className="text-emerald-400">Opening {cmd}.app...</span>;
        break;

      case "whoami":
        response = <span className="text-cyan-400">visitor@prabhat-portfolio-os</span>;
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        response = (
          <span className="text-red-400">
            command not found: {cmd}. Type <span className="text-amber-300">help</span>.
          </span>
        );
    }

    setHistory((prev) => [...prev, { command: input, response }]);
    setInput("");
  };

  return (
    <div className="font-mono text-xs text-neutral-200 h-full flex flex-col justify-between" onClick={() => document.getElementById("terminal-input")?.focus()}>
      <div className="space-y-3">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="text-emerald-400">guest@prabhat:~$</span>
              <span>{item.command}</span>
            </div>
            <div className="pl-4">{item.response}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4 pt-2 border-t border-neutral-800">
        <span className="text-emerald-400 font-bold">guest@prabhat:~$</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-neutral-100 placeholder-neutral-600 font-mono"
          placeholder="type a command..."
          autoFocus
        />
      </form>
    </div>
  );
};