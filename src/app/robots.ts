import type { MetadataRoute } from "next";

/**
 * Force static generation untuk static export
 */
export const dynamic = "force-static";

/**
 * Robots.txt Generator
 * Mengatur crawling behavior untuk search engine bots
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ibadahku.id";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",
          "/api/",
          "/private/",
          "/admin/",
          "/*.json$",
          "/*.xml$",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/_next/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
