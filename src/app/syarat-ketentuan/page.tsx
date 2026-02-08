import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan layanan ibadahku.id untuk informasi, pendaftaran, dan komunikasi layanan perjalanan Umroh dan Haji.",
  alternates: {
    canonical: "https://ibadahku.id/syarat-ketentuan",
  },
};

const termsSections = [
  {
    title: "1. Ruang Lingkup",
    content:
      "Halaman ini mengatur penggunaan website ibadahku.id dan interaksi awal calon jamaah dengan informasi layanan kami. Syarat ini berlaku untuk seluruh pengunjung dan pengguna website.",
  },
  {
    title: "2. Informasi Layanan",
    content:
      "Informasi paket, jadwal, harga, dan fasilitas ditampilkan sebagai referensi awal. Detail final mengikuti dokumen pendaftaran, invoice, dan perjanjian resmi yang disepakati saat proses transaksi.",
  },
  {
    title: "3. Pendaftaran dan Pembayaran",
    content:
      "Pendaftaran paket dinyatakan sah setelah data calon jamaah diverifikasi dan pembayaran sesuai ketentuan diterima. Bukti pembayaran dan dokumen pendukung wajib disimpan oleh jamaah.",
  },
  {
    title: "4. Perubahan Jadwal dan Fasilitas",
    content:
      "Jadwal keberangkatan, maskapai, hotel, dan detail teknis lainnya dapat berubah menyesuaikan kebijakan otoritas, mitra, dan kondisi operasional. Perubahan akan diinformasikan kepada jamaah secepatnya.",
  },
  {
    title: "5. Kebijakan Pembatalan",
    content:
      "Ketentuan pembatalan, pengembalian dana, dan pengalihan jadwal mengikuti kebijakan resmi yang tertera pada dokumen transaksi. Biaya administrasi atau biaya pihak ketiga dapat berlaku.",
  },
  {
    title: "6. Tanggung Jawab Pengguna",
    content:
      "Pengguna wajib memberikan data yang benar, menjaga kerahasiaan data pribadi, dan menggunakan website secara wajar tanpa aktivitas yang melanggar hukum atau merugikan pihak lain.",
  },
  {
    title: "7. Hak Kekayaan Intelektual",
    content:
      "Seluruh konten website, termasuk teks, gambar, video, dan elemen desain, dimiliki atau digunakan secara sah oleh ibadahku.id. Penggunaan ulang tanpa izin tertulis tidak diperkenankan.",
  },
  {
    title: "8. Perubahan Ketentuan",
    content:
      "Kami berhak memperbarui syarat dan ketentuan ini sewaktu-waktu. Versi terbaru akan dipublikasikan di halaman ini dan berlaku sejak tanggal pembaruan ditetapkan.",
  },
  {
    title: "9. Kontak",
    content:
      "Untuk pertanyaan terkait syarat dan ketentuan, silakan hubungi tim kami melalui WhatsApp atau email resmi yang tercantum di website.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header role="banner">
        <Navbar />
      </header>

      <section className="pt-32 pb-16 lg:pt-36 lg:pb-20">
        <Container size="lg">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-[var(--brand-green-primary)] bg-[var(--brand-green-lighter)] rounded-full">
              Legal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight">
              Syarat & Ketentuan
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Terakhir diperbarui: 8 Februari 2026
            </p>
            <div className="mt-8 h-1 w-20 bg-gradient-to-r from-[var(--brand-green-dark)] to-[var(--accent-gold)] rounded-full" />
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-24">
        <Container size="lg">
          <div className="max-w-4xl mx-auto rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="space-y-8">
              {termsSections.map((section) => (
                <article key={section.title}>
                  <h2 className="font-serif text-2xl font-semibold text-[var(--text-primary)]">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
                    {section.content}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <footer role="contentinfo">
        <Footer />
      </footer>
    </main>
  );
}
