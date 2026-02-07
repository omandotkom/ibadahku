"use client";

import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Building2, 
  Plane, 
  Check,
  ArrowRight
} from "lucide-react";
import type { Package } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";
import { usePackages } from "@/lib/usePackages";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * PackageCards Section Component
 * 
 * Displays Umroh package offerings in a responsive grid layout.
 * 
 * UX Decisions:
 * - Card hover effects for engagement
 * - Clear pricing and feature highlights
 * - Badge system for popular/recommended items
 * - Progressive disclosure for features list
 * - Mobile: Single column stack for readability
 * - Touch targets minimum 44px
 * 
 * Performance:
 * - Lazy loading for images below fold
 * - Motion animations only on hover
 * 
 * @component
 */

// Star icons for hotel rating
function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < stars ? "fill-[var(--accent-gold)] text-[var(--accent-gold)]" : "text-gray-300"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Individual Package Card Component
function PackageCard({ pkg, index }: { pkg: Package; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 border border-[var(--border)] flex flex-col"
    >
      {/* Card Image */}
      <div className="relative h-48 overflow-hidden">
        {/* Badge Positioning */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          {pkg.isPopular && <Badge variant="popular">Populer</Badge>}
          {pkg.isRecommended && <Badge variant="recommended">Recommended</Badge>}
        </div>

        {/* Quota Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-[var(--text-secondary)] shadow-sm">
            Sisa {pkg.availableQuota} kuota
          </div>
        </div>

        {/* Image with lazy loading */}
        <img
          src={`https://images.unsplash.com/photo-${
            index === 0 ? "1584551246679-0efe5a131867" :
            index === 1 ? "1564769625905-50e93615e769" :
            index === 2 ? "1542813812-155f9a0e94a0" :
            "1575105333362-4b72c92fd1b9"
          }?w=600&auto=format&fit=crop&q=80`}
          alt={pkg.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title & Description */}
        <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--brand-green-primary)] transition-colors">
          {pkg.name}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
          {pkg.description}
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Clock className="w-4 h-4 text-[var(--brand-green-primary)]" />
            <span>{pkg.duration} Hari</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Plane className="w-4 h-4 text-[var(--brand-green-primary)]" />
            <span className="truncate">{pkg.airline}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[var(--brand-green-primary)]" />
            <StarRating stars={pkg.hotelStars} />
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <Calendar className="w-4 h-4 text-[var(--brand-green-primary)]" />
            <span>{formatDate(pkg.departureDate).split(' ').slice(0, 2).join(' ')}</span>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mb-4 flex-1">
          <ul className="space-y-1.5">
            {pkg.features.slice(0, 4).map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <Check className="w-4 h-4 text-[var(--brand-green-primary)] flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
            {pkg.features.length > 4 && (
              <li className="text-xs text-[var(--text-muted)] pl-6">
                +{pkg.features.length - 4} fasilitas lainnya
              </li>
            )}
          </ul>
        </div>

        {/* Price Section */}
        <div className="pt-4 border-t border-[var(--border)]">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">Mulai dari</p>
              <p className="text-2xl font-bold text-[var(--brand-green-primary)]">
                {formatPrice(pkg.price)}
              </p>
              <p className="text-xs text-[var(--text-muted)]">per orang</p>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            href={`#booking-${pkg.id}`} 
            className="w-full justify-center"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Pilih Paket
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export default function PackageCards() {
  const { packageList } = usePackages();

  return (
    <section id="packages" className="py-20 lg:py-28 bg-white">
      <Container>
        <SectionHeader
          id="packages-heading"
          badge="Paket Umroh 2024"
          title="Pilihan Paket Terbaik Untuk Anda"
          subtitle="Berbagai pilihan paket dengan fasilitas lengkap dan harga transparan. Semua paket sudah termasuk visa, tiket pesawat, hotel, dan makanan."
          align="center"
          className="mb-16"
        />

        {/* Package Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {packageList.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-[var(--text-secondary)] mb-4">
            Belum menemukan paket yang sesuai?
          </p>
          <Button variant="outline" href="#contact">
            Konsultasi Gratis
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
