import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

/**
 * Playfair Display - Serif font for headings
 * Gives premium, elegant feel suitable for religious/travel service
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

/**
 * Inter - Sans-serif font for body text
 * Excellent readability for all ages
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});

/**
 * Metadata for SEO Optimization
 * Target keywords: Umroh, Haji, Travel, Ibadah
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://ibadahku.id"),
  title: {
    default: "ibadahku.id - Layanan Umroh & Haji Terpercaya | Travel Resmi Kemenag",
    template: "%s | ibadahku.id",
  },
  description: "Layanan perjalanan Umroh dan Haji dengan kualitas terbaik. Paket lengkap mulai 28jt, harga transparan, pembimbing berpengalaman. Resmi terdaftar Kemenag RI. Daftar sekarang!",
  keywords: [
    "umroh",
    "haji",
    "travel umroh",
    "paket umroh",
    "paket umroh 2024",
    "paket umroh 2025",
    "biro perjalanan haji umroh",
    "travel haji",
    "umroh murah",
    "umroh hemat",
    "umroh plus",
    "umroh vip",
    "haji khusus",
    "haji plus",
    "ibadah",
    "makkah",
    "madinah",
    "masjidil haram",
    "masjid nabawi",
    "ibadahku",
    "travel umroh terpercaya",
    "travel umroh jakarta",
  ],
  authors: [{ name: "ibadahku.id", url: "https://ibadahku.id" }],
  creator: "ibadahku.id",
  publisher: "ibadahku.id",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ibadahku.id",
    siteName: "ibadahku.id",
    title: "ibadahku.id - Layanan Umroh & Haji Terpercaya",
    description: "Layanan perjalanan Umroh dan Haji dengan kualitas terbaik. Paket lengkap, harga transparan, pembimbing berpengalaman. Resmi Kemenag RI.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ibadahku.id - Layanan Umroh & Haji Terpercaya",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ibadahku.id - Layanan Umroh & Haji Terpercaya",
    description: "Layanan perjalanan Umroh dan Haji dengan kualitas terbaik. Paket lengkap, harga transparan.",
    images: ["/og-image.jpg"],
    creator: "@ibadahku.id",
  },
  alternates: {
    canonical: "https://ibadahku.id",
    languages: {
      "id-ID": "https://ibadahku.id",
    },
  },
  category: "religion",
  classification: "Travel, Religious Services",
  referrer: "origin-when-cross-origin",
  verification: {
    google: "google-site-verification-code", // Ganti dengan kode verifikasi Google Search Console
  },
  other: {
    "facebook-domain-verification": "facebook-verification-code", // Ganti jika ada
  },
};

/**
 * Viewport configuration
 * Mobile-first responsive design
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#059669" },
    { media: "(prefers-color-scheme: dark)", color: "#064e3b" },
  ],
};

/**
 * Structured Data (JSON-LD)
 * Schema.org markup untuk TravelAgency
 */
function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "ibadahku.id",
    description: "Layanan perjalanan Umroh dan Haji dengan kualitas terbaik. Terdaftar resmi Kemenag RI.",
    url: "https://ibadahku.id",
    logo: "https://ibadahku.id/logo.png",
    image: "https://ibadahku.id/og-image.jpg",
    telephone: "+62-812-8612-9604",
    email: "info@ibadahku.id",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. KH. Ahmad Dahlan No. 123",
      addressLocality: "Jakarta Selatan",
      addressRegion: "DKI Jakarta",
      postalCode: "12110",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-6.2088",
      longitude: "106.8456",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "09:00",
        closes: "15:00",
      },
    ],
    sameAs: [
      "https://instagram.com/ibadahku.id",
      "https://facebook.com/ibadahku.id",
      "https://youtube.com/@ibadahku.id",
    ],
    priceRange: "$$$",
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Paket Umroh dan Haji",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristAttraction",
            name: "Paket Umroh Reguler",
            description: "Paket hemat untuk perjalanan Umroh dengan fasilitas standar yang nyaman.",
          },
          price: "28500000",
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristAttraction",
            name: "Paket Umroh Plus",
            description: "Paket unggulan dengan hotel berbintang 4 dan layanan premium.",
          },
          price: "38500000",
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristAttraction",
            name: "Paket Umroh VIP",
            description: "Pengalaman Umroh eksklusif dengan hotel 5 bintang.",
          },
          price: "55000000",
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "10000",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Ahmad Sudirman",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        reviewBody: "Perjalanan Umroh saya bersama ibadahku.id sangat lancar dan berkesan. Pembimbingnya sangat sabar.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

/**
 * Breadcrumb Structured Data
 */
function BreadcrumbStructuredData() {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: "https://ibadahku.id",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
}

/**
 * Organization Structured Data
 */
function OrganizationStructuredData() {
  const orgData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ibadahku.id",
    alternateName: "Ibadahku Travel",
    url: "https://ibadahku.id",
    logo: "https://ibadahku.id/logo.png",
    description: "Layanan perjalanan Umroh dan Haji terpercaya sejak 2009.",
    foundingDate: "2009",
    founders: [
      {
        "@type": "Person",
        name: "Founder Name",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-812-8612-9604",
      contactType: "customer service",
      availableLanguage: ["Indonesian", "Arabic", "English"],
    },
    sameAs: [
      "https://instagram.com/ibadahku.id",
      "https://facebook.com/ibadahku.id",
      "https://youtube.com/@ibadahku.id",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(orgData) }}
    />
  );
}

/**
 * Root Layout Component
 * Wraps all pages with global styles and fonts
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect untuk performa */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Favicon & Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/logo-kabah.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="mask-icon" href="/logo-kabah.svg" color="#059669" />
        <meta name="msapplication-TileColor" content="#059669" />
        <meta name="msapplication-TileImage" content="/icon-192x192.png" />
        
        {/* Structured Data */}
        <StructuredData />
        <BreadcrumbStructuredData />
        <OrganizationStructuredData />
      </head>
      <body className="font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
