"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, personal } from "../lib/data";
import { ThemeToggle } from "./ThemeToggle";

const ACCENT = "var(--accent)";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialise theme from storage / DOM (the ThemeToggle reads the resulting
  // `.dark` class on mount, so we just need to set it here).
  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = stored ? stored === "dark" : prefersDark || true;
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-6">
      <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Menu button + dropdown */}
        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            className="p-2 transition-colors duration-300 text-neutral-500 hover:text-black dark:hover:text-white"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? (
              <X className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2} />
            ) : (
              <Menu className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2} />
            )}
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                ref={menuRef}
                key="menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 w-[220px] md:w-[260px] shadow-2xl mt-2 ml-2 p-4 rounded-lg bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800"
              >
                {navItems.map((item, idx) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="menu-link block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 transition-colors duration-200 text-neutral-900 dark:text-white"
                    style={idx === 0 ? { color: ACCENT } : undefined}
                    onClick={(e) => {
                      // HOME should always force scroll to the very top,
                      // even if we're already at #home.
                      if (item.href === "#home") {
                        e.preventDefault();
                        if (typeof window !== "undefined") {
                          // Only replaceState when Next.js's App Router state
                          // is present; otherwise Next's popstate handler will
                          // crash trying to read __PRIVATE_NEXTJS_INTERNALS_TREE.
                          if (history.replaceState && history.state) {
                            history.replaceState(
                              history.state,
                              "",
                              window.location.pathname + window.location.search
                            );
                          }
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Signature */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            // Always scroll to the top / Hero, even if already at #home.
            if (typeof window !== "undefined") {
              // Only replaceState when Next.js's App Router state is present;
              // otherwise Next's popstate handler will crash trying to read
              // __PRIVATE_NEXTJS_INTERNALS_TREE off a null state.
              if (history.replaceState && history.state) {
                history.replaceState(
                  history.state,
                  "",
                  window.location.pathname + window.location.search
                );
              }
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            setIsMenuOpen(false);
          }}
          className="signature-glow text-3xl sm:text-4xl select-none transition-all duration-300 text-neutral-900 dark:text-white hover:text-[color:var(--accent)]"
          style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}
          aria-label="Home"
        >
          {personal.signature}
        </a>

        {/* Theme toggle */}
        <ThemeToggle
          variant="icon"
          onThemeChange={(next) => {
            if (typeof window !== "undefined") {
              window.localStorage.setItem("theme", next);
            }
          }}
        />
      </nav>

      <style jsx>{`
        .menu-link:hover {
          color: ${ACCENT} !important;
        }
        .signature-glow:hover {
          text-shadow:
            0 0 6px color-mix(in srgb, ${ACCENT} 70%, transparent),
            0 0 16px color-mix(in srgb, ${ACCENT} 55%, transparent),
            0 0 32px color-mix(in srgb, ${ACCENT} 35%, transparent);
        }
      `}</style>
    </header>
  );
}
