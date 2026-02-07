import type { MetadataRoute } from "next";

/**
 * Force static generation untuk static export
 */
export const dynamic = "force-static";

/**
 * Web App Manifest
 * PWA configuration untuk add-to-home screen
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ibadahku.id - Layanan Umroh & Haji",
    short_name: "ibadahku",
    description: "Layanan perjalanan Umroh dan Haji dengan kualitas terbaik. Resmi terdaftar Kemenag RI.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#059669",
    orientation: "portrait",
    scope: "/",
    lang: "id",
    dir: "ltr",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["travel", "religion", "lifestyle"],
    screenshots: [
      {
        src: "/screenshot-wide.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screenshot-narrow.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
    shortcuts: [
      {
        name: "Lihat Paket",
        short_name: "Paket",
        description: "Lihat paket Umroh dan Haji",
        url: "/#packages",
        icons: [{ src: "/icon-96x96.png", sizes: "96x96" }],
      },
      {
        name: "Hubungi Kami",
        short_name: "Kontak",
        description: "Hubungi kami via WhatsApp",
        url: "/#contact",
        icons: [{ src: "/icon-96x96.png", sizes: "96x96" }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };
}
