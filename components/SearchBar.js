"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Loader2, AlertCircle } from "lucide-react";

export default function SearchBar({ initialValue = "", placeholder = "Search your next domain... (e.g., myawesomeidea)", isLoading = false, onSearch }) {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      // Sync local query display to show the normalized version
      setQuery(validatedDomain);
      setIsLocalLoading(true);

      if (onSearch) {
        onSearch(validatedDomain);
        setIsLocalLoading(false);
      } else {
        // standalone page navigation
        router.push(`/results?domain=${encodeURIComponent(validatedDomain)}`);
        // We keep local loading true until navigation transitions
      }
    }
  };

  // Reset local loading if parent loading state switches off
  useEffect(() => {
    if (!isLoading) {
      setIsLocalLoading(false);
    }
  }, [isLoading]);

  const activeLoading = isLoading || isLocalLoading;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Glow effect on hover */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-500 opacity-20 blur-lg transition-all duration-300 group-hover:opacity-45 group-focus-within:opacity-50"></div>
        
        {/* Input Wrapper */}
        <div className="relative flex items-center bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden p-1.5 transition-all duration-200 group-focus-within:border-purple-500">
          <div className="pl-4 text-zinc-400 dark:text-zinc-500">
            {activeLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
            ) : (
              <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-purple-500 transition-colors" />
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
            className="w-full px-3 py-3.5 bg-transparent border-0 outline-none text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 font-medium text-base sm:text-lg focus:ring-0"
            disabled={activeLoading}
          />

          <button
            type="submit"
            disabled={activeLoading}
            className="flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all duration-200 shadow-md shadow-purple-600/20 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed text-sm sm:text-base whitespace-nowrap"
          >
            {activeLoading ? "Searching..." : "Compare"}
          </button>
        </div>
      </form>

      {/* Validation Error Message */}
      {error && (
        <div className="mt-3 flex items-center gap-2 text-red-500 dark:text-red-400 text-sm pl-2 animate-bounce">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
