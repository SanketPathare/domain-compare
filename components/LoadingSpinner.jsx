"use client";
import React from "react";
import { Loader2 } from "lucide-react";

/**
 * Standard Centered Spinner
 */
export function LoadingSpinner({ size = "large" }) {
  const sizeClasses = {
    small: "h-4 w-4 text-white",
    medium: "h-6 w-6 text-white",
    large: "h-10 w-10 text-white"
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin`} />
      <span className="text-zinc-550 text-xs font-mono tracking-widest uppercase animate-pulse">
        Querying Registry Node...
      </span>
    </div>
  );
}

/**
 * Shimmering Skeleton for DomainCard
 */
export function SkeletonDomainCard() {
  return (
    <div className="w-full bg-[#080808] border border-[#1a1a1a] rounded-xl p-6 shadow-2xl animate-pulse shimmer-mask">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-3.5 w-full sm:w-2/3">
          <div className="h-6 bg-zinc-900 rounded-md w-1/3"></div>
          <div className="h-3.5 bg-zinc-900/80 rounded-md w-3/4"></div>
        </div>
        <div className="h-9 bg-zinc-900 rounded-md w-32 shrink-0"></div>
      </div>
    </div>
  );
}

/**
 * Shimmering Skeleton for PriceTable (aligned to the redesigned 4-column layout)
 */
export function SkeletonPriceTable() {
  const placeholderRows = [1, 2, 3];

  return (
    <div className="w-full bg-[#080808] border border-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden animate-pulse shimmer-mask">
      {/* Header Skeleton */}
      <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-4 border-b border-[#1a1a1a] bg-[#0c0c0c]/50">
        <div className="h-3.5 bg-zinc-900 rounded w-1/3"></div>
        <div className="h-3.5 bg-zinc-900 rounded w-1/2"></div>
        <div className="h-3.5 bg-zinc-900 rounded w-1/2"></div>
        <div className="h-3.5 bg-zinc-900 rounded w-1/3 ml-auto"></div>
      </div>

      {/* Row Skeletons */}
      <div className="divide-y divide-[#1a1a1a]">
        {placeholderRows.map((row) => (
          <div key={row} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-5">
            {/* Logo/Name Column */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-zinc-900 rounded-lg shrink-0"></div>
              <div className="space-y-1.5 w-full">
                <div className="h-3.5 bg-zinc-900 rounded w-2/3"></div>
              </div>
            </div>

            {/* Price Column */}
            <div className="space-y-1.5">
              <div className="h-4 bg-zinc-900 rounded w-1/2"></div>
            </div>

            {/* Renewal Column */}
            <div className="hidden md:block space-y-1.5">
              <div className="h-4 bg-zinc-900 rounded w-1/3"></div>
            </div>

            {/* Action Column */}
            <div className="flex justify-end mt-2 md:mt-0">
              <div className="h-8.5 bg-zinc-900 rounded-lg w-full md:w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
