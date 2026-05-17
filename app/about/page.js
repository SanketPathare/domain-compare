"use client";
import React from "react";
import { ShieldCheck, Award, Heart, Sparkles, HelpCircle, Users } from "lucide-react";
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
      icon: <ShieldCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: "Complete Price Integrity",
      desc: "We show both first-year registration promos and subsequent renewal fees, making sure there are zero hidden renewal surprises."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-orange-500" />,
      title: "Real-Time Fetching",
      desc: "Our platform queries direct APIs so you don't have to rely on stale, pre-cached databases when checking registrar deals."
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-500" />,
      title: "Independent & Free",
      desc: "DomainCompare is completely free to use. We do not sell domains or prioritize high-paying bidders. The cheapest price always wins."
    }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen py-16 sm:py-24 space-y-16 sm:space-y-24 transition-colors duration-300">
      
      {/* Background glowing mesh gradients */}
      <div className="absolute top-[-10%] left-[-20%] h-[500px] w-[500px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] -z-10 pointer-events-none"></div>
      
      {/* 1. Header Hero */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6 animate-fade-in-up">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-400/5 border border-purple-500/25 dark:border-purple-400/10 shadow-sm mx-auto select-none">
          <Award className="h-3.5 w-3.5 text-purple-500" />
          <span>Our Vision & Values</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          Helping Creators Buy <br />
          <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 bg-clip-text text-transparent">
            Domains For Less
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-zinc-550 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          DomainCompare was created by developers, for developers, founders, and creators. We noticed how difficult it is to find honest pricing across multiple registrars. Our mission is to make domain shopping fully transparent and simple.
        </p>
      </section>

      {/* 2. Stats Grid */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-850 p-8 sm:p-10 rounded-3xl text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-1.5">
              <div className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-zinc-500 dark:text-zinc-450 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Team Values */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            What We Stand For
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            We operate on a few core principles that guarantee you get honest pricing structures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-850 rounded-3xl p-8 space-y-4 hover:shadow-md transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 flex items-center justify-center">
                {val.icon}
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                {val.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Support Model Notice */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/20 rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              How We Support Our Work
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed max-w-xl">
              DomainCompare is supported by our users. When you find the cheapest rate and register a domain through our redirect buttons, the registrar awards us a tiny affiliate referral commission. This doesn&apos;t cost you a single cent extra, and it funds our live API servers. Thank you for your support!
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 rounded-2xl bg-white hover:bg-zinc-100 text-purple-900 font-bold text-sm transition-all duration-200 shrink-0 text-center shadow-md active:scale-95 whitespace-nowrap"
          >
            Start Comparing Domains
          </Link>
        </div>
      </section>
    </div>
  );
}
