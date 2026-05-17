"use client";
import React from "react";
import { Shield, Lock, Eye, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Eye className="h-4 w-4 text-white" />,
      title: "1. Information We Collect",
      content: "DomainCompare is designed to protect your privacy. When you use our search engine to query domain availability and pricing, we do not log your personal data or associate search strings with your identity. We record search query strings solely to cache API responses and compute aggregates for trending domain extensions."
    },
    {
      icon: <Lock className="h-4 w-4 text-white" />,
      title: "2. Cookies & Tracking",
      content: "We use essential cookies to maintain preference parameters and optimize page speeds. When you click on a 'Register' redirect CTA, you are sent to the registrar's official portal. These external URLs contain standard affiliate UTM tags (e.g. utm_source=domaincompare) which may write cookies on the destination site to compute commission payouts."
    },
    {
      icon: <Shield className="h-4 w-4 text-white" />,
      title: "3. Affiliate Disclosure",
      content: "DomainCompare operates under an affiliate monetization model. Some of the links on our price comparison tables are tracking links. If you register or renew a domain through these redirect URLs, we may receive a small referral commission from the registrar at zero additional cost to you. This keeps our service free."
    }
  ];

  return (
    <div className="relative min-h-screen py-16 sm:py-24 space-y-16 bg-black text-white">
      {/* Background NextJS Radial Spotlight Glow */}
      <div className="nextjs-spotlight"></div>

      {/* 1. Header Hero */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center space-y-6 animate-fade-in-up">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-zinc-350 bg-[#0c0c0c] border border-[#222] hover:border-zinc-700 transition-all shadow-md mx-auto select-none">
          <Shield className="h-3.5 w-3.5 text-white" />
          <span>Security & Compliance</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white leading-tight">
          Privacy Policy & <br />
          <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Terms of Service
          </span>
        </h1>
        
        <p className="text-[11px] sm:text-xs font-mono text-zinc-550 max-w-xl mx-auto uppercase tracking-widest">
          Last Updated: May 18, 2026 • Real-time registry search logs compliance
        </p>
      </section>

      {/* 2. Privacy Content */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
        <div className="bg-[#080808] border border-[#1a1a1a] rounded-xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">
              Data Security & Fair Practice Commitment
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              At DomainCompare, we value trust above all else. Unlike legacy lookup services that register queried domains in the background to upsell them later (a practice known as &apos;domain front-running&apos;), we operate with absolute transparency. We do not register, lease, or broker domain names.
            </p>
          </div>

          <div className="divide-y divide-[#1a1a1a]">
            {sections.map((sect, index) => (
              <div key={index} className="py-6 first:pt-0 last:pb-0 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-[#222] flex items-center justify-center shrink-0 text-white">
                    {sect.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {sect.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-450 leading-relaxed pl-11">
                  {sect.content}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-[#1a1a1a] space-y-4 text-[11px] text-zinc-500 leading-relaxed">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span className="font-mono text-zinc-300 text-xs">GDPR & CCPA Compliant Design</span>
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
