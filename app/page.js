"use client";
import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Search, Flame, Zap, ShieldCheck, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import TldPriceList from "@/components/TldPriceList";

export default function Home() {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");

  const handleSelectTld = (tld) => {
    // When they click on a TLD card, we'll navigate them to the results page
    // with a placeholder domain based on their selected TLD (e.g. 'myidealname.com')
    const placeholderName = `myidealname.${tld}`;
    router.push(`/results?domain=${encodeURIComponent(placeholderName)}`);
  };

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-purple-500" />,
      title: "Real-Time Queries",
      desc: "Live availability status and pricing calculations directly via API checks."
    },
    {
      icon: <Flame className="h-6 w-6 text-orange-500" />,
      title: "Sort & Save",
      desc: "Instantly arrange results by registration fees, renewal rates, or customer ratings."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-500" />,
      title: "100% Secure Checkout",
      desc: "Every purchase is processed directly by ICANN-accredited registrars."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Search Your Idea",
      desc: "Enter your custom brand name. We auto-remove trailing protocols and validate formatting."
    },
    {
      step: "02",
      title: "Compare Real-Time Rates",
      desc: "Analyze registration and renewal pricing across Porkbun, GoDaddy, Hostinger, and Namecheap."
    },
    {
      step: "03",
      title: "Register & Save",
      desc: "Click 'Buy Now' to navigate to your chosen provider pre-loaded with our affiliate discount codes."
    }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col justify-between py-12 sm:py-20 gap-16 md:gap-24 transition-colors duration-300">
      
      {/* Background ambient glowing mesh gradients */}
      <div className="absolute top-[-10%] left-[-20%] h-[500px] w-[500px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] -z-10 pointer-events-none animate-float"></div>
      <div className="absolute top-[30%] right-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[140px] -z-10 pointer-events-none" style={{ animationDelay: "2s" }}></div>

      {/* 1. HERO SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8 animate-fade-in-up">
        {/* Glowing Engine Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-400/5 border border-purple-500/25 dark:border-purple-400/10 shadow-sm mx-auto select-none">
          <Flame className="h-3.5 w-3.5 animate-pulse text-purple-500" />
          <span>Real-Time Domain Comparison Engine</span>
        </div>

        {/* Hero Headlines */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1] md:leading-[1.05]">
            Stop Overpaying for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 bg-clip-text text-transparent font-extrabold">
              Domain Names
            </span>
          </h1>
          <p className="text-base sm:text-xl text-zinc-550 dark:text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Search once. Instantly compare first-year registration fees and long-term renewal rates across the web&apos;s biggest registrars.
          </p>
        </div>

        {/* Centered Search Bar */}
        <div className="pt-4 max-w-3xl mx-auto">
          <Suspense fallback={<div className="h-16 w-full bg-zinc-150/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl animate-pulse"></div>}>
            <SearchBar placeholder="Type your dream domain name... (e.g. cloudbase)" />
          </Suspense>
        </div>

        {/* Feature quick benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 max-w-4xl mx-auto">
          {features.map((feat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-5 rounded-2xl bg-white/50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-850 hover:shadow-md transition-all duration-200"
            >
              <div className="h-12 w-12 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 flex items-center justify-center mb-3">
                {feat.icon}
              </div>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                {feat.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mt-1.5 leading-normal">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. POPULAR TLD GRID */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <TldPriceList onSelectTld={handleSelectTld} />
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-zinc-200 dark:border-zinc-850 pt-16 md:pt-24 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Compare, select, and register in less than 60 seconds with three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-850 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 relative"
            >
              {/* Step indicator */}
              <div className="text-5xl font-black text-purple-600/10 dark:text-purple-400/5 group-hover:text-purple-600/15 dark:group-hover:text-purple-400/10 transition-colors duration-300 absolute top-6 right-8 select-none">
                {item.step}
              </div>

              <div className="space-y-4">
                <div className="h-8 w-8 rounded-full bg-purple-500/10 dark:bg-purple-400/5 text-purple-600 dark:text-purple-400 font-extrabold flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {item.title}
                </h3>
                
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FAQ QUICK ACCORDION */}
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 border-t border-zinc-200 dark:border-zinc-850 pt-16 md:pt-24 space-y-8">
        <h2 className="text-2xl font-extrabold text-center text-zinc-900 dark:text-white flex items-center justify-center gap-2">
          <HelpCircle className="h-5.5 w-5.5 text-purple-500" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "Why do first-year prices differ from renewals?",
              a: "Many registrars offer steep introductory first-year promotional prices (e.g. GoDaddy's $11.99 promo) to acquire customers, but charge standard renewal rates (e.g. $21.99/yr) in subsequent years. DomainCompare displays both so you can calculate long-term costs."
            },
            {
              q: "Does DomainCompare charge any brokerage fees?",
              a: "No! DomainCompare is 100% free to use. We do not sell domains directly or charge any fees. When you click 'Buy Now', you are redirected to the registrar's official portal. We earn a small affiliate commission from them at no cost to you."
            },
            {
              q: "Are the Porkbun and GoDaddy prices live?",
              a: "Yes! If you configure official credentials in `.env.local`, Porkbun prices are fetched live from their Pricing API and cached for performance. Domain availability and alternative suggestions are queried in real-time using GoDaddy's API."
            }
          ].map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-850 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
            >
              <summary className="flex items-center justify-between font-bold text-zinc-900 dark:text-white text-sm sm:text-base select-none">
                <span>{faq.q}</span>
                <span className="ml-1.5 shrink-0 rounded-full bg-zinc-50 dark:bg-zinc-900 p-1.5 text-zinc-500 dark:text-zinc-400 group-open:rotate-180 transition-transform">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-3.5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-850 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}

// Chevron Helper for Accordion
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
