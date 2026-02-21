import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import Container from "@/components/ui/Container";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Calendar, User, Tag, ArrowLeft, Facebook, Twitter, Linkedin, Share2 } from "lucide-react";

/**
 * Generate Static Params for SSG
 * Ensures all blog posts are pre-rendered at build time
 */
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generate Metadata for SEO
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan | ibadahku.id",
    };
  }

  return {
    title: `${post.title} | ibadahku.id`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `https://ibadahku.id/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://ibadahku.id/blog/${post.slug}/`,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

/**
 * Blog Post Component
 */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ibadahku.id",
      logo: {
        "@type": "ImageObject",
        url: "https://ibadahku.id/logo-kabah.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ibadahku.id/blog/${post.slug}/`,
    },
    image: `https://ibadahku.id${post.image}`, // Fallback if image path is relative
    keywords: post.tags.join(", "),
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navbar */}
      <header className="bg-[var(--brand-green-dark)]">
        <Navbar />
      </header>

      <article className="pb-24 pt-32 lg:pt-40">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb / Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-[var(--brand-green-primary)] hover:underline mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
              Kembali ke Daftar Artikel
            </Link>

            {/* Header */}
            <header className="mb-12 text-center">
              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[var(--surface-elevated)] text-[var(--brand-green-primary)] text-xs font-semibold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
            </header>

            {/* Featured Image Placeholder */}
            <div className="aspect-video w-full bg-[var(--brand-green-pale)]/30 rounded-3xl mb-12 flex items-center justify-center overflow-hidden shadow-lg">
              <span className="font-serif text-6xl text-[var(--brand-green-primary)] opacity-10 font-bold">ibadahku.id</span>
            </div>

            {/* Content */}
            <div className="prose prose-lg prose-green max-w-none mx-auto
              prose-headings:font-serif prose-headings:text-[var(--text-primary)]
              prose-p:text-[var(--text-secondary)] prose-p:leading-relaxed
              prose-a:text-[var(--brand-green-primary)] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[var(--text-primary)] prose-strong:font-semibold
              prose-li:text-[var(--text-secondary)]
              prose-img:rounded-2xl prose-img:shadow-md
            ">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Share & Footer */}
            <div className="mt-16 pt-8 border-t border-[var(--border)]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="font-serif text-lg font-medium text-[var(--text-primary)]">
                  Bagikan artikel ini:
                </p>
                <div className="flex gap-4">
                  <button className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors" aria-label="Share to Facebook">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-full bg-sky-100 text-sky-500 hover:bg-sky-200 transition-colors" aria-label="Share to Twitter">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors" aria-label="Share to LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors" aria-label="Copy Link">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 bg-[var(--surface-elevated)] rounded-3xl p-8 md:p-12 text-center">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                Siap Menunaikan Ibadah ke Tanah Suci?
              </h3>
              <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                Dapatkan paket umroh terbaik dengan fasilitas nyaman dan pembimbing berpengalaman bersama ibadahku.id.
              </p>
              <Link
                href="/#packages"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-[var(--brand-green-primary)] text-white font-medium hover:bg-[var(--brand-green-dark)] transition-colors shadow-lg shadow-[var(--brand-green-primary)]/30"
              >
                Lihat Paket Umroh
              </Link>
            </div>

          </div>
        </Container>
      </article>

      <Footer />
    </main>
  );
}
