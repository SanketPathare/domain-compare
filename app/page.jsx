"use client";
import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Flame, Zap, ShieldCheck, HelpCircle } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import TldPriceList from "@/components/TldPriceList";

export default function Home() {
  const router = useRouter();

  const handleSelectTld = (tld) => {
    const placeholderName = `myidealname.${tld}`;
    router.push(`/results?domain=${encodeURIComponent(placeholderName)}`);
  };

  const features = [
    {
      icon: <Zap className="h-4.5 w-4.5 text-white" />,
      title: "Real-Time Queries",
      desc: "Instant live availability checks and renewal rate lookups powered by GoDaddy & Porkbun API interfaces."
    },
    {
      icon: <Flame className="h-4.5 w-4.5 text-white" />,
      title: "Monochromatic Grid",
      desc: "Compare registrar registration and renewal fees globally in USD, INR, EUR, or GBP."
    },
    {
      icon: <ShieldCheck className="h-4.5 w-4.5 text-white" />,
      title: "Direct Registrar Checkout",
      desc: "We route you directly to provider shopping panels pre-populated with affiliate UTM discount codes."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Enter Brand Name",
      desc: "Search your target name. Our parser automatically sanitizes trailing slashes, subdomains, and protocols."
    },
    {
      step: "02",
      title: "Compare Registrars",
      desc: "Instantly compare introductory promotional rates against standard yearly renewal fees side-by-side."
    },
    {
      step: "03",
      title: "Secure Purchase",
      desc: "Navigate directly to ICANN-accredited registries with our referral keys applied for discount support."
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between py-12 sm:py-24 gap-16 md:gap-28 bg-black">
      {/* Background NextJS Radial Spotlight Glow */}
      <div className="nextjs-spotlight"></div>

      {/* 1. HERO SECTION */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center space-y-8 animate-fade-in-up">
        {/* Sleek Vercel-style announcement pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold text-zinc-300 bg-[#0c0c0c] border border-[#222] hover:border-zinc-700 transition-all shadow-md mx-auto select-none">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Multi-Country Live Pricing Active</span>
        </div>

        {/* NextJS.org ultra-bold headlines */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tighter text-white leading-[1.05]">
            The Domain <br />
            <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Comparison Engine
            </span>
          </h1>
          <p className="text-sm sm:text-lg text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Compare domain registration and renewal rates across top-tier registries in real-time. Instantly convert fees into USD, INR, EUR, or GBP.
          </p>
        </div>

        {/* Vercel Search bar wrapper */}
        <div className="pt-4 max-w-3xl mx-auto">
          <Suspense fallback={<div className="h-14 w-full bg-[#080808] border border-[#1a1a1a] rounded-xl animate-pulse"></div>}>
            <SearchBar placeholder="Enter domain name or keyword... (e.g. myproject)" />
          </Suspense>
        </div>

        {/* Feature quick benefits (Charcoal nextjs-spotlight grids) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-4xl mx-auto">
          {features.map((feat, index) => (
            <div
              key={index}
              className="flex flex-col items-start text-left p-6 rounded-xl bg-[#080808] border border-[#1a1a1a] hover:border-zinc-800 transition-all duration-200"
            >
              <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-[#222] flex items-center justify-center mb-4 text-white">
                {feat.icon}
              </div>
              <h3 className="font-bold text-xs text-white uppercase tracking-wider">
                {feat.title}
              </h3>
              <p className="text-xs text-zinc-450 mt-2 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. POPULAR TLD GRID */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <TldPriceList onSelectTld={handleSelectTld} />
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 border-t border-[#1a1a1a] pt-16 md:pt-24 space-y-12 bg-black">
        <div className="space-y-3">
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            Workflows
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Simple. Monochromatic. Instant.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, index) => (
            <div
              key={index}
              className="group bg-[#080808] border border-[#1a1a1a] hover:border-zinc-800 rounded-xl p-8 transition-all duration-300 relative"
            >
              {/* Step indicator */}
              <div className="text-4xl font-mono font-black text-[#1a1a1a] group-hover:text-zinc-900 transition-colors duration-300 absolute top-6 right-8 select-none">
                {item.step}
              </div>

              <div className="space-y-4">
                <span className="inline-block text-[11px] font-mono text-zinc-400 bg-[#161616] px-2 py-0.5 rounded border border-[#222]">
                  Step {index + 1}
                </span>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-450 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FAQ QUICK ACCORDION */}
      <section className="relative z-10 mx-auto w-full max-w-4xl px-6 lg:px-8 border-t border-[#1a1a1a] pt-16 md:pt-24 space-y-8 bg-black">
        <div className="text-center space-y-2">
          <HelpCircle className="h-5.5 w-5.5 text-zinc-500 mx-auto" />
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3.5">
          {[
            {
              q: "Why do first-year rates differ from renewals?",
              a: "Many registrars offer steep introductory first-year promotional prices to acquire customers, but charge standard renewal rates in subsequent years. DomainCompare displays both side-by-side so you can calculate long-term maintenance costs."
            },
            {
              q: "Does DomainCompare charge any brokerage fees?",
              a: "No. DomainCompare is 100% free to use. We do not sell domains directly. When you click 'Buy Now', you are redirected to the registrar's official portal. We earn a small affiliate referral fee from them at zero extra cost to you."
            },
            {
              q: "How are the exchange conversions calculated?",
              a: "We maintain fixed, dynamic exchange multipliers for INR, EUR, and GBP mapped directly to your local preferences. Select your country's base currency in the header, and all prices update in real-time."
            }
          ].map((faq, idx) => (
            <details
              key={idx}
              className="group bg-[#080808] border border-[#1a1a1a] hover:border-zinc-800 rounded-xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-all duration-200"
            >
              <summary className="flex items-center justify-between font-bold text-white text-xs sm:text-sm select-none uppercase tracking-wider">
                <span>{faq.q}</span>
                <span className="ml-1.5 shrink-0 rounded-lg bg-[#111] border border-[#222] p-1 text-zinc-400 group-open:rotate-180 transition-transform">
                  <ChevronDown className="h-3.5 w-3.5" />
                </span>
              </summary>
              <p className="mt-3.5 text-xs text-zinc-450 leading-relaxed border-t border-[#1a1a1a] pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}

// Monochrome Chevron Helper
function ChevronDown(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
