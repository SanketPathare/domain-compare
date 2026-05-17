"use client";
import React, { useState, useMemo } from "react";
import { ArrowUpDown, ExternalLink, HelpCircle, Lock } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

// Helper component to render stylized brand monogram matching vercel developer guides
function BrandLogo({ id, name, color }) {
  const char = name.charAt(0);
  
  const brandLogos = {
    porkbun: (
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600/10 border border-orange-950 text-white font-extrabold text-sm select-none">
        🐷
      </div>
    ),
    namecheap: (
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600/10 border border-red-950 text-red-500 font-black text-sm select-none">
        N
      </div>
    ),
    godaddy: (
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/10 border border-emerald-950 text-emerald-500 font-black text-sm select-none">
        G
      </div>
    ),
    hostinger: (
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600/10 border border-purple-950 text-purple-400 font-black text-sm select-none">
        H
      </div>
    )
  };

  return brandLogos[id] || (
    <div style={{ borderColor: color, color: color }} className="flex h-8 w-8 items-center justify-center rounded-lg border bg-zinc-950 text-white font-extrabold text-sm shadow-md">
      {char}
    </div>
  );
}

export default function PriceTable({ results = [], domainName = "", isAvailable = true }) {
  const [sortBy, setSortBy] = useState("cheapest");
  const { formatPrice } = useTheme();
  
  const sortedResults = useMemo(() => {
    const list = [...results];
    if (sortBy === "cheapest") {
      return list.sort((a, b) => a.register - b.register);
    } else if (sortBy === "renew") {
      return list.sort((a, b) => a.renew - b.renew);
    }
    return list;
  }, [results, sortBy]);

  const cheapestPrice = useMemo(() => {
    if (results.length === 0) return 0;
    return Math.min(...results.map(r => r.register));
  }, [results]);

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-10 text-zinc-650 text-xs font-mono">
        No pricing configurations found for this extension.
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Controls: Sorting Indicators */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#080808] border border-[#1a1a1a] px-5 py-3 rounded-xl">
        <span className="text-xs font-medium text-zinc-400">
          Registrar rates for <span className="text-white font-bold font-mono">{domainName}</span>
        </span>

        {/* Sort Select matching nextjs.org */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold bg-[#0c0c0c] border border-[#222] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-zinc-500 text-zinc-300 outline-none cursor-pointer transition-all"
          >
            <option value="cheapest">Introductory Rate (Cheapest First)</option>
            <option value="renew">Renewal Rate (Cheapest First)</option>
          </select>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="w-full bg-[#080808] border border-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl">
        {/* Table Header (Desktop Only) */}
        <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4 border-b border-[#1a1a1a] bg-[#0c0c0c]/50 text-[10px] font-bold uppercase tracking-widest text-zinc-500 select-none">
          <div>Registrar</div>
          <div>Introductory Price</div>
          <div>Renewal Price</div>
          <div className="text-right">Action</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-[#1a1a1a]">
          {sortedResults.map((item) => {
            const isCheapest = item.register === cheapestPrice;

            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-5 hover:bg-[#0c0c0c]/50 transition-colors duration-150 relative ${
                  isCheapest ? "bg-zinc-950/20" : ""
                }`}
              >
                {/* Visual indicator for cheapest */}
                {isCheapest && (
                  <div className="absolute top-0 left-0 w-1 md:h-full md:w-1 bg-white h-1"></div>
                )}

                {/* Column 1: Brand Info */}
                <div className="flex items-center gap-3">
                  <BrandLogo id={item.id} name={item.name} color={item.color} />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span
                          style={{
                            borderColor: `${item.color}35`,
                            color: item.color,
                            backgroundColor: `${item.color}08`
                          }}
                          className="px-2 py-0.5 rounded text-[9px] font-mono tracking-widest border uppercase"
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Column 2: Register Price */}
                <div className="flex flex-row md:flex-col items-baseline md:items-start justify-between md:justify-center gap-1 md:gap-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 md:hidden">Intro:</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold font-mono text-white">
                      {formatPrice(item.register)}
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider bg-[#111] px-1 rounded select-none">
                      1st Year
                    </span>
                  </div>
                </div>

                {/* Column 3: Renewal Price */}
                <div className="flex flex-row md:flex-col items-baseline md:items-start justify-between md:justify-center gap-1 md:gap-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 md:hidden">Renewal:</span>
                  <span className="text-xs font-semibold font-mono text-zinc-300">
                    {formatPrice(item.renew)}<span className="text-zinc-550 font-normal">/yr</span>
                  </span>
                </div>

                {/* Column 4: Buy Now Button */}
                <div className="flex justify-end mt-2 md:mt-0">
                  {isAvailable ? (
                    <a
                      href={item.affiliate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full md:w-auto px-5 py-2.5 rounded-lg font-bold text-xs bg-white hover:bg-zinc-200 text-black transition-all duration-150 active:scale-95 text-center shadow-sm select-none"
                    >
                      <span>Register</span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  ) : (
                    <div
                      className="flex items-center justify-center gap-1.5 w-full md:w-auto px-5 py-2.5 rounded-lg font-bold text-xs bg-[#111] border border-[#222] text-zinc-500 text-center select-none cursor-not-allowed"
                    >
                      <span>Taken</span>
                      <Lock className="h-3 w-3 shrink-0 text-zinc-650" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Notice */}
      <div className="flex items-start gap-2.5 px-4 py-3 bg-[#080808] border border-[#1a1a1a] rounded-lg text-[10px] text-zinc-500 leading-normal select-none">
        <HelpCircle className="h-4 w-4 text-zinc-650 shrink-0 mt-0.5" />
        <span>
          Rates represent base values. Introductory promotions are subject to change by respective registrars. Affiliate UTM redirects contain tracking descriptors helping run this engine at no extra cost to you.
        </span>
      </div>
    </div>
  );
}
