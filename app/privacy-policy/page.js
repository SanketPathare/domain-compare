"use client";
import React from "react";
import { Shield, Lock, Eye, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Eye className="h-5 w-5 text-purple-500" />,
      title: "1. Information We Collect",
      content: "DomainCompare is designed to protect your privacy. When you use our search engine to query domain availability and pricing, we do not log your personal data or associate search strings with your identity. We record search query strings solely to cache API responses and compute aggregates for trending domain extensions."
    },
    {
      icon: <Lock className="h-5 w-5 text-indigo-500" />,
      title: "2. Cookies & Tracking",
      content: "We use essential cookies to maintain theme selections (light/dark mode) and optimize page performance. When you click on a 'Buy Now' button, you are redirected to the registrar's official portal. These external URLs contain standard affiliate codes (e.g. utm_source=domaincompare) which may write tracking cookies on the destination site to compute commission payouts."
    },
    {
      icon: <Shield className="h-5 w-5 text-emerald-500" />,
      title: "3. Affiliate Disclosure",
      content: "DomainCompare operates under an affiliate monetization model. Some of the links on our price comparison tables are tracking links. If you register or renew a domain through these redirect URLs, we may receive a small referral commission from the registrar at zero additional cost to you. This keeps our service free."
    }
  ];

  return (
    <div className="relative overflow-hidden min-h-screen py-16 sm:py-24 space-y-16 transition-colors duration-300">
      
      {/* Background glowing mesh gradients */}
      <div className="absolute top-[-10%] left-[-20%] h-[500px] w-[500px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] -z-10 pointer-events-none"></div>

      {/* 1. Header Hero */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6 animate-fade-in-up">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-400/5 border border-purple-500/25 dark:border-purple-400/10 shadow-sm mx-auto select-none">
          <Shield className="h-3.5 w-3.5 text-purple-500" />
          <span>Security & Compliance</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-tight">
          Privacy Policy & <br />
          <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 bg-clip-text text-transparent">
            Terms of Service
          </span>
        </h1>
        
        <p className="text-base sm:text-lg text-zinc-550 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Last Updated: May 18, 2026. Review how we manage and secure search query details and tracking cookies.
        </p>
      </section>

      {/* 2. Privacy Content */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-[#0f0f0f] border border-zinc-200 dark:border-zinc-850 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              Data Security & Fair Practice Commitment
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
              At DomainCompare, we value trust above all else. Unlike legacy lookup services that register queried domains in the background to upsell them later (a practice known as &apos;domain front-running&apos;), we operate with absolute transparency. We do not register, lease, or broker domain names.
            </p>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-850">
            {sections.map((sect, index) => (
              <div key={index} className="py-8 first:pt-0 last:pb-0 space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 flex items-center justify-center shrink-0">
                    {sect.icon}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {sect.title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed pl-12">
                  {sect.content}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-zinc-100 dark:border-zinc-850 space-y-4 text-xs text-zinc-400 leading-normal">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
              <span className="font-bold text-zinc-650 dark:text-zinc-350">GDPR & CCPA Compliant Design</span>
            </div>
            <p>
              Under California Consumer Privacy Act (CCPA) and European General Data Protection Regulation (GDPR) frameworks, our minimal datalogging model ensures users have complete freedom of search without tracking profiles or advertising retargeting logs. For questions regarding compliance audits, reach out via our contact channels.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
