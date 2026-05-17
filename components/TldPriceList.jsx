"use client";
import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { BACKUP_PRICES, REGISTRARS } from "@/lib/prices";
import { useTheme } from "@/components/ThemeProvider";

export default function TldPriceList({ onSelectTld }) {
  const popularTlds = ["com", "net", "org", "io", "co", "ai"];
  const { formatPrice } = useTheme();

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
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#1a1a1a] pb-6">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            Extensions
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-1">
            Popular Registration TLDs
          </h2>
        </div>
        <p className="text-xs text-zinc-400 max-w-sm">
          Click any card to start a real-time availability check under that specific extension.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {popularTlds.map((tld) => {
          const { comparisons, cheapest } = getTldComparison(tld);

          return (
            <div
              key={tld}
              onClick={() => onSelectTld && onSelectTld(tld)}
              className="group cursor-pointer bg-[#080808] border border-[#1a1a1a] hover:border-zinc-700 rounded-xl p-5 shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 relative overflow-hidden"
            >
              {/* Subtle spotlight background glow */}
              <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-zinc-800/5 blur-2xl group-hover:bg-zinc-700/10 transition-colors duration-300"></div>

              {/* Card Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#1a1a1a] mb-4">
                <span className="text-2xl font-black tracking-tighter text-white uppercase font-sans">
                  .{tld}
                </span>
                
                {cheapest && (
                  <span className="flex items-center gap-1 bg-[#0c0c0c] text-emerald-400 px-2 py-0.5 rounded border border-emerald-950/80 text-[9px] font-mono tracking-wider uppercase select-none">
                    <Sparkles className="h-2.5 w-2.5 shrink-0" />
                    <span>{formatPrice(cheapest.price)} at {cheapest.name}</span>
                  </span>
                )}
              </div>

              {/* Price comparison list */}
              <div className="space-y-2">
                {comparisons.map((item) => {
                  const isCheapest = item.id === cheapest?.id;

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between text-xs py-1.5 px-2 rounded-lg transition-all ${
                        isCheapest 
                          ? "bg-[#111] font-bold border border-zinc-800" 
                          : "text-zinc-400 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {/* Monochromatic indicator dot */}
                        <span
                          className="h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: isCheapest ? "#fff" : "#444" }}
                        ></span>
                        <span className={`${isCheapest ? "text-white" : "text-zinc-400"} text-xs`}>
                          {item.name}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-white">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Hover footer hint */}
              <div className="mt-4 pt-3 border-t border-[#1a1a1a] flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span>Check availability</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
