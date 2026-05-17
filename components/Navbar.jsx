"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useTheme, CURRENCIES } from "./ThemeProvider";

export default function Navbar() {
  const { currency, setCurrency } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" }
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#1a1a1a] bg-black/75 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Brand matching nextjs.org */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-black text-base shadow-sm group-hover:scale-[1.02] transition-transform duration-200">
                ▲
              </div>
              <span className="text-lg font-bold tracking-tight text-white select-none">
                Domain<span className="text-zinc-400 font-medium">Compare</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Next.js.org style selector dropdown */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-[#222] bg-[#0c0c0c] text-xs font-semibold text-zinc-300 outline-none cursor-pointer focus:border-zinc-500 hover:bg-[#111] transition-all"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-black text-white font-medium">
                    {c.flag} {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:text-white hover:bg-[#111] focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="block h-5 w-5" />
              ) : (
                <Menu className="block h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1a1a1a] bg-black transition-all duration-300">
          <div className="space-y-1 px-6 pb-6 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm font-semibold uppercase tracking-wider transition-all ${
                  isActive(link.href)
                    ? "bg-[#111] text-white"
                    : "text-zinc-400 hover:bg-[#080808]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Currency / Base Country Selector Row */}
            <div className="pt-4 pb-1 border-t border-[#1a1a1a] mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Base Currency:</span>
              <select
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1 bg-[#0c0c0c] border border-[#222] rounded-lg px-3 py-1.5 text-xs font-bold text-white focus:outline-none"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-black text-white">
                    {c.flag} {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
