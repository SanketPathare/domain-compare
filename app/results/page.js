"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw, AlertTriangle, Globe, Sparkles } from "lucide-react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import DomainCard from "@/components/DomainCard";
import PriceTable from "@/components/PriceTable";
import { SkeletonDomainCard, SkeletonPriceTable } from "@/components/LoadingSpinner";

// Static helper to parse TLD (e.g. 'com', 'net')
const getTld = (domainStr) => {
  const parts = domainStr.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "com";
};

// Static helper to parse name without TLD (e.g., 'google')
const getNameWithoutTld = (domainStr) => {
  return domainStr.split(".")[0] || "";
};

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const domainQuery = searchParams.get("domain") || "";

  const [domain, setDomain] = useState(domainQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Data states
  const [availability, setAvailability] = useState(null);
  const [pricing, setPricing] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const activeTld = getTld(domainQuery);
  const nameBase = getNameWithoutTld(domainQuery);

  const fetchDomainData = useCallback(async (targetDomain) => {
    if (!targetDomain) return;

    setLoading(true);
    setError("");
    
    try {
      const normalizedDomain = targetDomain.toLowerCase().trim();
      const tld = getTld(normalizedDomain);

      // Concurrent fetch for availability check and pricing checks
      const [checkRes, pricesRes] = await Promise.all([
        fetch(`/api/check?domain=${encodeURIComponent(normalizedDomain)}`),
        fetch(`/api/prices?tld=${encodeURIComponent(tld)}&domain=${encodeURIComponent(normalizedDomain)}`)
      ]);

      if (!checkRes.ok || !pricesRes.ok) {
        throw new Error("Failed to communicate with registrar lookup engines.");
      }

      const checkData = await checkRes.json();
      const pricesData = await pricesRes.json();

      if (checkData.error) throw new Error(checkData.error);
      if (pricesData.error) throw new Error(pricesData.error);

      setAvailability(checkData.available);
      setSuggestions(checkData.suggestions || []);
      setPricing(pricesData.results || []);
      setDomain(normalizedDomain);

    } catch (err) {
      console.error("Results Fetch Error:", err);
      setError(err.message || "An unexpected error occurred while querying. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Trigger search on query change
  useEffect(() => {
    if (domainQuery) {
      fetchDomainData(domainQuery);
    }
  }, [domainQuery, fetchDomainData]);

  const handleSearchRedirect = (newDomain) => {
    router.push(`/results?domain=${encodeURIComponent(newDomain)}`);
  };

  const handleExtensionSwitch = (ext) => {
    if (nameBase) {
      handleSearchRedirect(`${nameBase}.${ext}`);
    }
  };

  // Popular extensions list for TLD Filter/Tabs
  const filterTlds = ["com", "net", "org", "io", "co", "ai"];

  // Empty State: if no domain query is entered yet
  if (!domainQuery) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center space-y-6 animate-fade-in-up">
        <div className="h-16 w-16 bg-purple-100 dark:bg-purple-950/40 text-purple-600 rounded-full flex items-center justify-center mx-auto shadow-md">
          <Globe className="h-8 w-8 animate-pulse" />
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
          Start Comparing Domain Prices
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto">
          Type an idea below to instantly compare first-year registrations and renewals across top-tier registries.
        </p>
        <SearchBar placeholder="e.g. portfoliobrand" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 animate-fade-in-up">
      {/* Top Search bar area + back button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-850">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-semibold text-zinc-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors shrink-0 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Home</span>
        </Link>
        
        <div className="w-full max-w-2xl">
          <SearchBar
            initialValue={domainQuery}
            isLoading={loading}
            onSearch={handleSearchRedirect}
          />
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400 shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-2">
            <h3 className="font-extrabold text-red-800 dark:text-red-300">Lookup Query Failed</h3>
            <p className="text-sm text-red-750 dark:text-red-405 leading-relaxed">{error}</p>
            <button
              onClick={() => fetchDomainData(domainQuery)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/40 dark:hover:bg-red-900/60 text-xs font-bold text-red-800 dark:text-red-200 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Retry Lookup</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Results Layout */}
      {!error && (
        <div className="space-y-8">
          
          {/* TLD Extension Tabs (Smart Switcher) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Switch Extensions
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {filterTlds.map((ext) => {
                const isSelected = activeTld === ext;
                return (
                  <button
                    key={ext}
                    onClick={() => handleExtensionSwitch(ext)}
                    disabled={loading}
                    className={`px-4.5 py-2.5 rounded-2xl text-sm font-bold uppercase transition-all duration-200 shadow-sm border ${
                      isSelected
                        ? "bg-purple-600 border-purple-600 text-white shadow-purple-600/10 scale-105"
                        : "bg-white dark:bg-[#0f0f0f] border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 dark:hover:border-purple-500/40 text-zinc-700 dark:text-zinc-300 active:scale-95 disabled:opacity-50"
                    }`}
                  >
                    .{ext}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability Card Area */}
          {loading ? (
            <SkeletonDomainCard />
          ) : (
            availability !== null && (
              <DomainCard
                domain={domain}
                available={availability}
                suggestions={suggestions}
                onSearchSuggestion={handleSearchRedirect}
              />
            )
          )}

          {/* Pricing Comparisons Area */}
          {loading ? (
            <SkeletonPriceTable />
          ) : (
            pricing.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Registrar Price Comparison
                </h2>
                <PriceTable results={pricing} domainName={domain} />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function Results() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-zinc-500 animate-pulse">Loading search params...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
