"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import AuthButton from "./AuthButton";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/banks", label: "Banks" },
    { href: "/stocks", label: "Stocks" },
    { href: "/mutual-funds", label: "Mutual Funds" },
    { href: "/pf", label: "Provident Fund" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200/80 shadow-sm"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <div className="flex items-center gap-3 sm:gap-10">
          {/* Mobile hamburger button (top-left) */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-zinc-200 bg-white/80 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="space-y-1">
              <span
                className={`block h-0.5 w-5 rounded-full bg-zinc-800 transition-transform ${
                  isMobileMenuOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-zinc-800 transition-opacity ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-zinc-800 transition-transform ${
                  isMobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </div>
          </button>

          <Link
            href="/dashboard"
            className="font-semibold text-zinc-900 hover:text-zinc-700 transition-colors flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
              ₣
            </span>
            Finance Tracker
          </Link>

          {/* Desktop navigation links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative">
                  <span
                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "text-zinc-900 bg-zinc-100"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-500 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
                
              );
            })}
          </div>
        </div>

        <div className="flex items-center">
          <AuthButton />
        </div>
      </div>

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-zinc-200 bg-white/95 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span
                    className={`block w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-zinc-900 bg-zinc-100"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
