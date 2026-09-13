"use client";

import React, { useState, useEffect } from "react";
import { Mail, Send, Check, Copy, Terminal, ShieldCheck } from "lucide-react";

export const ContactApp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [time, setTime] = useState("");

  const directEmail = "prabhatneupane21@gmail.com";

  // System live clock updates every second
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

  const handleCopy = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSent(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        window.location.href = `mailto:${directEmail}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`;
      }
    } catch {
      window.location.href = `mailto:${directEmail}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}`;
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4 font-mono text-xs text-neutral-300">
      {/* Top Header: System Status & Clock */}
      <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 space-y-2">
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
          <div className="flex items-center gap-2 text-rose-400 font-bold tracking-wider text-[11px] uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>About System</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-neutral-400 font-semibold tracking-wider">SYSTEM ONLINE</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-0.5 text-[11px]">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
            <span>Local Time:</span>
          </div>
          <span className="text-neutral-200 font-bold tracking-widest">{time || "00:00:00 AM"}</span>
        </div>
      </div>

      {/* Direct Email Header Card */}
      <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-neutral-400 text-[11px]">Direct Inbox</p>
          <p className="text-neutral-100 font-bold">{directEmail}</p>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-lg hover:bg-rose-500/20 active:scale-95 transition-all flex items-center gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Copied!" : "Copy Email"}</span>
        </button>
      </div>

      {/* External Profile Links */}
      <div className="flex gap-2">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 p-2.5 bg-neutral-950/60 rounded-xl border border-neutral-800 hover:border-neutral-700 flex items-center justify-center gap-2 text-neutral-300 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 text-rose-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>GitHub</span>
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 p-2.5 bg-neutral-950/60 rounded-xl border border-neutral-800 hover:border-neutral-700 flex items-center justify-center gap-2 text-neutral-300 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4 text-rose-400 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <span>LinkedIn</span>
        </a>
      </div>

      {/* Dispatch Form */}
      <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-neutral-950/60 rounded-xl border border-neutral-800/80">
        <h3 className="text-neutral-200 font-bold text-sm flex items-center gap-2">
          <Mail className="w-4 h-4 text-rose-400" /> Send a Dispatch
        </h3>
        <div>
          <label className="block text-neutral-400 mb-1">Your Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Doe"
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:border-rose-500 text-neutral-100"
          />
        </div>
        <div>
          <label className="block text-neutral-400 mb-1">Your Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="jane@example.com"
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:border-rose-500 text-neutral-100"
          />
        </div>
        <div>
          <label className="block text-neutral-400 mb-1">Message</label>
          <textarea
            required
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Hey Prabhat, let's build something together..."
            className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:border-rose-500 text-neutral-100 resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 active:scale-98 font-bold text-neutral-950 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          {sending ? "Sending..." : sent ? "Dispatched Successfully!" : "Send Message"}
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};