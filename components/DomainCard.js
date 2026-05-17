"use client";
import React, { useState } from "react";
import { Check, Copy, Share2, AlertCircle, Sparkles, ArrowRight } from "lucide-react";

export default function DomainCard({ domain = "", available = false, suggestions = [], onSearchSuggestion }) {
  const [copiedDomain, setCopiedDomain] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleCopyDomain = async () => {
    try {
      await navigator.clipboard.writeText(domain);
      setCopiedDomain(true);
      setTimeout(() => setCopiedDomain(false), 2000);
    } catch (err) {
      console.error("Failed to copy domain name:", err);
    }
  };

  const handleShareResults = async () => {
    try {
      const shareUrl = typeof window !== "undefined" ? window.location.href : "";
      await navigator.clipboard.writeText(shareUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } catch (err) {
      console.error("Failed to copy share URL:", err);
    }
  };

  if (!domain) return null;

  return (
    <div className="w-full space-y-6">
      {/* Primary Card */}
      <div className="relative overflow-hidden bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-850 rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300">
        {/* Glow behind the status card */}
        <div className={`absolute top-0 right-0 h-40 w-40 rounded-full blur-[80px] -z-10 opacity-15 ${
          available ? "bg-emerald-500" : "bg-red-500"
        }`}></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Domain name and badge */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white break-all">
                {domain}
              </h1>
              
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm select-none ${
                available 
                  ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50" 
                  : "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/50"
              }`}>
                {available ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Available
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3.5 w-3.5" />
                    Taken
                  </>
                )}
              </span>
            </div>
            
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {available 
                ? "Excellent! This domain is currently open for registration. Secure it at the best price below." 
                : "Oops! This domain is already registered. Try searching another or browse alternatives below."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Copy Button */}
            <button
              onClick={handleCopyDomain}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-semibold text-sm transition-all duration-200 active:scale-95 shadow-sm"
              title="Copy domain name"
            >
              {copiedDomain ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500 animate-bounce" />
                  <span className="text-emerald-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Name</span>
                </>
              )}
            </button>

            {/* Share Button */}
            <button
              onClick={handleShareResults}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-all duration-200 active:scale-95 shadow-md shadow-purple-600/10"
              title="Copy share results link"
            >
              {copiedShare ? (
                <>
                  <Check className="h-4 w-4 animate-bounce" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  <span>Share Results</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Alternative Suggestions Panel (always show, but display with highlight if domain is taken) */}
      {suggestions && suggestions.length > 0 && (
        <div className={`border rounded-3xl p-6 sm:p-8 bg-zinc-50/50 dark:bg-zinc-900/20 backdrop-blur-sm transition-all duration-300 ${
          !available 
            ? "border-purple-500/30 dark:border-purple-500/20 shadow-purple-500/5 shadow-md"
            : "border-zinc-200 dark:border-zinc-850"
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-500 animate-pulse" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              {!available ? "Recommended Alternatives" : "Other Great Ideas"}
            </h2>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">
            Click any suggestion below to perform an instant price check.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSearchSuggestion && onSearchSuggestion(suggestion)}
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#0e0e0e] border border-zinc-150 dark:border-zinc-850 text-left hover:border-purple-500 dark:hover:border-purple-500/60 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-200"
              >
                <span className="font-semibold text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 break-all select-none">
                  {suggestion}
                </span>
                <ArrowRight className="h-4 w-4 text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
