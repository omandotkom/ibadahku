"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * Gallery Section Component
 * 
 * Grid galeri foto & video dengan lightbox popup.
 * Video autoplay loop muted.
 * Responsive masonry/grid layout.
 * 
 * @component
 */

// Data galeri - mix foto dan video
type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  caption: string;
  category: string;
  type: "image" | "video";
};

const galleryItems: GalleryItem[] = [
  {
    id: 1000,
    src: "/assets/gallery/IMG_4291.mp4",
    alt: "Video dokumentasi jamaah terbaru",
    caption: "Dokumentasi Jamaah Terbaru",
    category: "Video",
    type: "video",
  },
  {
    id: 1001,
    src: "/assets/gallery/wa-video-2026-02-07-173339.mp4",
    alt: "Video dokumentasi jamaah 1",
    caption: "Dokumentasi Jamaah 1",
    category: "Video",
    type: "video",
  },
  {
    id: 1002,
    src: "/assets/gallery/wa-video-2026-02-07-173512.mp4",
    alt: "Video dokumentasi jamaah 2",
    caption: "Dokumentasi Jamaah 2",
    category: "Video",
    type: "video",
  },
  {
    id: 1003,
    src: "/assets/gallery/wa-video-2026-02-07-173424.mp4",
    alt: "Video dokumentasi jamaah 3",
    caption: "Dokumentasi Jamaah 3",
    category: "Video",
    type: "video",
  },
  {
    id: 1,
    src: "/assets/gallery/VID-20250326-WA0021.jpg",
    alt: "Momen perjalanan umroh",
    caption: "Perjalanan Suci",
    category: "Jamaah",
    type: "image",
  },
  {
    id: 2,
    src: "/assets/gallery/VID-20250713-WA0043.jpg",
    alt: "Suasana di Tanah Suci",
    caption: "Momen Berharga",
    category: "Makkah",
    type: "image",
  },
  {
    id: 3,
    src: "/assets/gallery/VID-20250716-WA0014.jpg",
    alt: "Jamaah berkumpul",
    caption: "Bersama Jamaah",
    category: "Jamaah",
    type: "image",
  },
  {
    id: 4,
    src: "/assets/gallery/VID_20230305_101515.mp4",
    alt: "Video perjalanan umroh",
    caption: "Video Perjalanan",
    category: "Video",
    type: "video",
  },
  {
    id: 5,
    src: "/assets/gallery/IMG_20230305_075737.jpg",
    alt: "Pemandangan Masjidil Haram",
    caption: "Masjidil Haram",
    category: "Makkah",
    type: "image",
  },
  {
    id: 6,
    src: "/assets/gallery/IMG_20230301_204433.jpg",
    alt: "Suasana Madinah",
    caption: "Madinah",
    category: "Madinah",
    type: "image",
  },
  {
    id: 7,
    src: "/assets/gallery/VID-20250412-WA0043.jpg",
    alt: "Momen ibadah",
    caption: "Ibadah di Tanah Suci",
    category: "Jamaah",
    type: "image",
  },
  {
    id: 8,
    src: "/assets/gallery/pexels-yasirgurbuz-11895059.jpg",
    alt: "Suasana Makkah",
    caption: "Pemandangan Makkah",
    category: "Makkah",
    type: "image",
  },
  {
    id: 9,
    src: "/assets/gallery/pexels-asap-jpeg-2829427-20184065.jpg",
    alt: "Suasana ibadah jamaah",
    caption: "Kebersamaan Jamaah",
    category: "Jamaah",
    type: "image",
  },
  {
    id: 10,
    src: "/assets/gallery/pexels-drmkhawarnazir-18996599.jpg",
    alt: "Momen jamaah di tanah suci",
    caption: "Momen Spiritual",
    category: "Jamaah",
    type: "image",
  },
  {
    id: 11,
    src: "/assets/gallery/pexels-earth-photart-2149767641-35217560.jpg",
    alt: "Pemandangan Madinah",
    caption: "Nuansa Madinah",
    category: "Madinah",
    type: "image",
  },
  {
    id: 12,
    src: "/assets/gallery/pexels-ethan-sarkar-2060961318-31427930.jpg",
    alt: "Momen di sekitar masjid",
    caption: "Jejak Perjalanan",
    category: "Makkah",
    type: "image",
  },
  {
    id: 13,
    src: "/assets/gallery/pexels-fahadputhawala-34981834.jpg",
    alt: "Aktivitas jamaah",
    caption: "Aktivitas Jamaah",
    category: "Jamaah",
    type: "image",
  },
  {
    id: 14,
    src: "/assets/gallery/pexels-fahadputhawala-34981839.jpg",
    alt: "Suasana sekitar masjid",
    caption: "Suasana Sekitar Masjid",
    category: "Madinah",
    type: "image",
  },
  {
    id: 15,
    src: "/assets/gallery/pexels-kofs24-27490072.jpg",
    alt: "Pemandangan kota suci",
    caption: "Pemandangan Kota Suci",
    category: "Makkah",
    type: "image",
  },
  {
    id: 16,
    src: "/assets/gallery/pexels-taha-elahi-12336414.jpg",
    alt: "Momen doa jamaah",
    caption: "Doa dan Harapan",
    category: "Jamaah",
    type: "image",
  },
];

