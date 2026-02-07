"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import StarRating from "@/components/ui/StarRating";

/**
 * Testimonials Section Component
 * 
 * Displays customer reviews with ratings in a responsive grid.
 * 
 * UX Decisions:
 * - Quote styling for visual hierarchy
 * - Avatar placeholder with initials
 * - Star rating for quick assessment
 * - Responsive grid (1 col mobile, 2 col tablet, 4 col desktop)
 * 
 * @component
 */

// Get initials from name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Individual Testimonial Card
function TestimonialCard({ 
  testimonial, 
  index 
}: { 
  testimonial: typeof testimonials[0]; 
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 border border-[var(--border)]"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[var(--brand-green-lighter)] flex items-center justify-center">
        <Quote className="w-5 h-5 text-[var(--brand-green-primary)]" />
      </div>

      {/* Rating */}
      <StarRating rating={testimonial.rating} className="mb-4" />

      {/* Content */}
      <blockquote className="text-[var(--text-secondary)] leading-relaxed mb-6 relative">
        "{testimonial.content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-green-primary)] to-[var(--brand-green-light)] flex items-center justify-center text-white font-semibold">
          {getInitials(testimonial.name)}
        </div>

        {/* Info */}
        <div>
          <p className="font-semibold text-[var(--text-primary)]">
            {testimonial.name}
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            {testimonial.role}
          </p>
        </div>
      </div>

      {/* Package Badge */}
      {testimonial.packageName && (
        <div className="mt-4 pt-4 border-t border-[var(--border-light)]">
          <span className="inline-block px-3 py-1 text-xs font-medium text-[var(--brand-green-primary)] bg-[var(--brand-green-lighter)] rounded-full">
            {testimonial.packageName}
          </span>
        </div>
      )}
    </motion.article>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[var(--brand-green-primary)]/5 to-[var(--accent-gold)]/5 rounded-full blur-3xl" />

      <Container className="relative">
        <SectionHeader
          id="testimonials-heading"
          badge="Testimoni"
          title="Apa Kata Jamaah Kami"
          subtitle="Pengalaman nyata dari jamaah yang telah menunaikan ibadah bersama kami. Kepercayaan Anda adalah motivasi kami untuk terus berkarya."
          align="center"
          className="mb-16"
        />

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index} 
            />
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60"
        >
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span>Kemenag RI</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>100% Aman</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Terverifikasi</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
