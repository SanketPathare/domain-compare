"use client";
import React from "react";
import { ShieldCheck, Award, Sparkles, Users } from "lucide-react";
import Link from "next/link";

export default function About() {
  const stats = [
    { value: "4+", label: "Top Registrars Compared" },
    { value: "6+", label: "Major TLD Extensions" },
    { value: "Real-Time", label: "Availability Checks" },
    { value: "100%", label: "Free & Independent" }
  ];

  const values = [
    {
      icon: <ShieldCheck className="h-4.5 w-4.5 text-white" />,
      title: "Complete Price Integrity",
      desc: "We show both first-year registration promos and subsequent renewal fees, making sure there are zero hidden renewal surprises."
    },
    {
      icon: <Sparkles className="h-4.5 w-4.5 text-white" />,
      title: "Real-Time Fetching",
      desc: "Our platform queries direct APIs so you don't have to rely on stale, pre-cached databases when checking registrar deals."
    },
    {
      icon: <Users className="h-4.5 w-4.5 text-white" />,
      title: "Independent & Free",
      desc: "DomainCompare is completely free to use. We do not sell domains or prioritize high-paying bidders. The cheapest price always wins."
    }
  ];

  return (
    <div className="relative min-h-screen py-16 sm:py-24 space-y-16 sm:space-y-28 bg-black">
      {/* Background NextJS Radial Spotlight Glow */}
      <div className="nextjs-spotlight"></div>
      
      {/* 1. Header Hero */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-6 animate-fade-in-up">
        {/* Vercel-style vision badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-zinc-300 bg-[#0c0c0c] border border-[#222] hover:border-zinc-700 transition-all shadow-md mx-auto select-none">
          <Award className="h-3.5 w-3.5 text-white" />
          <span>Our Vision & Values</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white leading-tight">
          Helping Creators Buy <br />
          <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Domains For Less
          </span>
        </h1>
        
        <p className="text-xs sm:text-base text-zinc-450 max-w-2xl mx-auto leading-relaxed">
          DomainCompare was created by developers, for developers, founders, and creators. We noticed how difficult it is to find honest pricing across multiple registrars. Our mission is to make domain shopping fully transparent and simple.
        </p>
      </section>

      {/* 2. Stats Grid */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#080808] border border-[#1a1a1a] p-8 sm:p-10 rounded-xl text-center shadow-2xl">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1.5">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tighter">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Team Values */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 space-y-12">
        <div className="space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            Principles
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            What We Stand For
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, index) => (
            <div
              key={index}
              className="bg-[#080808] border border-[#1a1a1a] hover:border-zinc-800 rounded-xl p-8 space-y-4 shadow-2xl transition-all duration-300"
            >
              <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-[#222] flex items-center justify-center text-white">
                {val.icon}
              </div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                {val.title}
              </h3>
              <p className="text-xs text-zinc-455 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Support Model Notice */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <div className="bg-[#080808] border border-[#1a1a1a] rounded-xl p-8 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
              Funding Notice
            </span>
            <h2 className="text-lg font-bold text-white">
              How We Support Our Work
            </h2>
            <p className="text-xs text-zinc-450 leading-relaxed">
              DomainCompare is supported by our users. When you find the cheapest rate and register a domain through our redirect buttons, the registrar awards us a tiny affiliate referral commission. This doesn&apos;t cost you a single cent extra, and it funds our live API servers. Thank you for your support!
            </p>
          </div>
          <Link
            href="/"
            className="px-5 py-3 rounded-lg bg-white hover:bg-zinc-200 text-black font-extrabold text-xs transition-all duration-150 shrink-0 text-center shadow-sm select-none"
          >
            Compare Domains
          </Link>
        </div>
      </section>
    </div>
  );
}
