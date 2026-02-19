"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { navItems, siteConfig } from "@/lib/data";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

/**
 * Navbar Component
 * 
 * Sticky navigation bar with mobile-responsive hamburger menu.
 * Implements scroll-based styling changes for better UX.
 * 
 * UX Decisions:
 * - Sticky positioning keeps navigation accessible at all times
 * - Logo on left, CTA on right for visual hierarchy
 * - Touch targets min 44px for mobile accessibility
 * - Smooth backdrop blur when scrolling for modern feel
 * - White text on transparent background (desktop), dark text on white background when scrolled
 * 
 * @component
 */

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position for styling changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300 ease-in-out
          ${isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-3" 
            : "bg-transparent py-5"
          }
        `}
      >
        <Container>
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/" 
              className="flex items-center gap-2 group"
              aria-label="ibadahku.id - Beranda"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--brand-green-dark)] to-[var(--brand-green-primary)] flex items-center justify-center shadow-lg shadow-[var(--brand-green-primary)]/30 group-hover:shadow-[var(--brand-green-primary)]/50 transition-shadow">
                <span className="text-white font-serif font-bold text-lg">i</span>
              </div>
              <div className="hidden sm:block">
                <span className={`font-serif font-bold text-xl transition-colors ${isScrolled ? "text-[var(--brand-green-dark)]" : "text-white"}`}>
                  ibadahku
                </span>
                <span className={`font-medium text-sm transition-colors ${isScrolled ? "text-[var(--accent-gold)]" : "text-yellow-300"}`}>
                  .id
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    text-sm font-medium transition-colors duration-200
                    hover:text-[var(--brand-green-primary)]
                    min-h-[44px] flex items-center
                    ${isScrolled ? "text-[var(--text-secondary)]" : "text-white/90"}
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className={`
                  flex items-center gap-2 text-sm font-medium transition-colors min-h-[44px] px-3
                  ${isScrolled 
                    ? "text-[var(--text-secondary)] hover:text-[var(--brand-green-primary)]" 
                    : "text-white/90 hover:text-white"
                  }
                `}
              >
                <Phone className="w-4 h-4" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <Button href="#packages" size="sm">
                Daftar Sekarang
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                lg:hidden p-2 rounded-xl transition-colors
                min-w-[44px] min-h-[44px] flex items-center justify-center
                ${isScrolled 
                  ? "text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]" 
                  : "text-white hover:bg-white/20"
                }
              `}
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--brand-green-dark)] to-[var(--brand-green-primary)] flex items-center justify-center">
                      <span className="text-white font-serif font-bold text-lg">i</span>
                    </div>
                    <span className="font-serif font-bold text-xl text-[var(--brand-green-dark)]">
                      ibadahku<span className="text-[var(--accent-gold)]">.id</span>
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl hover:bg-[var(--surface-elevated)] min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Tutup menu"
                  >
                    <X className="w-6 h-6 text-[var(--text-primary)]" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-6 px-4">
                  <ul className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="
                            block px-4 py-4 rounded-xl text-base font-medium
                            text-[var(--text-primary)] hover:text-[var(--brand-green-primary)]
                            hover:bg-[var(--brand-green-pale)]
                            transition-colors min-h-[48px] flex items-center
                          "
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile CTA */}
                <div className="p-4 border-t border-[var(--border)] space-y-3">
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)] text-[var(--text-primary)] font-medium hover:bg-[var(--surface-elevated)] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {siteConfig.contact.phone}
                  </a>
                  <Button
                    href="#packages"
                    className="w-full justify-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Daftar Sekarang
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
