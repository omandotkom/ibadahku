"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/lib/data";

/**
 * Call-to-Action Section Component
 * 
 * Prominent section to drive conversions with multiple contact options.
 * 
 * UX Decisions:
 * - High contrast gradient background for attention
 * - Multiple CTA options (WhatsApp, Phone, Form)
 * - Clear value proposition
 * - Trust signals (guarantee badges)
 * 
 * @component
 */

export default function CTA() {
  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-green-dark)] via-[var(--brand-green-primary)] to-[var(--brand-green-light)]" />
      
      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--accent-gold)]/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <Container className="relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse" />
            Promo Terbatas!
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Wujudkan Impian Ibadah Anda Sekarang
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          >
            Dapatkan penawaran spesial untuk pendaftaran bulan ini. 
            Hubungi kami sekarang dan konsultasikan perjalanan Umroh impian Anda.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            {/* Primary CTA - WhatsApp */}
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Assalamualaikum%20saya%20mau%20tanya-tanya%20tentang%20paket%20perjalanan%20ke%20tanah%20suci`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-all duration-300 shadow-lg shadow-[#25D366]/25 min-h-[48px]"
            >
              <MessageCircle className="w-5 h-5" />
              Chat WhatsApp
              <ArrowRight className="w-5 h-5" />
            </a>

            {/* Secondary CTA - Phone */}
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 min-h-[48px]"
            >
              <Phone className="w-5 h-5" />
              {siteConfig.contact.phone}
            </a>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--accent-gold)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Gratis Konsultasi</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--accent-gold)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Tanpa Biaya Tersembunyi</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--accent-gold)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Jaminan Keberangkatan</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
