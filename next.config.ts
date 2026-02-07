import type { NextConfig } from "next";

/**
 * Next.js Configuration for ibadahku.id
 * Optimized for static export to Cloudflare Pages
 * 
 * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
const nextConfig: NextConfig = {
  // Enable static export for Cloudflare Pages deployment
  output: 'export',
  
  // Set the directory for static files
  distDir: 'dist',
  
  // Disable image optimization (not supported in static export)
  // Using unoptimized images with lazy loading
  images: {
    unoptimized: true,
  },
  
  // Enable React Compiler for performance optimization
  reactCompiler: true,
  
  // Trailing slash for better SEO and static hosting compatibility
  trailingSlash: true,
};

export default nextConfig;
