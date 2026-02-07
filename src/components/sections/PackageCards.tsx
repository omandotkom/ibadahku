"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Building2, 
  Plane, 
  Check,
  ArrowRight,
  Download,
  MessageCircle,
  X,
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
function resolveImageSrc(pkg: Package, index: number): string {
  const fallbackImage = `https://images.unsplash.com/photo-${
    index === 0 ? "1584551246679-0efe5a131867" :
    index === 1 ? "1564769625905-50e93615e769" :
    index === 2 ? "1542813812-155f9a0e94a0" :
    "1575105333362-4b72c92fd1b9"
  }?w=600&auto=format&fit=crop&q=80`;
  return pkg.image
    ? (pkg.image.startsWith("http://") ||
      pkg.image.startsWith("https://") ||
      pkg.image.startsWith("/")
      ? pkg.image
      : `/${pkg.image}`)
    : fallbackImage;
}

function PackageCard({
  pkg,
  index,
  onOpen,
}: {
  pkg: Package;
  index: number;
  onOpen: (pkg: Package, index: number) => void;
}) {
  const imageSrc = resolveImageSrc(pkg, index);
  const whatsappUrl =
    "https://wa.me/6281286129604?text=Assalamualaikum%20saya%20mau%20tanya-tanya%20tentang%20paket%20perjalanan%20ke%20tanah%20suci";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 border border-[var(--border)] flex flex-col cursor-pointer"
      onClick={() => onOpen(pkg, index)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(pkg, index);
        }
      }}
      role="button"
      tabIndex={0}
    >
      {/* Card Image */}
      <div className="relative h-48 overflow-hidden">
        {/* Badge Positioning */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          {pkg.isPopular && <Badge variant="popular">Populer</Badge>}
          {pkg.isRecommended && <Badge variant="recommended">Recommended</Badge>}
        </div>

        {/* Image with lazy loading */}
        <img
          src={imageSrc}
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
          <div className="grid gap-2">
            <div
              className="flex justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <Button
                onClick={() => onOpen(pkg, index)}
                className="w-full justify-center"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Lihat Detail
              </Button>
            </div>
            <div
              className="flex justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <Button
                href={whatsappUrl}
                isExternal
                variant="outline"
                className="w-full justify-center"
                icon={<MessageCircle className="w-4 h-4" />}
                iconPosition="left"
              >
                Chat WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function PackageDetailModal({
  pkg,
  imageSrc,
  onClose,
}: {
  pkg: Package;
  imageSrc: string;
  onClose: () => void;
}) {
  const whatsappUrl =
    "https://wa.me/6281286129604?text=Assalamualaikum%20saya%20mau%20tanya-tanya%20tentang%20paket%20perjalanan%20ke%20tanah%20suci";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detail ${pkg.name}`}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="sticky top-3 float-right z-10 mr-3 mt-3 rounded-full bg-black/70 p-2 text-white"
          aria-label="Tutup detail paket"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative">
          <img
            src={imageSrc}
            alt={pkg.name}
            className="h-auto w-full object-cover"
            loading="lazy"
          />
          <a
            href={imageSrc}
            download={`${pkg.id}.jpg`}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white"
            aria-label="Download gambar paket"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </a>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex flex-wrap gap-2">
            {pkg.isPopular && <Badge variant="popular">Populer</Badge>}
            {pkg.isRecommended && <Badge variant="recommended">Recommended</Badge>}
          </div>

          <h3 className="font-serif text-2xl font-bold text-[var(--text-primary)]">{pkg.name}</h3>
          <p className="text-sm text-[var(--text-secondary)]">{pkg.description}</p>

          <div className="grid grid-cols-2 gap-3 text-sm text-[var(--text-secondary)]">
            <p><strong>Harga:</strong> {formatPrice(pkg.price)}</p>
            <p><strong>Durasi:</strong> {pkg.duration} hari</p>
            <p><strong>Hotel:</strong> {pkg.hotelStars} bintang</p>
            <p><strong>Maskapai:</strong> {pkg.airline}</p>
            <p><strong>Berangkat:</strong> {formatDate(pkg.departureDate)}</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[var(--text-primary)]">Fasilitas</p>
            <ul className="space-y-1.5">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--brand-green-primary)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            href={whatsappUrl}
            isExternal
            className="w-full justify-center"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Chat via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function PackageCards() {
  const { packageList } = usePackages();
  const [selectedPackage, setSelectedPackage] = useState<{
    pkg: Package;
    index: number;
  } | null>(null);

  useEffect(() => {
    function onEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedPackage(null);
      }
    }

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    if (!selectedPackage) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPackage]);

  return (
    <section id="packages" className="py-20 lg:py-28 bg-white">
      <Container>
        <SectionHeader
          id="packages-heading"
          badge="Paket Umroh 2026"
          title="Pilihan Paket Terbaik Untuk Anda"
          subtitle="Berbagai pilihan paket dengan fasilitas lengkap dan harga transparan. Semua paket sudah termasuk visa, tiket pesawat, hotel, dan makanan."
          align="center"
          className="mb-16"
        />

        {/* Package Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {packageList.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              index={index}
              onOpen={(selectedPkg, selectedIndex) =>
                setSelectedPackage({ pkg: selectedPkg, index: selectedIndex })
              }
            />
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

        {selectedPackage && (
          <PackageDetailModal
            pkg={selectedPackage.pkg}
            imageSrc={resolveImageSrc(selectedPackage.pkg, selectedPackage.index)}
            onClose={() => setSelectedPackage(null)}
          />
        )}
      </Container>
    </section>
  );
}
