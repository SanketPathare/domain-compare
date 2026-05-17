"use client";
import React from "react";
import { Loader2 } from "lucide-react";

/**
 * Standard Centered Spinner
 */
export function LoadingSpinner({ size = "large" }) {
  const sizeClasses = {
    small: "h-5 w-5",
    medium: "h-8 w-8",
    large: "h-12 w-12 text-purple-600"
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin`} />
      <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium animate-pulse">
        Fetching live pricing tables...
      </span>
    </div>
  );
}

/**
 * Shimmering Skeleton for DomainCard
 */
export function SkeletonDomainCard() {
  return (
    <div className="w-full bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-850 rounded-2xl p-6 shadow-md animate-pulse">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-2.5 w-full sm:w-2/3">
          <div className="h-7 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-1/2"></div>
          <div className="h-4 bg-zinc-150 dark:bg-zinc-850 rounded-lg w-3/4"></div>
        </div>
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-32 shrink-0"></div>
      </div>
    </div>
  );
}

/**
 * Shimmering Skeleton for PriceTable
 */
export function SkeletonPriceTable() {
  // Generate 4 rows of placeholders
  const placeholderRows = [1, 2, 3, 4];

  return (
    <div className="w-full bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-850 rounded-2xl shadow-lg overflow-hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4 border-b border-zinc-100 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3 ml-auto"></div>
      </div>

      {/* Row Skeletons */}
      <div className="divide-y divide-zinc-100 dark:divide-zinc-850">
        {placeholderRows.map((row) => (
          <div key={row} className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 p-6">
            {/* Logo/Name Column */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-zinc-250 dark:bg-zinc-800 rounded-xl shrink-0"></div>
              <div className="space-y-1.5 w-full">
                <div className="h-4.5 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3"></div>
                <div className="h-3.5 bg-zinc-150 dark:bg-zinc-850 rounded w-1/3"></div>
              </div>
            </div>

            {/* Price Column */}
            <div className="space-y-1.5">
              <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
              <div className="h-3 bg-zinc-150 dark:bg-zinc-850 rounded w-1/3 md:hidden"></div>
            </div>

            {/* Renewal Column */}
            <div className="hidden md:block space-y-1.5">
              <div className="h-4.5 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
            </div>

            {/* Rating Column */}
            <div className="hidden md:block">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-24"></div>
            </div>

            {/* Action Column */}
            <div className="flex justify-end mt-2 md:mt-0">
              <div className="h-10 bg-zinc-200 dark:bg-zinc-850 rounded-xl w-full md:w-28 shadow-sm"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
