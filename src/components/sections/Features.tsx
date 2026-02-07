"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Users, 
  Building, 
  BadgeCheck, 
  Headphones, 
  CreditCard,
  LucideIcon
} from "lucide-react";
import { features } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * Features Section Component
 * 
 * Showcases key service differentiators in a grid layout.
 * 
 * Design Decisions:
 * - Icon + text layout for quick scanning
 * - Alternating layout for visual interest
 * - Hover effects for engagement
 * - Accessible icon labels
 * 
 * @component
 */

// Icon mapping for dynamic rendering
const iconMap: Record<string, LucideIcon> = {
  Shield,
  Users,
  Building,
  BadgeCheck,
  Headphones,
  CreditCard,
};

// Individual Feature Card
function FeatureCard({ 
  feature, 
  index 
}: { 
  feature: typeof features[0]; 
  index: number;
}) {
  const Icon = iconMap[feature.icon] || Shield;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 sm:p-8 rounded-2xl bg-white border border-[var(--border)] hover:border-[var(--brand-green-light)] hover:shadow-lg hover:shadow-[var(--brand-green-primary)]/10 transition-all duration-300"
    >
      {/* Icon Container */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--brand-green-lighter)] to-[var(--brand-green-pale)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-[var(--brand-green-primary)]" />
      </div>

      {/* Content */}
      <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--brand-green-primary)] transition-colors">
        {feature.title}
      </h3>
      <p className="text-[var(--text-secondary)] leading-relaxed">
        {feature.description}
      </p>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[var(--brand-green-lighter)]/50 to-transparent transform translate-x-1/2 -translate-y-1/2 group-hover:translate-x-1/3 group-hover:-translate-y-1/3 transition-transform duration-300" />
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[var(--surface-elevated)] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[var(--brand-green-primary)]/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[var(--accent-gold)]/5 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Header & Stats */}
          <div className="lg:sticky lg:top-32">
            <SectionHeader
              id="features-heading"
              badge="Mengapa Memilih Kami"
              title="Layanan Terbaik untuk Perjalanan Suci Anda"
              subtitle="Kami berkomitmen memberikan pengalaman Umroh dan Haji yang nyaman, aman, dan penuh makna dengan layanan profesional."
              align="left"
              className="mb-10"
            />

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { value: "15+", label: "Tahun Pengalaman" },
                { value: "10K+", label: "Jamaah Terlayani" },
                { value: "99%", label: "Kepuasan Jamaah" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <p className="text-3xl sm:text-4xl font-bold text-gradient mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Feature Grid */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
