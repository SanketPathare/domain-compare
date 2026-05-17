"use client";
import React from "react";
import { Sparkles, ArrowRight, Tag } from "lucide-react";
import { BACKUP_PRICES, REGISTRARS } from "@/lib/prices";

export default function TldPriceList({ onSelectTld }) {
  const popularTlds = ["com", "net", "org", "io", "co", "ai"];

  // Helper to compile prices for a given TLD and find the cheapest registrar
  const getTldComparison = (tld) => {
    const list = REGISTRARS.map(r => {
      const price = BACKUP_PRICES[r.id]?.[tld]?.register || 0;
      return {
        id: r.id,
        name: r.name,
        color: r.color,
        price: price
      };
    });

    // Find the minimum price
    const minPrice = Math.min(...list.map(item => item.price));
    
    return {
      comparisons: list,
      cheapest: list.find(item => item.price === minPrice)
    };
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
            <Tag className="h-5.5 w-5.5 text-purple-600 dark:text-purple-400" />
            <span>Popular Domain Extensions</span>
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Compare base first-year registration rates across popular extensions. Click a card to start searching.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularTlds.map((tld) => {
          const { comparisons, cheapest } = getTldComparison(tld);

          return (
            <div
              key={tld}
              onClick={() => onSelectTld && onSelectTld(tld)}
              className="group cursor-pointer bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-850 hover:border-purple-500/60 dark:hover:border-purple-500/40 rounded-3xl p-6 shadow-md hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Highlight background glow */}
              <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-purple-500/5 blur-2xl group-hover:bg-purple-500/10 transition-colors duration-300"></div>

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-850 mb-4">
                <span className="text-3xl font-black tracking-tight text-purple-600 dark:text-purple-400 uppercase">
                  .{tld}
                </span>
                
                {cheapest && (
                  <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border border-emerald-100 dark:border-emerald-900/50 shadow-sm select-none">
                    <Sparkles className="h-3 w-3 animate-pulse shrink-0" />
                    <span>${cheapest.price.toFixed(2)} at {cheapest.name}</span>
                  </span>
                )}
              </div>

              {/* Price comparison list */}
              <div className="space-y-2.5">
                {comparisons.map((item) => {
                  const isCheapest = item.id === cheapest?.id;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between text-xs py-1.5 px-2 rounded-xl transition-all ${
                        isCheapest 
                          ? "bg-purple-50/50 dark:bg-purple-950/20 font-bold border border-purple-100/50 dark:border-purple-900/30" 
                          : "text-zinc-650 dark:text-zinc-450 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {/* Dot indicator matching Brand color */}
                        <span
                          className="h-2 w-2 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        ></span>
                        <span className="text-zinc-700 dark:text-zinc-300">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-mono text-zinc-950 dark:text-white">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Hover footer hint */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Check availability</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
