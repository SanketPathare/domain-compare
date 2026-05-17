"use client";
import React, { useState } from "react";
import { BookOpen, Calendar, Clock, ArrowRight, Flame } from "lucide-react";

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
      color: "from-purple-500 to-indigo-500",
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
      color: "from-orange-500 to-red-500",
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
      color: "from-emerald-500 to-teal-500",
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
      color: "from-pink-500 to-rose-500",
      content: "Porkbun has achieved massive popularity among developers by offering three key features standard: free WHOIS privacy protection, free SSL certificates, and a transparent, non-hostile pricing model. This stands in contrast to legacy registrars which historically up-sold privacy protection and SSL as paid, recurring additions."
    }
  ];

  const filteredArticles = selectedCategory === "all"
    ? articles
    : articles.filter(art => art.category === selectedCategory);

  // Simple alert modal preview on static article click
  const [previewArticle, setPreviewArticle] = useState(null);

  return (
    <div className="relative overflow-hidden min-h-screen py-16 sm:py-24 space-y-16 transition-colors duration-300">
      
      {/* Background glowing mesh gradients */}
      <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] -z-10 pointer-events-none"></div>

      {/* 1. Header Hero */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6 animate-fade-in-up">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-400/5 border border-purple-500/25 dark:border-purple-400/10 shadow-sm mx-auto select-none">
          <BookOpen className="h-3.5 w-3.5 text-purple-500" />
          <span>Industry Insights & News</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          DomainCompare <br />
          <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 bg-clip-text text-transparent">
            Knowledge Hub
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-zinc-550 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Stay informed on registry changes, pricing strategies, and branding advice to make sure you register smart.
        </p>
      </section>

      {/* 2. Category Filters */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                isSelected
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/10"
                  : "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-purple-550/40"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </section>

      {/* 3. Article Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => setPreviewArticle(art)}
              className="group cursor-pointer bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-850 rounded-3xl overflow-hidden hover:shadow-xl hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Graphic Banner */}
              <div className={`h-48 bg-gradient-to-tr ${art.color} p-6 relative overflow-hidden flex flex-col justify-between text-white shrink-0`}>
                <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full translate-x-12 -translate-y-12 blur-md"></div>
                
                <span className="self-start px-2.5 py-1 rounded-lg bg-black/20 text-[10px] font-extrabold uppercase border border-white/20 select-none">
                  {art.categoryName}
                </span>

                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug line-clamp-2">
                  {art.title}
                </h3>
              </div>

              {/* Text details */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>

                {/* Metadata row */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between gap-2 text-xs font-semibold text-zinc-450 dark:text-zinc-500">
                  <div className="flex items-center gap-3.5">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{art.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{art.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-purple-650 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Article Preview Dialog overlay */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-850 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-5 max-h-[85vh] overflow-y-auto animate-fade-in-up">
            
            {/* Header info */}
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-purple-500/10 dark:bg-purple-400/5 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-[10px] font-extrabold uppercase tracking-wider">
                {previewArticle.categoryName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                {previewArticle.title}
              </h2>
              <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 pt-1">
                <span>By {previewArticle.author}</span>
                <span>•</span>
                <span>{previewArticle.date}</span>
                <span>•</span>
                <span>{previewArticle.readTime}</span>
              </div>
            </div>

            {/* Content body */}
            <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-350 leading-relaxed border-t border-zinc-100 dark:border-zinc-850 pt-4 space-y-4">
              <p>{previewArticle.excerpt}</p>
              <p className="bg-zinc-50 dark:bg-zinc-900/50 p-4 border border-zinc-150 dark:border-zinc-850 rounded-2xl italic font-medium">
                {previewArticle.content}
              </p>
              <p>Understanding these intricacies can save startup founders and developers thousands of dollars over the lifetime of a business. Be sure to use our Price Comparison Search on the Home Page to verify and map these prices in real-time!</p>
            </div>

            {/* Actions footer */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPreviewArticle(null)}
                className="px-5 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-bold text-sm transition-all"
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
