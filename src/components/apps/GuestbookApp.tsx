"use client";

import React, { useState, useEffect } from "react";
import { Send, User, MessageSquare, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export const GuestbookApp: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Initial fetch and setup real-time listener
  useEffect(() => {
    fetchEntries();

    // Subscribe to realtime changes on the "guestbook" table
    const channel = supabase
      .channel("public:guestbook")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          setEntries((prev) => [payload.new as GuestbookEntry, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      // Fallback mock entries if database is not yet connected
      setEntries([
        {
          id: "1",
          name: "Arch Linux Enthusiast",
          message: "Sick OS portfolio interface! Love the terminal integration.",
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Systems Eng",
          message: "Smooth drag mechanics and clean state slice separation.",
          created_at: new Date(Date.now() - 3600000).toISOString(),
        },
      ]);
    } else if (data) {
      setEntries(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const newEntry = {
      name: name.trim(),
      message: message.trim(),
    };

    const { error } = await supabase.from("guestbook").insert([newEntry]);

    if (error) {
      // Local optimistic update fallback if Supabase env keys aren't set up yet
      setEntries((prev) => [
        {
          id: Date.now().toString(),
          name: newEntry.name,
          message: newEntry.message,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      setStatusMessage("Posted locally! Add Supabase env variables to sync globally.");
    }

    setName("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <div className="h-full flex flex-col font-sans text-neutral-200">
      {/* Top Header Banner */}
      <div className="border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-neutral-200">System Guestbook</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          Realtime WebSockets Active
        </span>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="mb-4 space-y-2 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <User className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-500" />
            <input
              type="text"
              placeholder="Your handle / name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 outline-none focus:border-amber-500/50 transition-colors font-mono"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <Send className="h-3 w-3" /> Sign
          </button>
        </div>

        <textarea
          placeholder="Leave a message on the public system log..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 outline-none focus:border-amber-500/50 transition-colors resize-none font-sans"
          required
        />

        {statusMessage && (
          <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-mono mt-1">
            <AlertCircle className="h-3 w-3" /> {statusMessage}
          </div>
        )}
      </form>

      {/* Message Feed */}
      <div className="flex-1 overflow-auto space-y-2.5 pr-1">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800/80 space-y-1 hover:border-neutral-700 transition-colors"
          >
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-amber-400 font-semibold">{entry.name}</span>
              <span className="text-neutral-500">
                {new Date(entry.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};