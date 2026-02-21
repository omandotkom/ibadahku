# Panduan Penulisan Artikel Blog untuk AI Agent (ibadahku.id)

Panduan ini wajib diikuti oleh AI Agent saat membuat konten blog baru untuk website **ibadahku.id**.

## 1. Strategi Konten & SEO (Search Engine Optimization)

*   **Target Audiens:** Calon jamaah Umroh dan Haji Indonesia yang mencari informasi terpercaya, harga transparan, dan kenyamanan ibadah.
*   **Kata Kunci Utama (Wajib Ada):**
    *   "Umroh Terpercaya"
    *   "Biaya Umroh 2026" / "Harga Paket Umroh 2026"
    *   "Travel Umroh Resmi Kemenag"
    *   "Paket Umroh Murah & Aman"
    *   "Haji Plus Resmi"
    *   "Ibadah Aman Tenang"
*   **Konteks Waktu:** Selalu gunakan referensi tahun **2026** atau **masa depan** untuk menjaga relevansi jangka panjang. Hindari konten yang cepat kadaluarsa.
*   **Tone of Voice:** Profesional, empatik, persuasif, dan Islami (namun tetap modern). Gunakan sapaan "Anda" atau "Sahabat Ibadahku".

## 2. Struktur Artikel

Setiap artikel harus memiliki elemen berikut:

### a. Judul (H1)
*   Menarik, mengandung kata kunci utama, dan maksimal 60 karakter.
*   Contoh: *"Rincian Biaya Umroh 2026: Paket Hemat & Terpercaya Resmi Kemenag"*

### b. Meta Description (Excerpt)
*   Ringkasan singkat (140-160 karakter) yang memicu klik. Wajib mengandung kata kunci turunan.

### c. Struktur Heading (H2, H3)
*   Gunakan H2 untuk poin utama dan H3 untuk sub-poin.
*   Setiap heading harus relevan dengan kata kunci pencarian.

### d. Isi Konten (Body)
*   **Panjang:** Minimal 600 - 1000 kata.
*   **Formatting:** Gunakan **bold** untuk kata kunci penting, *italic* untuk istilah asing/Arab, dan list (bullet points) untuk kemudahan membaca.
*   **Internal Linking:** Wajib menyertakan tautan ke halaman paket (`/#packages`) atau kontak (`/cta`). Contoh: *"Untuk info lebih lanjut, cek [Paket Umroh 2026](#packages) kami."*

### e. Gambar (Image Placeholder)
*   Sertakan path gambar yang relevan (misal: `/images/blog/nama-topik.jpg`). Pastikan alt text deskriptif dan mengandung keyword.

## 3. Implementasi Teknis (Hardcoded Data)

Saat ini, blog bersifat statis. AI Agent harus menambahkan artikel baru ke dalam file `src/lib/blog-data.ts`.

**Format Data:**
```typescript
{
  slug: "judul-artikel-yang-seo-friendly", // Gunakan kebab-case
  title: "Judul Artikel H1",
  excerpt: "Meta description untuk SEO...",
  content: `
    <p>Paragraf pembuka dengan keyword utama...</p>
    <h2>Sub Judul Mengandung Keyword</h2>
    <p>Isi konten yang informatif...</p>
    <ul>
      <li>Poin penting 1</li>
      <li>Poin penting 2</li>
    </ul>
    <p>Penutup dengan Call to Action (CTA) ke layanan ibadahku.id.</p>
  `,
  date: "YYYY-MM-DD", // Gunakan tanggal masa depan (misal: 2026-05-20)
  author: "Tim Ibadahku",
  image: "/images/blog/judul-artikel.jpg",
  tags: ["Keyword 1", "Keyword 2", "Kategori"]
}
```

## 4. Checklist Kualitas (Quality Assurance)
Sebelum submit, pastikan:
- [ ] Apakah artikel sudah menggunakan Bahasa Indonesia yang baik dan benar (PUEBI)?
- [ ] Apakah kata kunci "Umroh", "Haji", "Ibadahku.id" sudah tersebar natural?
- [ ] Apakah tahun referensi adalah 2026?
- [ ] Apakah format HTML (p, h2, ul, li) sudah benar dan valid?
- [ ] Apakah tidak ada halusinasi fakta (pastikan sesuai syariat dan regulasi Kemenag)?

---
*Dokumen ini dibuat untuk memastikan konsistensi dan kualitas SEO konten ibadahku.id.*
