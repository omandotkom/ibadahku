"use client";

import { motion } from "framer-motion";

/**
 * SectionHeader Component
 * 
 * Reusable section header with title, subtitle, and decorative elements.
 * Includes scroll-triggered animations.
 * 
 * @component
 * @example
 * <SectionHeader
 *   title="Paket Umroh Kami"
 *   subtitle="Pilih paket yang sesuai dengan kebutuhan dan budget Anda"
 *   align="center"
 * />
 */

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  badge?: string;
  id?: string;
}

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export default function SectionHeader({
  title,
  subtitle,
  align = "center",
  className = "",
  badge,
  id,
}: SectionHeaderProps) {
  return (
    <div className={`${alignStyles[align]} ${className}`}>
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-[var(--brand-green-primary)] bg-[var(--brand-green-lighter)] rounded-full"
        >
          {badge}
        </motion.span>
      )}
      
      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight"
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      
      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`
          mt-6 h-1 w-20 bg-gradient-to-r from-[var(--brand-green-dark)] to-[var(--accent-gold)] rounded-full
          ${align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""}
        `}
      />
    </div>
  );
}
