"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Calendar, Users, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { usePackages } from "@/lib/usePackages";

/**
 * Hero Section Component
 * 
 * Main landing section with compelling headline, CTAs, and visual elements.
 * 
 * Design Decisions:
 * - Desktop: Grid layout with text left, visual right
 * - Mobile: Centered stack layout for readability
 * - Gradient overlay on image for text contrast
 * - Floating stats for social proof
 * - Smooth scroll-triggered animations
 * 
 * Performance:
 * - Images use priority loading (LCP optimization)
 * - Animations use CSS transforms only
 * 
 * @component
 */

export default function Hero() {
  const { packageList } = usePackages();

  // Get earliest departure package for urgency
  const nextPackage = [...packageList].sort((a, b) =>
    new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime(),
  )[0] ?? packageList[0];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-green-pale)] via-white to-[var(--surface-elevated)]" />
        
        {/* Decorative Shapes */}
        <div className="absolute top-20 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[var(--brand-green-lighter)]/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[var(--accent-gold)]/10 to-transparent rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container className="py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-green-lighter)] text-[var(--brand-green-dark)] text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--brand-green-primary)] animate-pulse" />
              Terdaftar Resmi Kemenag RI
            </motion.div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--text-primary)] leading-[1.1] mb-6">
              Wujudkan Impian{" "}
              <span className="text-gradient">Ibadah</span>{" "}
              Anda
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Layanan perjalanan Umroh dan Haji dengan kualitas terbaik. 
              Didampingi oleh pembimbing berpengalaman untuk pengalaman spiritual yang tak terlupakan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Button href="#packages" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Lihat Paket Umroh
              </Button>
              <Button variant="outline" size="lg" href="#about" icon={<Play className="w-5 h-5" />} iconPosition="left">
                Pelajari Lebih
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--brand-green-primary)]" />
                <span>10,000+ Jamaah</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--brand-green-primary)]" />
                <span>15 Tahun Berpengalaman</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--brand-green-primary)]" />
                <span>140+ Jaringan Global</span>
              </div>
            </div>
          </motion.div>

          {/* Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative order-1 lg:order-2"
          >
            {/* Main Image Container */}
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[var(--brand-green-primary)]/20 to-[var(--accent-gold)]/20 rounded-3xl transform rotate-3" />
              
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-[var(--brand-green-dark)]/20">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-green-dark)]/60 via-transparent to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1564121211835-e88c852648ab?w=800&auto=format&fit=crop&q=80"
                  alt="Ka'bah di Makkah - Tujuan suci umat Islam"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                
                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 z-20"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[var(--text-muted)] mb-1">Keberangkatan Berikutnya</p>
                        <p className="font-semibold text-[var(--text-primary)]">
                          {nextPackage ? nextPackage.name : "Jadwal segera diperbarui"}
                        </p>
                        <p className="text-sm text-[var(--brand-green-primary)] font-medium">
                          {nextPackage
                            ? new Date(nextPackage.departureDate).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })
                            : "-"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-[var(--text-muted)] mb-1">Mulai Dari</p>
                        <p className="text-2xl font-bold text-[var(--brand-green-primary)]">
                          {nextPackage ? `${(nextPackage.price / 1000000).toFixed(1)}jt` : "-"}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">per jamaah</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -top-4 -right-4 bg-gradient-to-br from-[var(--accent-gold)] to-[var(--accent-gold-dark)] text-white rounded-full px-4 py-2 shadow-lg"
              >
                <span className="text-sm font-bold">★ 4.9</span>
                <span className="text-xs opacity-90 ml-1">Rating</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
