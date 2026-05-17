"use client";
import React, { useState, useMemo } from "react";
import { ArrowUpDown, ExternalLink, HelpCircle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

// Helper component to render stylized brand monogram if static images are missing
function BrandLogo({ id, name, color }) {
  const char = name.charAt(0);
  
  // Custom styled monograms matching brand accents
  const brandLogos = {
    porkbun: (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white font-extrabold shadow-md shadow-orange-500/10 text-lg">
        🐷
      </div>
    ),
    namecheap: (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500 text-white font-black shadow-md shadow-red-500/10 text-lg">
        N
      </div>
    ),
    godaddy: (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white font-black shadow-md shadow-emerald-500/10 text-lg">
        G
      </div>
    ),
    hostinger: (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white font-black shadow-md shadow-purple-600/10 text-lg bg-gradient-to-tr from-indigo-700 to-purple-500">
        H
      </div>
    )
  };

  return brandLogos[id] || (
    <div style={{ backgroundColor: color }} className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-extrabold text-lg shadow-md">
      {char}
    </div>
  );
}

export default function PriceTable({ results = [], domainName = "" }) {
  const [sortBy, setSortBy] = useState("cheapest"); // "cheapest", "renew"
  const { formatPrice } = useTheme();
  
  // Sort the results array based on criteria
  const sortedResults = useMemo(() => {
    const list = [...results];
    if (sortBy === "cheapest") {
      return list.sort((a, b) => a.register - b.register);
    } else if (sortBy === "renew") {
      return list.sort((a, b) => a.renew - b.renew);
    }
    return list;
  }, [results, sortBy]);

  // Find the cheapest option in the current results list for highlighting
  const cheapestPrice = useMemo(() => {
    if (results.length === 0) return 0;
    return Math.min(...results.map(r => r.register));
  }, [results]);

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500">
        No pricing configurations found for this extension.
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Controls: Sorting Indicators */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-850 px-5 py-3 rounded-2xl">
        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Showing registrar prices for <span className="text-purple-600 dark:text-purple-400 font-extrabold">{domainName}</span>
        </span>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-zinc-400 shrink-0" />
          <span className="text-xs text-zinc-500 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500 text-zinc-800 dark:text-zinc-200"
          >
            <option value="cheapest">Registration Price (Cheapest First)</option>
            <option value="renew">Renewal Price (Cheapest First)</option>
          </select>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="w-full bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-850 rounded-3xl shadow-xl overflow-hidden">
        {/* Table Header (Desktop Only, 4-column layout) */}
        <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4.5 border-b border-zinc-150 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/10 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          <div>Registrar</div>
          <div>Registration Price</div>
          <div>Renewal Price</div>
          <div className="text-right">Action</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-zinc-150 dark:divide-zinc-850">
          {sortedResults.map((item) => {
            const isCheapest = item.register === cheapestPrice;

            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-6 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors duration-200 relative ${
                  isCheapest ? "bg-purple-50/10 dark:bg-purple-950/5" : ""
                }`}
              >
                {/* Visual indicator for cheapest */}
                {isCheapest && (
                  <div className="absolute top-0 left-0 w-1 md:h-full md:w-1 bg-purple-600 dark:bg-purple-500 h-1"></div>
                )}

                {/* Column 1: Brand Info */}
                <div className="flex items-center gap-3.5">
                  <BrandLogo id={item.id} name={item.name} color={item.color} />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-zinc-900 dark:text-white text-base">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span
                          style={{
                            backgroundColor: `${item.color}15`,
                            color: item.color,
                            borderColor: `${item.color}30`
                          }}
                          className="px-2 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider select-none shrink-0"
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Column 2: Register Price */}
                <div className="flex flex-row md:flex-col items-baseline md:items-start justify-between md:justify-center gap-1 md:gap-0">
                  <span className="text-xs font-medium text-zinc-400 md:hidden">Registration:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                      {formatPrice(item.register)}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-semibold uppercase bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded shrink-0">
                      1st Year
                    </span>
                  </div>
                </div>

                {/* Column 3: Renewal Price */}
                <div className="flex flex-row md:flex-col items-baseline md:items-start justify-between md:justify-center gap-1 md:gap-0">
                  <span className="text-xs font-medium text-zinc-400 md:hidden">Renewal:</span>
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-300">
                    {formatPrice(item.renew)}<span className="text-zinc-500 font-normal">/yr</span>
                  </span>
                </div>

                {/* Column 4: Buy Now Button */}
                <div className="flex justify-end mt-2 md:mt-0">
                  <a
                    href={item.affiliate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3 rounded-2xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 text-center shadow-lg"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 4px 14px -4px ${item.color}50`
                    }}
                  >
                    <span>Buy Now</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Notice */}
      <div className="flex items-start gap-2.5 px-4 py-3 bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-150 dark:border-zinc-850 rounded-2xl text-[11px] text-zinc-400 leading-normal">
        <HelpCircle className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
        <span>
          Registrar availability and pricing calculations are fetched live where supported. First-year promo prices often differ from standard renewal values. Affiliate links contain tracking cookies and generate small referral support fees at no extra cost to you.
        </span>
      </div>
    </div>
  );
}
