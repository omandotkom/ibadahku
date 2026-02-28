# Hero Image Optimasi

Dokumentasi hasil optimasi gambar hero untuk website ibadahku.id.

## 📁 File yang Dihasilkan

### Format JPEG (Fallback Universal)
| File | Ukuran | Dimensi | Penggunaan |
|------|--------|---------|------------|
| `hero-sm.jpg` | 41.33 KB | 480x270 | Mobile |
| `hero-md.jpg` | 99.07 KB | 768x432 | Tablet |
| `hero-lg.jpg` | 232.90 KB | 1200x675 | Desktop |
| `hero-xl.jpg` | 542.45 KB | 1920x1080 | Large Desktop |

### Format WebP (Browser Modern)
| File | Ukuran | Dimensi | Browser Support |
|------|--------|---------|-----------------|
| `hero-sm.webp` | 49.67 KB | 480x270 | Chrome, Firefox, Safari, Edge |
| `hero-md.webp` | 116.30 KB | 768x432 | Chrome, Firefox, Safari, Edge |
| `hero-lg.webp` | 263.00 KB | 1200x675 | Chrome, Firefox, Safari, Edge |
| `hero-xl.webp` | 592.24 KB | 1920x1080 | Chrome, Firefox, Safari, Edge |

### Format AVIF (Paling Efisien)
| File | Ukuran | Dimensi | Browser Support |
|------|--------|---------|-----------------|
| `hero-sm.avif` | 64.98 KB | 480x270 | Chrome, Firefox, Safari |
| `hero-md.avif` | 144.29 KB | 768x432 | Chrome, Firefox, Safari |
| `hero-lg.avif` | 322.99 KB | 1200x675 | Chrome, Firefox, Safari |
| `hero-xl.avif` | 703.72 KB | 1920x1080 | Chrome, Firefox, Safari |

## 📊 Perbandingan Ukuran

| Metrik | Original | Optimized JPEG | WebP | AVIF |
|--------|----------|----------------|------|------|
| Ukuran (XL) | 1.79 MB | 542.45 KB | 592.24 KB | 703.72 KB |
| Pengurangan | - | **70.4%** | 67.7% | 61.6% |
| Kualitas | 100% | 80% | 80% | 70% |

## 🚀 Implementasi di Kode

Komponen `HeroSlider.tsx` telah diupdate dengan:

1. **Picture Element** dengan multiple sources:
   - AVIF (prioritas tertinggi)
   - WebP (fallback)
   - JPEG (fallback universal)

2. **Responsive Images** dengan `srcset`:
   ```tsx
   <picture>
     <source type="image/avif" srcSet="..." sizes="100vw" />
     <source type="image/webp" srcSet="..." sizes="100vw" />
     <img srcSet="..." sizes="100vw" ... />
   </picture>
   ```

3. **Video Poster** menggunakan gambar yang dioptimasi (`hero-lg.jpg`)

## 🔄 Cara Regenerasi

Jika gambar original berubah, jalankan:

```bash
node scripts/optimize-hero.js
```

## 📝 Catatan

- Original file: `public/assets/hero-image.jpg` (1.79 MB, 4000x2250)
- Quality settings: JPEG 80%, WebP 80%, AVIF 70%
- Semua gambar menggunakan progressive encoding untuk JPEG
