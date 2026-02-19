# Evaluasi SEO Project ibadahku.id

Berikut adalah hasil analisis mendalam mengenai implementasi SEO pada project ini.

## 1. Overview
Secara umum, project ini memiliki fondasi SEO teknis yang **sangat baik** untuk sebuah aplikasi Next.js dengan Static Export. Penggunaan metadata, structured data, dan semantic HTML sudah diterapkan dengan standar yang tinggi. Namun, terdapat beberapa area optimasi konten dan teknis yang perlu diperhatikan sebelum peluncuran produksi.

## 2. Kekuatan (Strengths)

*   **Metadata yang Komprehensif**:
    *   `title` dan `description` dioptimalkan dengan keyword target (Umroh, Haji, Travel).
    *   Open Graph dan Twitter Cards sudah terkonfigurasi dengan baik untuk social sharing.
    *   `keywords` meta tag relevan, meskipun Google modern kurang memprioritaskannya, ini tetap praktek yang baik.
*   **Structured Data (Schema.org)**:
    *   Implementasi JSON-LD sangat lengkap, mencakup `TravelAgency`, `OfferCatalog` (untuk paket), `BreadcrumbList`, dan `Organization`. Ini sangat membantu Google memahami konteks bisnis dan produk.
*   **Mobile-First & Responsive**:
    *   Desain responsif dan konfigurasi `viewport` yang tepat sangat krusial untuk Mobile-First Indexing Google.
*   **Performance Foundation**:
    *   Penggunaan `next/font` untuk optimasi font (CLS prevention).
    *   `loading="eager"` pada gambar Hero (LCP optimization).

## 3. Area Perbaikan (Areas for Improvement)

### A. Konten & Keyword (On-Page SEO)
*   **Heading H1 Kurang Optimal**:
    *   **Isu**: H1 saat ini adalah "Selamat Datang". Ini menyia-nyiakan kesempatan ranking untuk keyword utama.
    *   **Saran**: Ubah menjadi sesuatu yang mengandung keyword, misal: "Travel Umroh & Haji Terpercaya - ibadahku.id" atau "Layanan Perjalanan Ibadah Tanah Suci".
*   **Konten Teks Minim**:
    *   Homepage didominasi oleh elemen visual dan teks singkat. Google membutuhkan konten teks yang cukup untuk memahami relevansi halaman.
    *   **Saran**: Tambahkan sction deskriptif tentang "Mengapa Memilih Kami" atau "Panduan Umroh" dengan paragraf yang lebih panjang.

### B. Isu Teknis (Technical SEO)
*   **Canonical URL Inconsistency**:
    *   **Isu**: Di `layout.tsx`, canonical diset ke `https://ibadahku.id` (tanpa slash), sedangkan di `page.tsx` override ke `https://ibadahku.id/` (dengan slash). `next.config.ts` menggunakan `trailingSlash: true`.
    *   **Saran**: Samakan semua canonical URL untuk menggunakan trailing slash (`/`) agar konsisten dan menghindari duplicate content issues.
*   **Image Optimization**:
    *   **Isu**: `next.config.ts` menggunakan `images: { unoptimized: true }` dan kode menggunakan tag `<img>` biasa. Linter juga memperingatkan hal ini.
    *   **Saran**: Pastikan gambar yang di-upload ke `public/` atau CDN sudah di-kompres (WebP/AVIF) dan di-resize sesuai ukuran tampilan. Jika tidak, LCP (Largest Contentful Paint) akan buruk.
*   **Internal Linking**:
    *   **Isu**: Banyak internal link menggunakan tag `<a>` biasa (misal di Navbar dan Footer) alih-alih komponen `<Link>` dari Next.js.
    *   **Saran**: Gunakan `<Link href="...">` untuk navigasi internal agar transisi halaman instan (SPA feel) dan meningkatkan User Experience signal.
*   **Schema Rating Hardcoded**:
    *   **Isu**: Schema `AggregateRating` di-hardcode ke nilai 4.9/5 dari 10.000 review.
    *   **Risiko**: Google dapat memberikan penalti manual (Manual Action) jika data structured data dianggap menyesatkan (misleading) atau tidak sesuai fakta di halaman.
    *   **Saran**: Hapus bagian rating ini jika belum ada data real, atau gunakan data real dari database/testimoni.

### C. Code Quality Impact
*   **React Errors**: Terdapat error linter pada `HeroSlider.tsx` terkait penggunaan `setState` di dalam `useEffect`. Jika ini menyebabkan render loop atau crash di client-side, Googlebot mungkin gagal merender halaman dengan benar.

## 4. Rekomendasi Prioritas

1.  **Ubah H1**: Ganti "Selamat Datang" dengan headline berbasis keyword.
2.  **Perbaiki Internal Link**: Ganti semua `<a>` internal dengan `<Link>`.
3.  **Validasi Schema**: Pastikan data di JSON-LD sesuai dengan konten yang tampil di layar (terutama Rating).
4.  **Audit Gambar**: Kompres manual semua aset gambar statis.
