"use client";
import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, Loader2, MapPin } from "lucide-react";

// Premium X/Twitter Logo SVG Icon
const XLogoIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("Please complete all required fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const channels = [
    {
      icon: <Mail className="h-4 w-4 text-white" />,
      label: "Support Email",
      value: "hello@domaincompare.com",
      href: "mailto:hello@domaincompare.com"
    },
    {
      icon: <XLogoIcon className="h-3.5 w-3.5 text-white" />,
      label: "Community / X",
      value: "@DomainCompareHQ",
      href: "https://twitter.com"
    },
    {
      icon: <MapPin className="h-4 w-4 text-white" />,
      label: "Operations",
      value: "San Francisco, CA",
      href: "#"
    }
  ];

  return (
    <div className="relative min-h-screen py-16 sm:py-24 space-y-16 bg-black text-white">
      {/* Background NextJS Radial Spotlight Glow */}
      <div className="nextjs-spotlight"></div>

      {/* 1. Header Hero */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-6 animate-fade-in-up">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-zinc-350 bg-[#0c0c0c] border border-[#222] hover:border-zinc-700 transition-all shadow-md mx-auto select-none">
          <MessageSquare className="h-3.5 w-3.5 text-white" />
          <span>Get in Touch</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white leading-tight">
          We’d Love to <br />
          <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Hear From You
          </span>
        </h1>
        
        <p className="text-xs sm:text-base text-zinc-455 max-w-xl mx-auto leading-relaxed">
          Have interface feedback? Identified pricing mismatches? Wish to integrate a custom registrar? Reach out directly.
        </p>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Quick info columns (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                Directory
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Contact Channels
              </h2>
            </div>
            <p className="text-xs text-zinc-450 leading-relaxed">
              We monitor operations pipelines and X handles daily. Contact us to receive answers within 24 business hours.
            </p>

            <div className="space-y-3 pt-2">
              {channels.map((chan, index) => (
                <a
                  key={index}
                  href={chan.href}
                  className="flex items-center gap-4 p-4 rounded-lg bg-[#080808] border border-[#1a1a1a] hover:border-zinc-750 transition-all duration-150 shadow-2xl"
                >
                  <div className="h-8 w-8 bg-zinc-900 border border-[#222] rounded-lg flex items-center justify-center shrink-0 text-white">
                    {chan.icon}
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                      {chan.label}
                    </div>
                    <div className="text-xs font-bold text-zinc-300 break-all pt-0.5">
                      {chan.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form column (3 cols) */}
          <div className="lg:col-span-3 bg-[#080808] border border-[#1a1a1a] rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {success ? (
              // Success Panel
              <div className="py-12 text-center space-y-5 animate-fade-in-up">
                <div className="h-12 w-12 bg-[#0c0c0c] border border-emerald-950 text-emerald-400 rounded-lg flex items-center justify-center mx-auto shadow-xl select-none">
                  <CheckCircle2 className="h-6 w-6 animate-pulse" />
                </div>
                <h3 className="text-xl font-extrabold text-white uppercase tracking-wider">
                  Message Transmitted!
                </h3>
                <p className="text-xs text-zinc-450 max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting DomainCompare! Our developer relations desk will review your submission shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="flex items-center justify-center px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-extrabold text-xs transition-all select-none w-full sm:w-auto"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              // Form Panel
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                  Send a Direct Message
                </h3>

                {error && (
                  <div className="p-3 bg-[#180808] border border-red-955 rounded-lg text-xs font-mono text-red-400">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2.5 rounded-lg bg-[#0c0c0c] border border-[#222] text-xs font-mono text-white focus:outline-none focus:border-zinc-500 placeholder-zinc-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full px-3 py-2.5 rounded-lg bg-[#0c0c0c] border border-[#222] text-xs font-mono text-white focus:outline-none focus:border-zinc-500 placeholder-zinc-700"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Subject / Topic <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g., API listing query, rates feedback"
                    className="w-full px-3 py-2.5 rounded-lg bg-[#0c0c0c] border border-[#222] text-xs font-mono text-white focus:outline-none focus:border-zinc-500 placeholder-zinc-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    Message Body <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Provide details regarding your request..."
                    className="w-full px-3 py-2.5 rounded-lg bg-[#0c0c0c] border border-[#222] text-xs font-mono text-white focus:outline-none focus:border-zinc-500 placeholder-zinc-700 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-1.5 w-full py-3 rounded-lg bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed text-black font-extrabold text-xs transition-all select-none shadow-sm mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-black" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5 text-black" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
