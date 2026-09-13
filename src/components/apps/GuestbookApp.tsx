"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Send, MessageSquare, Clock, UserCheck } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface GuestEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export const GuestbookApp = () => {
  const [entries, setEntries] = useState<GuestEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all guestbook entries from Supabase database
  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setEntries(data);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const { error } = await supabase
      .from("guestbook")
      .insert([{ name: name.trim(), message: message.trim() }]);

    if (!error) {
      setName("");
      setMessage("");
      fetchEntries(); // Refresh messages list
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4 font-mono text-xs text-neutral-300">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-neutral-100 font-bold">
          <BookOpen className="w-4 h-4 text-rose-400" />
          <h2 className="text-sm uppercase tracking-wider">Live System Guestbook</h2>
        </div>
        <span className="text-[10px] text-neutral-500">
          {entries.length} {entries.length === 1 ? "Entry" : "Entries"} Logged
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 bg-neutral-950/70 rounded-xl border border-neutral-800 space-y-3"
      >
        <h3 className="text-neutral-200 font-bold text-xs flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-rose-400" /> Sign the Log
        </h3>

        <div>
          <label className="block text-neutral-400 mb-1 text-[11px]">Your Name / Handle</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex"
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:border-rose-500 text-neutral-100"
          />
        </div>

        <div>
          <label className="block text-neutral-400 mb-1 text-[11px]">Message</label>
          <textarea
            required
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Awesome portfolio! Loved the OS design."
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:border-rose-500 text-neutral-100 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-neutral-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? "Posting..." : "Post Entry"}
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      <div className="space-y-2.5 pt-1">
        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold px-1">
          Recent Public Logs
        </p>

        {entries.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-neutral-950/50 rounded-xl border border-neutral-800/80 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-neutral-200">
                <UserCheck className="w-3.5 h-3.5 text-rose-400" />
                <span>{item.name}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-neutral-500">
                <Clock className="w-3 h-3" />
                <span>{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <p className="text-neutral-300 leading-relaxed text-[11px] pl-5 border-l border-neutral-800">
              {item.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};