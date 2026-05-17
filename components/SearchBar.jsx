"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, AlertCircle } from "lucide-react";

export default function SearchBar({ initialValue = "", placeholder = "Compare domain availability... (e.g., brandname)", isLoading = false, onSearch }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);
  const [error, setError] = useState("");
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  // Sync state if initialValue changes (e.g., navigating backwards or changing URL query)
  useEffect(() => {
    if (initialValue) {
      setQuery(initialValue);
    }
  }, [initialValue]);

  // Clean-up and validate the domain string
  const cleanAndValidateDomain = (input) => {
    let clean = input.toLowerCase().trim();
    if (!clean) {
      setError("Please enter a domain name.");
      return null;
    }

    // 1. Remove protocol (http://, https://)
    clean = clean.replace(/^(https?:\/\/)?(www\.)?/, "");

    // 2. Remove trailing slashes or pathing
    clean = clean.split("/")[0];

    // 3. Auto-append .com if the user didn't write any TLD (i.e. no dot)
    if (!clean.includes(".")) {
      clean = `${clean}.com`;
    }

    // 4. Regex domain validation
    const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!domainRegex.test(clean)) {
      setError("Please enter a valid domain name format (e.g., mysite.com).");
      return null;
    }

    setError("");
    return clean;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validatedDomain = cleanAndValidateDomain(query);
    
    if (validatedDomain) {
      setQuery(validatedDomain);
      setIsLocalLoading(true);

      if (onSearch) {
        onSearch(validatedDomain);
        setIsLocalLoading(false);
      } else {
        router.push(`/results?domain=${encodeURIComponent(validatedDomain)}`);
      }
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setIsLocalLoading(false);
    }
  }, [isLoading]);

  const activeLoading = isLoading || isLocalLoading;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Monochromatic Vercel spotlight outline glow on hover */}
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-700 opacity-20 blur-md transition-all duration-300 group-hover:opacity-60 group-focus-within:opacity-70"></div>
        
        {/* Input Wrapper - nextjs.org command bar search style */}
        <div className="relative flex items-center bg-[#0a0a0a] border border-[#222] rounded-xl shadow-2xl overflow-hidden p-1 transition-all duration-200 group-focus-within:border-zinc-400 group-focus-within:bg-[#0c0c0c]">
          <div className="pl-3 text-zinc-500 shrink-0">
            {activeLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              <Search className="h-4 w-4 text-zinc-500 group-focus-within:text-white transition-colors" />
            )}
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (error) setError("");
            }}
            placeholder={placeholder}
            className="w-full px-2 sm:px-3 py-2.5 sm:py-3 bg-transparent border-0 outline-none text-white placeholder-zinc-650 font-medium text-xs sm:text-sm md:text-base focus:ring-0"
            disabled={activeLoading}
          />

          {/* Monospace Keyboard Hint */}
          <div className="hidden md:flex items-center gap-1 mr-3 text-[10px] font-mono text-zinc-600 bg-[#161616] px-1.5 py-0.5 rounded border border-[#222] select-none">
            <span>Enter</span>
          </div>

          <button
            type="submit"
            disabled={activeLoading}
            className="flex items-center justify-center gap-1 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-extrabold transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-[10px] sm:text-xs md:text-sm whitespace-nowrap shadow-sm shrink-0"
          >
            {activeLoading ? "Searching..." : "Compare"}
          </button>
        </div>
      </form>

      {/* Validation Error Message */}
      {error && (
        <div className="mt-3 flex items-center gap-2 text-zinc-400 text-xs pl-2">
          <AlertCircle className="h-3.5 w-3.5 text-red-500" />
          <span className="font-mono text-red-500">{error}</span>
        </div>
      )}
    </div>
  );
}