// Kategori untuk filter
const categories = ["Semua", "Makkah", "Madinah", "Jamaah", "Video"];

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Filter items by category
  const filteredItems =
    activeCategory === "Semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setSelectedItem(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = "";
  };

  const nextItem = () => {
    if (selectedItem !== null) {
      setSelectedItem((selectedItem + 1) % filteredItems.length);
    }
  };

  const prevItem = () => {
    if (selectedItem !== null) {
      setSelectedItem(
        (selectedItem - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-white">
      <Container>
        <SectionHeader
          badge="Galeri Foto & Video"
          title="Momen Berharga Perjalanan Suci"
          subtitle="Lihat dokumentasi perjalanan jamaah kami ke Tanah Suci. Setiap foto dan video adalah cerita dan kenangan yang tak ternilai."
          align="center"
          className="mb-12"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 min-h-[44px] ${
                activeCategory === category
                  ? "bg-[var(--brand-green-primary)] text-white shadow-lg shadow-[var(--brand-green-primary)]/30"
                  : "bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:bg-[var(--brand-green-lighter)] hover:text-[var(--brand-green-primary)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-xl cursor-pointer ${
                index === 0 || index === 4
                  ? "md:col-span-2 md:row-span-2"
                  : ""
              }`}
              onClick={() => openLightbox(index)}
            >
              <div
                className={`aspect-square md:aspect-auto md:h-full min-h-[200px] ${
                  item.type === "video" ? "bg-black" : "bg-gray-100"
                }`}
              >
                {item.type === "video" ? (
                  // Video thumbnail with play icon
                  <>
                    <video
                      src={item.src}
                      className="w-full h-full object-cover bg-black"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  // Image
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium text-sm md:text-base">
                    {item.caption}
                  </p>
                  <p className="text-white/70 text-xs md:text-sm flex items-center gap-1">
                    {item.type === "video" && <Play className="w-3 h-3" />}
                    {item.category}
                  </p>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    {item.type === "video" ? (
                      <Play className="w-5 h-5 text-white" />
                    ) : (
                      <ZoomIn className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted)]">
              Belum ada foto dalam kategori ini.
            </p>
          </div>
        )}
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Tutup"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevItem();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextItem();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Berikutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content */}
            <motion.div
              key={selectedItem}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[80vh] px-4 w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredItems[selectedItem].type === "video" ? (
                // Video player in lightbox
                <div className="relative rounded-lg bg-black">
                  <video
                    ref={videoRef}
                    src={filteredItems[selectedItem].src}
                    autoPlay
                    loop
                    muted={false}
                    controls
                    className="mx-auto max-h-[70vh] max-w-full rounded-lg bg-black"
                  />
                </div>
              ) : (
                // Image
                <img
                  src={filteredItems[selectedItem].src}
                  alt={filteredItems[selectedItem].alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg mx-auto"
                />
              )}
              <div className="mt-4 text-center">
                <p className="text-white text-lg font-medium">
                  {filteredItems[selectedItem].caption}
                </p>
                <p className="text-white/60 text-sm">
                  {selectedItem + 1} / {filteredItems.length} • {filteredItems[selectedItem].type === "video" ? "Video" : "Foto"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
