/**
 * Static Data for ibadahku.id
 * Package offerings, testimonials, and site content
 */

import { Package, Testimonial, Feature, FAQItem, NavItem, SiteConfig } from "@/types";

/**
 * Site Configuration
 */
export const siteConfig: SiteConfig = {
  name: "ibadahku.id",
  description: "Layanan perjalanan Umroh dan Haji dengan kualitas terbaik",
  url: "https://ibadahku.id",
  contact: {
    phone: "+62 812-3456-7890",
    email: "info@ibadahku.id",
    address: "Jl. KH. Ahmad Dahlan No. 123, Jakarta Selatan",
    whatsapp: "6281286129604",
  },
  social: [
    { platform: "instagram", url: "https://instagram.com/ibadahku.id", label: "Instagram" },
    { platform: "facebook", url: "https://facebook.com/ibadahku.id", label: "Facebook" },
    { platform: "youtube", url: "https://youtube.com/@ibadahku.id", label: "YouTube" },
    { platform: "whatsapp", url: "https://wa.me/6281286129604?text=Assalamualaikum%20saya%20mau%20tanya-tanya%20tentang%20paket%20perjalanan%20ke%20tanah%20suci", label: "WhatsApp" },
  ],
};

/**
 * Navigation Items
 */
export const navItems: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Paket Umroh", href: "/#packages" },
  { label: "Haji", href: "/#haji" },
  { label: "Jadwal", href: "/#schedule" },
  { label: "Artikel", href: "/#articles" },
  { label: "Tentang Kami", href: "/#about" },
];

/**
 * Umroh Packages
 */
export const packages: Package[] = [
  {
    id: "umroh-reguler-12d",
    name: "Paket Umroh Reguler",
    description: "Paket hemat untuk perjalanan Umroh dengan fasilitas standar yang nyaman. Cocok untuk jamaah yang ingin beribadah dengan biaya terjangkau.",
    price: 28500000,
    duration: 12,
    hotelStars: 3,
    airline: "Garuda Indonesia",
    departureDate: "2024-03-15",
    quota: 45,
    availableQuota: 12,
    features: [
      "Tiket pesawat PP",
      "Hotel Makkah 3* (5 malam)",
      "Hotel Madinah 3* (5 malam)",
      "Makan 3x sehari",
      "Bus AC selama di Saudi",
      "Pembimbing berpengalaman",
      "Manasik praktis",
      "Asuransi perjalanan",
    ],
    isPopular: false,
    image: "/images/package-reguler.jpg",
  },
  {
    id: "umroh-plus-12d",
    name: "Paket Umroh Plus",
    description: "Paket unggulan dengan hotel berbintang 4 dan layanan premium. Nikmati kenyamanan beribadah dengan fasilitas terbaik.",
    price: 38500000,
    duration: 12,
    hotelStars: 4,
    airline: "Saudia Airlines",
    departureDate: "2024-03-20",
    quota: 40,
    availableQuota: 8,
    features: [
      "Tiket pesawat PP",
      "Hotel Makkah 4* (5 malam)",
      "Hotel Madinah 4* (5 malam)",
      "Makan prasmanan 3x sehari",
      "Bus AC premium",
      "Pembimbing berpengalaman",
      "Manasik intensif",
      "Ziarah lengkap",
      "Asuransi perjalanan",
      "Tas & koper",
    ],
    isPopular: true,
    isRecommended: true,
    image: "/images/package-plus.jpg",
  },
  {
    id: "umroh-vip-15d",
    name: "Paket Umroh VIP",
    description: "Pengalaman Umroh eksklusif dengan hotel 5 bintang di dekat Masjidil Haram. Pelayanan prima untuk kenyamanan maksimal.",
    price: 55000000,
    duration: 15,
    hotelStars: 5,
    airline: "Emirates",
    departureDate: "2024-04-05",
    quota: 25,
    availableQuota: 5,
    features: [
      "Tiket pesawat PP kelas bisnis",
      "Hotel Makkah 5* view Ka'bah (7 malam)",
      "Hotel Madinah 5* dekat Masjid Nabawi (6 malam)",
      "Makan prasmanan hotel 3x sehari",
      "Bus AC luxury",
      "Pembimbing VIP",
      "Manasik privat",
      "Ziarah eksklusif",
      "Asuransi premium",
      "Tas & koper premium",
      "Akomodasi 1 malam Jeddah",
    ],
    isPopular: false,
    image: "/images/package-vip.jpg",
  },
  {
    id: "umroh-ramadhan-10d",
    name: "Paket Umroh Ramadhan",
    description: "Raih keberkahan Umroh di bulan Ramadhan dengan program khusus. I'tikaf dan tarawih berjemaah di Masjidil Haram.",
    price: 42500000,
    duration: 10,
    hotelStars: 4,
    airline: "Qatar Airways",
    departureDate: "2024-03-25",
    quota: 30,
    availableQuota: 3,
    features: [
      "Tiket pesawat PP",
      "Hotel Makkah 4* (6 malam)",
      "Hotel Madinah 4* (3 malam)",
      "Sahur & berbuka lengkap",
      "Program i'tikaf",
      "Sholat tarawih berjemaah",
      "Pembimbing berpengalaman",
      "Kajian Ramadhan",
      "Asuransi perjalanan",
    ],
    isPopular: true,
    image: "/images/package-ramadhan.jpg",
  },
];

/**
 * Features/Services
 */
