"use client";
import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, Loader2, Sparkles, MapPin } from "lucide-react";

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

    // Simulate standard submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const channels = [
    {
      icon: <Mail className="h-5 w-5 text-purple-500" />,
      label: "Support Email",
      value: "hello@domaincompare.com",
      href: "mailto:hello@domaincompare.com"
    },
    {
      icon: <XLogoIcon className="h-4.5 w-4.5 text-zinc-800 dark:text-zinc-200" />,
      label: "Community / X",
      value: "@DomainCompareHQ",
      href: "https://twitter.com"
    },
    {
      icon: <MapPin className="h-5 w-5 text-emerald-500" />,
      label: "Operations",
      value: "San Francisco, CA",
      href: "#"
    }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen py-16 sm:py-24 space-y-16 transition-colors duration-300">
      
      {/* Background glowing mesh gradients */}
      <div className="absolute top-[-10%] left-[-20%] h-[500px] w-[500px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] -z-10 pointer-events-none"></div>

      {/* 1. Header Hero */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6 animate-fade-in-up">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-400/5 border border-purple-500/25 dark:border-purple-400/10 shadow-sm mx-auto select-none">
          <MessageSquare className="h-3.5 w-3.5 text-purple-500" />
          <span>Get in Touch</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          We’d Love to <br />
          <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 bg-clip-text text-transparent">
            Hear From You
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-zinc-550 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Have feedback on pricing? Found a bug? Want to list your registrar? Get in touch with our team directly.
        </p>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Quick info columns (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
              Contact Channels
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              We monitor our primary support email and X (Twitter) handles daily. Reach out to get a response within 24 business hours.
            </p>

            <div className="space-y-4 pt-4">
              {channels.map((chan, index) => (
                <a
                  key={index}
                  href={chan.href}
                  className="flex items-center gap-4 p-4.5 rounded-2xl bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-850 hover:border-purple-550/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="h-10 w-10 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 rounded-xl flex items-center justify-center shrink-0">
                    {chan.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                      {chan.label}
                    </div>
                    <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200 break-all pt-0.5">
                      {chan.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form column (3 cols) */}
          <div className="lg:col-span-3 bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-850 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {success ? (
              // Success Panel
              <div className="py-12 text-center space-y-5 animate-fade-in-up">
                <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="h-8 w-8 animate-bounce" />
                </div>
                <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out to DomainCompare! Our operations team has received your message and will review it shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              // Form Panel
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Send a Direct Message
                </h3>

                {error && (
                  <div className="p-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-505 uppercase tracking-wide">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-550 uppercase tracking-wide">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-550 uppercase tracking-wide">
                    Subject / Topic <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g., Registrar listing query, Pricing feedback"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-550 uppercase tracking-wide">
                    Message Body <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message detail here..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-purple-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-md shadow-purple-600/10 active:scale-95"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4.5 w-4.5" />
                      <span>Send Message</span>
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
