/**
 * Home Page - ibadahku.id
 * 
 * Main landing page for Umroh and Hajj travel service.
 * Built with Next.js App Router and optimized for static export.
 * 
 * SEO Highlights:
 * - H1: Main headline dengan keyword "Umroh" dan "Haji"
 * - Semantic HTML structure
 * - Internal linking strategy
 * - Optimized images dengan alt text
 * 
 * @page
 */

import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import HeroSlider from "@/components/sections/HeroSlider";
import Legalitas from "@/components/sections/Legalitas";
import PackageCards from "@/components/sections/PackageCards";
import Gallery from "@/components/sections/Gallery";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

/**
 * Page-specific metadata
 * Override default metadata untuk homepage
 */
export const metadata: Metadata = {
  title: "ibadahku.id - Layanan Umroh & Haji Terpercaya | Travel Resmi Kemenag",
  description: "Layanan perjalanan Umroh dan Haji dengan kualitas terbaik. Paket lengkap mulai 23jt, harga transparan, pembimbing berpengalaman. Resmi terdaftar Kemenag RI. Daftar sekarang!",
  keywords: [
    "umroh",
    "haji", 
    "travel umroh",
    "paket umroh",
    "paket umroh 2026",
    "biro perjalanan haji umroh",
    "travel haji",
    "umroh murah",
    "umroh plus",
    "umroh vip",
  ],
  alternates: {
    canonical: "https://ibadahku.id/",
  },
  openGraph: {
    title: "ibadahku.id - Layanan Umroh & Haji Terpercaya",
    description: "Layanan perjalanan Umroh dan Haji dengan kualitas terbaik. Resmi terdaftar Kemenag RI.",
    url: "https://ibadahku.id/",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Skip to main content link untuk accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--brand-green-primary)] focus:text-white focus:rounded-lg"
      >
        Lompat ke konten utama
      </a>

      {/* Navigation */}
      <header role="banner">
        <Navbar />
      </header>
      
      {/* Main Content */}
      <div id="main-content">
        {/* Hero Slider Section */}
        <section aria-label="Beranda">
          <HeroSlider />
        </section>

        {/* Company Legality */}
        <section aria-label="Legalitas Perusahaan">
          <Legalitas />
        </section>
        
        {/* Package Offerings */}
        <section aria-labelledby="packages-heading">
          <PackageCards />
        </section>
        
        {/* Gallery */}
        <section aria-label="Galeri Foto dan Video">
          <Gallery />
        </section>
        
        {/* Features & Why Choose Us */}
        <section aria-labelledby="features-heading">
          <Features />
        </section>
        
        {/* Customer Testimonials */}
        <section aria-labelledby="testimonials-heading">
          <Testimonials />
        </section>
        
        {/* Call to Action */}
        <section aria-label="Hubungi Kami">
          <CTA />
        </section>
      </div>
      
      {/* Footer */}
      <footer role="contentinfo">
        <Footer />
      </footer>
    </main>
  );
}
