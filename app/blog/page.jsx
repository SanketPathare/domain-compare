"use client";
import React, { useState } from "react";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Articles" },
    { id: "industry", name: "Domain Industry" },
    { id: "saas", name: "SaaS & Branding" },
    { id: "guides", name: "Guides & Tips" }
  ];

  const articles = [
    {
      id: 1,
      title: "Why .ai Domains Are So Expensive (and Are They Worth It?)",
      excerpt: "The AI boom has driven .ai domain registrations through the roof. We examine the registry fees behind Anguilla's country code, registrar markups, and whether you should buy one.",
      category: "industry",
      categoryName: "Domain Industry",
      date: "May 15, 2026",
      readTime: "5 min read",
      author: "Samantha R.",
      content: "Anguilla country code domains (.ai) are managed directly by the government of Anguilla, which sets wholesale pricing starting around $140 per 2-year registration block. Because of this high base fee, registrars are forced to price them near $80-$100/yr. For AI startups, having a .ai domain builds immediate authority, making it highly valuable despite the steep price."
    },
    {
      id: 2,
      title: "Understanding the Intro Promo vs. Renewal Price Trap",
      excerpt: "Many registrars lure you in with $0.99 or $4.99 domain offers, only to charge $20+ on renewals. Learn how to calculate 3-year costs and choose the best long-term option.",
      category: "guides",
      categoryName: "Guides & Tips",
      date: "May 10, 2026",
      readTime: "4 min read",
      author: "Marcus K.",
      content: "Introductory promotions are marketing strategies utilized by large scale registrars like GoDaddy to acquire users. While registering a domain for $1.99 is excellent, subsequent renewals can cost upwards of $22.99/year. Contrast this with registrars like Porkbun, which has a higher intro rate ($8.49) but stable renewal prices ($10.99). Over 3 years, Porkbun is significantly cheaper."
    },
    {
      id: 3,
      title: "How to Choose the Perfect Domain Name for Your SaaS Brand",
      excerpt: "Your domain is your brand's digital front door. Here is a developer's blueprint on choosing short, memorable, and SEO-friendly names that avoid legal trademark conflicts.",
      category: "saas",
      categoryName: "SaaS & Branding",
      date: "May 02, 2026",
      readTime: "6 min read",
      author: "Lina M.",
      content: "When building a SaaS brand, keep the domain under 15 characters, avoid hyphens, and check standard trademark databases like USPTO. If the exact .com is taken, consider modern extensions like .co, .io, or .app, which are widely accepted in the tech space and significantly cheaper than paying premium brokers."
    },
    {
      id: 4,
      title: "Why Porkbun Became a Developer Favorite Over GoDaddy",
      excerpt: "What makes a small, pig-themed registrar win the hearts of software developers globally? We compare APIs, DNS speeds, standard security features, and support portals.",
      category: "industry",
      categoryName: "Domain Industry",
      date: "Apr 28, 2026",
      readTime: "5 min read",
      author: "David L.",
      content: "Porkbun has achieved massive popularity among developers by offering three key features standard: free WHOIS privacy protection, free SSL certificates, and a transparent, non-hostile pricing model. This stands in contrast to legacy registrars which historically up-sold privacy protection and SSL as paid, recurring additions."
    }
  ];

  const filteredArticles = selectedCategory === "all"
    ? articles
    : articles.filter(art => art.category === selectedCategory);

  const [previewArticle, setPreviewArticle] = useState(null);

  return (
    <div className="relative min-h-screen py-16 sm:py-24 space-y-16 bg-black text-white">
      {/* Background NextJS Radial Spotlight Glow */}
      <div className="nextjs-spotlight"></div>

      {/* 1. Header Hero */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-6 animate-fade-in-up">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-zinc-350 bg-[#0c0c0c] border border-[#222] hover:border-zinc-700 transition-all shadow-md mx-auto select-none">
          <BookOpen className="h-3.5 w-3.5 text-white" />
          <span>Industry Insights & News</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white leading-tight">
          DomainCompare <br />
          <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Knowledge Hub
          </span>
        </h1>
        
        <p className="text-xs sm:text-base text-zinc-450 max-w-xl mx-auto leading-relaxed">
          Stay informed on registry shifts, introductory promo traps, and branding guidelines to make sure you register smart.
        </p>
      </section>

      {/* 2. Category Filters */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all duration-150 border ${
                isSelected
                  ? "bg-white border-white text-black"
                  : "bg-[#0c0c0c] border-[#222] text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </section>

      {/* 3. Article Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => setPreviewArticle(art)}
              className="group cursor-pointer bg-[#080808] border border-[#1a1a1a] hover:border-zinc-700 rounded-xl p-8 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-[#111] text-[9px] font-mono tracking-widest border border-zinc-800 text-zinc-400 uppercase select-none">
                    {art.categoryName}
                  </span>
                  
                  <span className="text-[10px] font-mono text-zinc-550 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {art.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight uppercase group-hover:text-zinc-300 transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs text-zinc-450 leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              {/* Metadata row */}
              <div className="mt-8 pt-5 border-t border-[#1a1a1a] flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <div className="flex items-center gap-1 font-mono">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{art.date}</span>
                </div>
                <div className="flex items-center gap-1 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Read Article</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Article Preview Dialog overlay */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#080808] border border-[#222] rounded-xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[85vh] overflow-y-auto animate-fade-in-up">
            
            {/* Header info */}
            <div className="space-y-3.5">
              <span className="inline-block px-2.5 py-0.5 rounded bg-[#111] text-[9px] font-mono tracking-widest border border-zinc-850 text-zinc-400 uppercase select-none">
                {previewArticle.categoryName}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                {previewArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 pt-1">
                <span>By {previewArticle.author}</span>
                <span>•</span>
                <span>{previewArticle.date}</span>
                <span>•</span>
                <span>{previewArticle.readTime}</span>
              </div>
            </div>

            {/* Content body */}
            <div className="text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-[#1a1a1a] pt-5 space-y-4">
              <p>{previewArticle.excerpt}</p>
              <div className="bg-black p-4 border border-[#1a1a1a] rounded-lg italic text-zinc-300 font-medium">
                {previewArticle.content}
              </div>
              <p>Understanding these intricacies can save startup founders and developers thousands of dollars over the lifetime of a business. Be sure to use our Price Comparison Search on the Home Page to verify and map these prices in real-time!</p>
            </div>

            {/* Actions footer */}
            <div className="flex justify-end pt-2 w-full">
              <button
                onClick={() => setPreviewArticle(null)}
                className="flex items-center justify-center px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-black font-extrabold text-xs transition-all select-none w-full sm:w-auto"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