export const features: Feature[] = [
  {
    id: "terdaftar-kemenag",
    title: "Terdaftar Kemenag",
    description: "Resmi terdaftar di Kementerian Agama RI dengan izin operasional yang sah dan terpercaya.",
    icon: "Shield",
  },
  {
    id: "pembimbing-berpengalaman",
    title: "Pembimbing Berpengalaman",
    description: "Tim pembimbing yang telah berpengalaman puluhan tahun menangani perjalanan Umroh dan Haji.",
    icon: "Users",
  },
  {
    id: "hotel-berkualitas",
    title: "Hotel Berkualitas",
    description: "Kerjasama dengan hotel-hotel terbaik di Makkah dan Madinah dengan lokasi strategis.",
    icon: "Building",
  },
  {
    id: "harga-transparan",
    title: "Harga Transparan",
    description: "Tidak ada biaya tersembunyi. Semua fasilitas dan layanan dijelaskan dengan jelas.",
    icon: "BadgeCheck",
  },
  {
    id: "layanan-24jam",
    title: "Layanan 24 Jam",
    description: "Tim kami siap membantu Anda kapan saja selama perjalanan ibadah di Tanah Suci.",
    icon: "Headphones",
  },
  {
    id: "cicilan-ringan",
    title: "Cicilan Ringan",
    description: "Program cicilan dengan bunga 0% memudahkan Anda mewujudkan impian ke Baitullah.",
    icon: "CreditCard",
  },
];

/**
 * Testimonials
 */
export const testimonials: Testimonial[] = [
  {
    id: "testi-1",
    name: "Bapak Ahmad Sudirman",
    role: "Jamaah Umroh Reguler 2023",
    content: "Alhamdulillah perjalanan Umroh saya bersama ibadahku.id sangat lancar dan berkesan. Pembimbingnya sangat sabar dan pengertian terhadap jamaah lansia seperti saya. Hotelnya juga nyaman dan dekat dengan Masjidil Haram.",
    rating: 5,
    packageName: "Paket Umroh Reguler",
    date: "2023-05-15",
  },
  {
    id: "testi-2",
    name: "Ibu Sarah Wulandari",
    role: "Jamaah Umroh Plus 2023",
    content: "Pelayanannya sangat memuaskan! Makanannya enak dan sesuai selera orang Indonesia. Ziarahnya juga lengkap, tidak terburu-buru. Saya sangat merekomendasikan ibadahku.id untuk keluarga dan teman-teman.",
    rating: 5,
    packageName: "Paket Umroh Plus",
    date: "2023-06-22",
  },
  {
    id: "testi-3",
    name: "Keluarga H. Ridwan",
    role: "Jamaah Umroh VIP 2023",
    content: "Kami sekeluarga memilih paket VIP dan tidak menyesal sama sekali. Hotelnya view Ka'bah, sangat berkesan bisa melihat Ka'bah dari kamar. Service-nya benar-benar VIP. Terima kasih ibadahku.id!",
    rating: 5,
    packageName: "Paket Umroh VIP",
    date: "2023-07-10",
  },
  {
    id: "testi-4",
    name: "Ibu Fatimah Azzahra",
    role: "Jamaah Umroh Ramadhan 2023",
    content: "Umroh di bulan Ramadhan bersama ibadahku.id adalah pengalaman spiritual yang tak terlupakan. Program i'tikaf dan kajiannya sangat menyentuh hati. Semoga bisa berkumpul lagi di Ramadhan berikutnya.",
    rating: 5,
    packageName: "Paket Umroh Ramadhan",
    date: "2023-04-28",
  },
];

/**
 * FAQ Items
 */
export const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "Berapa lama proses pendaftaran Umroh?",
    answer: "Proses pendaftaran Umroh biasanya memakan waktu 1-3 hari kerja setelah dokumen lengkap diterima. Dokumen yang diperlukan meliputi: KTP, KK, Paspor (minimal 8 bulan masa berlaku), foto 3x4 latar belakang putih, dan surat keterangan sehat dari dokter.",
  },
  {
    id: "faq-2",
    question: "Apakah bisa mencicil biaya Umroh?",
    answer: "Ya, kami menyediakan program cicilan dengan bunga 0%. Anda bisa membayar DP minimal 30% dan mencicil sisanya hingga 6 bulan sebelum keberangkatan. Untuk informasi lebih detail, silakan hubungi tim marketing kami.",
  },
  {
    id: "faq-3",
    question: "Bagaimana jika saya membatalkan keberangkatan?",
    answer: "Kebijakan pembatalan: 60+ hari sebelum keberangkatan dikenakan biaya admin 10%, 30-59 hari dikenakan 25%, 15-29 hari dikenakan 50%, dan kurang dari 15 hari dikenakan 100%. Namun, biaya yang sudah dibayarkan bisa dialihkan ke jadwal keberangkatan lain dengan ketentuan yang berlaku.",
  },
  {
    id: "faq-4",
    question: "Apakah ada batasan usia untuk Umroh?",
    answer: "Tidak ada batasan usia untuk Umroh. Namun, untuk jamaah di atas 60 tahun dan di bawah 12 tahun, kami sarankan didampingi oleh keluarga. Kami juga menyediakan program khusus untuk lansia dengan fasilitas dan pelayanan yang lebih personal.",
  },
  {
    id: "faq-5",
    question: "Apakah sudah termasuk visa?",
    answer: "Ya, semua paket Umroh kami sudah termasuk visa Umroh. Tim kami akan mengurus seluruh proses pengurusan visa, Anda hanya perlu menyerahkan dokumen yang diperlukan.",
  },
];
