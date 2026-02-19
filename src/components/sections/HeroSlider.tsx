"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * HeroSlider Component
 * 
 * Slider dengan 1 foto (default) dan 1 video (loop)
 * Overlay "Selamat Datang" center vertikal horizontal
 * Responsive untuk web dan mobile
 * 
 * @component
 */

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0); // 0 = image, 1 = video
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = [
    {
      type: "image",
      src: "/assets/hero-image.jpg",
      alt: "Pemandangan Ka'bah yang megah di Makkah",
    },
    {
      type: "video",
      src: "https://assets.ibadahku.id/hero-video.mp4",
      alt: "Video suasana ibadah di Tanah Suci",
    },
  ];

  // Auto-play video when slide changes to video
  useEffect(() => {
    if (currentSlide === 1 && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSlide]);

  // Handle video play/pause
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1080px] overflow-hidden bg-black">
      {/* Slides Container */}
      <AnimatePresence mode="wait">
        {currentSlide === 0 ? (
          // Image Slide (Default)
          <motion.div
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={slides[0].src}
              alt={slides[0].alt}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        ) : (
          // Video Slide
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <video
              ref={videoRef}
              src={slides[1].src}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              className="w-full h-full object-cover"
              poster={slides[0].src}
            />
            {/* Video Play/Pause Button */}
            <button
              onClick={toggleVideo}
              className="absolute bottom-24 right-6 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors min-w-[44px] min-h-[44px]"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />

      {/* Content Overlay - Center Vertikal Horizontal */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)] animate-pulse" />
            Terdaftar Resmi Kemenag RI
          </motion.div>

          {/* Main Title - Font Ramah */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Travel Umroh & Haji Terpercaya
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light mb-4"
          >
            Bersama <span className="font-semibold text-[var(--accent-gold)]">ibadahku.id</span>
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Mari wujudkan impian ibadah Anda ke Tanah Suci bersama kami. 
            Sebagai biro perjalanan haji dan umroh resmi yang terdaftar di Kemenag RI, kami berkomitmen memberikan layanan terbaik dengan harga transparan dan pembimbing berpengalaman. Dapatkan paket umroh murah dan berkualitas tahun 2026 sekarang juga.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-[var(--brand-green-primary)] text-white rounded-xl hover:bg-[var(--brand-green-dark)] transition-all duration-300 shadow-lg shadow-[var(--brand-green-primary)]/30 min-h-[48px]"
            >
              Lihat Paket Umroh
            </a>
            <a
              href="https://wa.me/6281286129604?text=Assalamualaikum%20saya%20mau%20tanya-tanya%20tentang%20paket%20perjalanan%20ke%20tanah%20suci"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 min-h-[48px]"
            >
              Konsultasi Gratis
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px]"
          aria-label="Slide sebelumnya"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots Indicator */}
        <div className="flex items-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center`}
              aria-label={`Go to ${slide.type} slide`}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-10 h-10 bg-white"
                    : "w-3 h-3 bg-white/50 hover:bg-white/70"
                }`}
              >
                {slide.type === "video" && currentSlide === index && (
                  <Play className="w-4 h-4 text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px]"
          aria-label="Slide berikutnya"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Label */}
      <div className="absolute bottom-8 right-6 z-30 hidden sm:block">
        <span className="text-white/60 text-sm">
          {currentSlide === 0 ? "Foto" : "Video"}
        </span>
      </div>
    </section>
  );
}
