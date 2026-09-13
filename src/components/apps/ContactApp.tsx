"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, Copy, FolderGit2, Globe, ExternalLink, AlertCircle } from "lucide-react";

export const ContactApp: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // YOUR ACTUAL EMAIL ADDRESS HERE:
  const directEmail = "prabhatneupane21@gmail.com"; 

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransmit = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill out all fields before transmitting.");
      return;
    }

    setErrorMsg(null);

    // Construct Mailto link
    const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nVisitor Email: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    const mailtoUrl = `mailto:${directEmail}?subject=${subject}&body=${body}`;

    try {
      // Try launching direct mail client
      window.open(mailtoUrl, "_self");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      // Fallback: Copy email to clipboard if pop-up is blocked
      navigator.clipboard.writeText(directEmail);
      setErrorMsg("Copied email to clipboard! Paste in your email app.");
    }
  };

  return (
    <div className="h-full flex flex-col font-sans text-neutral-200">
      {/* Top Bar */}
      <div className="border-b border-neutral-800 pb-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-rose-400" />
          <span className="text-xs font-mono font-bold text-neutral-200">Direct Dispatch Channel</span>
        </div>
        <button
          onClick={handleCopyEmail}
          type="button"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
        >
          {copied ? <CheckCircle2 className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? "Copied Email!" : "Copy Email"}</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto space-y-4 pr-1">
        {/* Direct Social Links */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href="https://github.com/prabhat-14"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800 hover:border-rose-500/30 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <FolderGit2 className="h-4 w-4 text-neutral-400 group-hover:text-white" />
              <span className="text-xs font-mono text-neutral-300">GitHub</span>
            </div>
            <ExternalLink className="h-3 w-3 text-neutral-600 group-hover:text-neutral-400" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800 hover:border-rose-500/30 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-mono text-neutral-300">LinkedIn</span>
            </div>
            <ExternalLink className="h-3 w-3 text-neutral-600 group-hover:text-neutral-400" />
          </a>
        </div>

        {/* Contact Form Wrapper */}
        <div className="space-y-3 bg-neutral-900/40 p-3.5 rounded-xl border border-neutral-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-neutral-400">Your Name</label>
              <input
                type="text"
                placeholder="Alex Mercer"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-600 outline-none focus:border-rose-500/50 transition-colors font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-neutral-400">Email Address</label>
              <input
                type="email"
                placeholder="alex@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-600 outline-none focus:border-rose-500/50 transition-colors font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase text-neutral-400">Message</label>
            <textarea
              placeholder="What project or engineering opportunity are we building?"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 placeholder-neutral-600 outline-none focus:border-rose-500/50 transition-colors resize-none font-sans"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            {submitted ? (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" /> Email client requested!
              </span>
            ) : errorMsg ? (
              <span className="text-[11px] font-mono text-rose-400 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" /> {errorMsg}
              </span>
            ) : (
              <span className="text-[10px] font-mono text-neutral-500">// Direct mail dispatch</span>
            )}

            <button
              type="button"
              onClick={handleTransmit}
              className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 active:scale-95"
            >
              <Send className="h-3 w-3" />
              <span>Transmit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};