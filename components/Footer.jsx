"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Navigation",
      links: [
        { name: "Search Engine", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Guides & Blog", href: "/blog" },
        { name: "Contact Support", href: "/contact" }
      ]
    },
    {
      title: "Extensions",
      links: [
        { name: "Register .com", href: "/results?domain=example.com" },
        { name: "Register .net", href: "/results?domain=example.net" },
        { name: "Register .org", href: "/results?domain=example.org" },
        { name: "Register .io", href: "/results?domain=example.io" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Gdpr Compliance", href: "/privacy-policy#gdpr" },
        { name: "Cookie Terms", href: "/privacy-policy#cookies" },
        { name: "Affiliate Notice", href: "/about#affiliate" }
      ]
    }
  ];

  return (
    <footer className="w-full border-t border-[#1a1a1a] bg-black text-zinc-400 py-12 lg:py-16 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Vision Block */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-white text-black font-black text-xs">
                ▲
              </div>
              <span className="text-sm font-bold tracking-tight text-white">
                Domain<span className="text-zinc-500 font-medium">Compare</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
              A premium, open-source domain registration and renewal rate comparison platform designed for developers and brand creators.
            </p>
          </div>

          {/* Links Grid */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase select-none">
                {section.title}
              </span>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-zinc-650">
            &copy; {currentYear} DomainCompare. Built in the spirit of Next.js and open-source.
          </p>
          
          <div className="flex items-center gap-6 text-[11px] text-zinc-500">
            <span>All Rates Disclosed in Real-Time</span>
            <span className="h-3 w-[1px] bg-[#1a1a1a]"></span>
            <span>Affiliate UTM Trackers Enabled</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
