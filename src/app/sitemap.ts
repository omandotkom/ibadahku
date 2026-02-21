import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";

/**
 * Force static generation untuk static export
 */
export const dynamic = "force-static";

/**
 * Sitemap Generator
 * Auto-generates sitemap.xml untuk SEO
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ibadahku.id";
  const now = new Date();

  // Generate sitemap entries for blog posts
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/syarat-ketentuan`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogEntries,
  ];
}
