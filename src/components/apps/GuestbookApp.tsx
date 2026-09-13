"use client";

import React, { useState } from "react";
import { MessageSquare, Send, User } from "lucide-react";

interface GuestbookMessage {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export const GuestbookApp = () => {
  const [messages, setMessages] = useState<GuestbookMessage[]>([
    {
      id: "1",
      name: "Alex River",
      message: "The Web OS concept is super fluid! Loved the terminal integration.",
      timestamp: "Today at 2:15 PM",
    },
    {
      id: "2",
      name: "Sujan Dev",
      message: "Great work on the Zustand state management implementation.",
      timestamp: "Yesterday",
    },
  ]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newMessage: GuestbookMessage = {
      id: Date.now().toString(),
      name,
      message,
      timestamp: "Just now",
    };

    setMessages([newMessage, ...messages]);
    setName("");
    setMessage("");
  };

  return (
    <div className="space-y-4 font-mono text-xs text-neutral-300">
      <form onSubmit={handlePost} className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
        <p className="text-neutral-200 font-bold flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-rose-400" /> Sign the Guestbook
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Your Alias"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-rose-500"
          />
          <input
            type="text"
            placeholder="Leave a note..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-rose-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-1.5 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-lg hover:bg-rose-500/30 transition-all font-bold flex items-center justify-center gap-1.5"
        >
          <span>Post Note</span>
          <Send className="w-3 h-3" />
        </button>
      </form>

      <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 no-scrollbar">
        {(messages || []).map((msg) => (
          <div key={msg.id} className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400 flex items-center gap-1">
                <User className="w-3 h-3 text-neutral-500" /> {msg.name}
              </span>
              <span className="text-[10px] text-neutral-500">{msg.timestamp}</span>
            </div>
            <p className="text-neutral-300 leading-relaxed">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};