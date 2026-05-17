"use client";
import React from "react";
import Link from "next/link";
import { Globe, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] text-zinc-600 dark:text-zinc-400 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 text-white shadow-md">
                <Globe className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Domain<span className="text-purple-600 dark:text-purple-400 font-extrabold">Compare</span>
              </span>
            </Link>
            <p className="text-sm max-w-xs text-zinc-500 dark:text-zinc-400">
              The ultimate real-time domain price comparison and availability search tool. Find the cheapest registrar for your next big idea instantly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/" className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Home / Search
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Blog & Industry Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 tracking-wider uppercase">Legal & Contact</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/contact" className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            &copy; {currentYear} DomainCompare. All rights reserved. Built for developers and creators globally.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-red-500 animate-pulse fill-red-500" />
            <span>for the web.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
