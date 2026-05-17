"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw, AlertTriangle, Globe } from "lucide-react";
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
      <div className="mx-auto max-w-3xl px-6 py-24 text-center space-y-6 animate-fade-in-up bg-black">
        <div className="h-12 w-12 bg-[#0c0c0c] border border-[#222] text-white rounded-lg flex items-center justify-center mx-auto shadow-xl">
          <Globe className="h-6 w-6 animate-pulse" />
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tighter">
          Instant Domain Price Lookup
        </h1>
        <p className="text-zinc-500 text-xs max-w-sm mx-auto leading-relaxed">
          Type an idea below to instantly compare first-year registrations and renewals across top-tier registries.
        </p>
        <SearchBar placeholder="e.g. portfoliobrand" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 space-y-8 animate-fade-in-up bg-black">
      {/* Top Search bar area + back button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a1a1a]">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition-colors shrink-0 group select-none"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Search</span>
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
        <div className="p-6 bg-[#080808] border border-red-950/60 rounded-xl flex items-start gap-4">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5 animate-pulse" />
          <div className="space-y-2">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-red-400">Lookup Query Failed</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">{error}</p>
            <button
              onClick={() => fetchDomainData(domainQuery)}
              className="flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#111] border border-red-950 text-[10px] font-bold text-red-400 hover:bg-[#161616] transition-colors uppercase tracking-wider w-full sm:w-auto select-none"
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
          
          {/* TLD Extension Tabs (Smart Switcher in monochromatic nextjs style) */}
          <div className="space-y-3.5">
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase select-none">
              Filter Extension
            </span>

            <div className="flex flex-wrap gap-2">
              {filterTlds.map((ext) => {
                const isSelected = activeTld === ext;
                return (
                  <button
                    key={ext}
                    onClick={() => handleExtensionSwitch(ext)}
                    disabled={loading}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase font-mono tracking-wider transition-all duration-200 border ${
                      isSelected
                        ? "bg-white border-white text-black scale-[1.02] shadow-md"
                        : "bg-[#0c0c0c] border-[#222] hover:border-zinc-700 text-zinc-400 hover:text-white active:scale-95 disabled:opacity-50"
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
            pricing.length > 0 && availability && (
              <div className="space-y-4">
                <div className="border-b border-[#1a1a1a] pb-4">
                  <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase select-none">
                    Pricing Matrix
                  </span>
                  <h2 className="text-lg font-bold text-white mt-0.5">
                    Registrar Comparisons
                  </h2>
                </div>
                <PriceTable results={pricing} domainName={domain} isAvailable={availability} />
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
    <Suspense fallback={<div className="text-center py-24 text-zinc-500 text-xs animate-pulse tracking-widest uppercase">Initializing Lookup Engine...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
