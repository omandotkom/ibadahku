import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";
import Container from "@/components/ui/Container";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Calendar, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Artikel Umroh Haji Terpercaya | ibadahku.id",
  description: "Kumpulan artikel informatif seputar ibadah Umroh dan Haji. Tips persiapan, manasik, biaya umroh terbaru, dan panduan ibadah sesuai sunnah.",
  keywords: [
    "blog umroh",
    "artikel haji umroh",
    "tips umroh",
    "panduan manasik",
    "biaya umroh 2025",
    "travel umroh terpercaya",
    "info haji terkini"
  ],
  alternates: {
    canonical: "https://ibadahku.id/blog/",
  },
  openGraph: {
    title: "Blog & Artikel Umroh Haji Terpercaya | ibadahku.id",
    description: "Dapatkan informasi terlengkap seputar persiapan Umroh dan Haji. Tips, biaya, dan panduan ibadah dari sumber terpercaya.",
    url: "https://ibadahku.id/blog/",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Navigation */}
      <header role="banner" className="bg-[var(--brand-green-dark)]">
        <Navbar />
      </header>

      {/* Header Section */}
      <div className="bg-[var(--surface-elevated)] py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--brand-green-dark)]">
              Artikel & Wawasan
            </h1>
            <p className="text-lg text-[var(--text-secondary)]">
              Informasi terkini, tips, dan panduan seputar ibadah Umroh dan Haji untuk menemani perjalanan spiritual Anda.
            </p>
          </div>
        </Container>
      </div>

      {/* Blog List Section */}
      <section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[var(--border)] flex flex-col h-full"
              >
                {/* Image */}
                <Link href={`/blog/${post.slug}`} className="relative h-56 w-full overflow-hidden block">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" /> {/* Placeholder */}
                  {/* Note: In a real scenario, use actual images. For now we use a colored placeholder if image load fails or just a div */}
                  <div className="w-full h-full bg-[var(--brand-green-light)]/20 flex items-center justify-center text-[var(--brand-green-primary)]">
                    <span className="font-serif text-4xl opacity-20">ibadahku</span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--brand-green-primary)] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[var(--border)]">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider font-medium px-2 py-1 rounded-full bg-[var(--surface-elevated)] text-[var(--brand-green-primary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
