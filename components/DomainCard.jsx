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
      <div className="relative overflow-hidden bg-[#080808] border border-[#1a1a1a] rounded-xl p-6 sm:p-8 shadow-2xl transition-all duration-300">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Domain name and badge */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tighter text-white break-all font-mono">
                {domain}
              </h1>
              
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase select-none ${
                available 
                  ? "bg-[#06170c] text-emerald-400 border border-emerald-955" 
                  : "bg-[#180808] text-red-400 border border-red-955"
              }`}>
                {available ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Available
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3" />
                    Registered
                  </>
                )}
              </span>
            </div>
            
            <p className="text-xs text-zinc-400">
              {available 
                ? "This brand domain is currently open for registration. Secure it at the lowest price listed below." 
                : "This domain is currently owned. You can check alternative TLD extensions or browse recommended variations below."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto gap-2 shrink-0">
            {/* Copy Button */}
            <button
              onClick={handleCopyDomain}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#222] bg-[#0c0c0c] hover:bg-[#111] text-zinc-300 font-bold text-xs transition-all duration-150 active:scale-95 shadow-sm w-full sm:w-auto select-none"
              title="Copy domain name"
            >
              {copiedDomain ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400 animate-bounce" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Name</span>
                </>
              )}
            </button>

            {/* Share Button */}
            <button
              onClick={handleShareResults}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-extrabold text-xs transition-all duration-150 active:scale-95 shadow-md w-full sm:w-auto select-none"
              title="Copy share results link"
            >
              {copiedShare ? (
                <>
                  <Check className="h-3.5 w-3.5 animate-bounce" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share Results</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Alternative Suggestions Panel */}
      {suggestions && suggestions.length > 0 && (
        <div className={`border rounded-xl p-6 sm:p-8 bg-[#080808] border-[#1a1a1a] transition-all duration-300 ${
          !available 
            ? "border-zinc-700"
            : "border-[#1a1a1a]"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4.5 w-4.5 text-white" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {!available ? "Recommended Alternatives" : "Other Variations"}
            </h2>
          </div>

          <p className="text-[11px] text-zinc-500 mb-5">
            Click any suggestion below to perform an instant price check on that extension.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSearchSuggestion && onSearchSuggestion(suggestion)}
                className="group flex items-center justify-between p-3.5 rounded-lg bg-[#0c0c0c] border border-[#222] text-left hover:border-zinc-700 hover:text-white transition-all duration-150"
              >
                <span className="font-mono text-xs text-zinc-400 group-hover:text-white break-all select-none">
                  {suggestion}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-zinc-650 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
