# ibadahku.id

Website layanan Umroh dan Haji dengan desain Modern Minimalist Elegant.
Dibangun dengan Next.js + Tailwind CSS, optimized untuk deployment di Cloudflare Workers (Workers Builds + Static Assets + D1).

![Tech Stack](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Tech Stack](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![Tech Stack](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Deployment](https://img.shields.io/badge/Cloudflare_Workers-F38020?style=flat-square&logo=cloudflare)

## ✨ Fitur

- **Responsive Design** - Mobile-first approach dengan breakpoints optimal
- **Modern Animations** - Smooth transitions menggunakan Framer Motion
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- **Static Export** - Ready untuk deploy di Cloudflare Workers Assets
- **TypeScript** - Type-safe development
- **Modular Components** - Clean architecture dengan reusable components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

```bash
# Clone repository
cd my-app

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Development server akan berjalan di `http://localhost:3000`

## 📁 Struktur Project

```
my-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles & theme variables
│   │   ├── layout.tsx          # Root layout dengan fonts
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── sections/           # Page sections (Hero, Features, etc.)
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── PackageCards.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTA.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── StarRating.tsx
│   │       ├── Container.tsx
│   │       └── SectionHeader.tsx
│   ├── lib/
│   │   ├── utils.ts            # Utility functions
│   │   └── data.ts             # Static data (packages, testimonials)
│   └── types/
│       └── index.ts            # TypeScript types
├── dist/                       # Static build output
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── package.json
```

## 🎨 Design System

### Colors

| Name | Variable | Hex | Usage |
|------|----------|-----|-------|
| Brand Green Dark | `--brand-green-dark` | `#064e3b` | Primary text, headings |
| Brand Green Primary | `--brand-green-primary` | `#059669` | Buttons, links, accents |
| Brand Green Light | `--brand-green-light` | `#10b981` | Hover states, highlights |
| Accent Gold | `--accent-gold` | `#d4af37` | Premium badges, ratings |
| Background | `--background` | `#fafaf9` | Page background |
| Surface | `--surface` | `#ffffff` | Cards, containers |

### Typography

- **Headings**: Playfair Display (serif) - Elegant, premium feel
- **Body**: Inter (sans-serif) - High readability

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌐 Deployment ke Cloudflare Workers Builds

1. Push project ke GitHub.
2. Di Cloudflare Dashboard, pilih **Workers & Pages** → **Create** → **Import a repository**.
3. Pilih repo ini, lalu set:
   - **Build command**: `npm run build`
   - **Deploy command**: `npx wrangler deploy`
4. Simpan dan deploy.

Project ini sudah menyediakan `wrangler.jsonc`:
- Worker entry: `workers/index.js`
- Static assets directory: `dist`
- API routes: `/api/packages` dan `/api/admin/packages`

### Custom Domain

1. Setelah deploy, klik project → **Custom domains**

2. Klik **Set up a custom domain**

3. Masukkan domain: `ibadahku.id`

4. Ikuti instruksi untuk update DNS records

## 📱 Performance Optimization

- **LCP (Largest Contentful Paint)**: < 2.5 detik
- **Images**: Lazy loading dengan native browser API
- **Animations**: CSS transforms only (GPU accelerated)
- **Bundle Size**: Tree-shaking dengan Next.js
- **Static Export**: CDN-ready untuk global edge network

## 🔍 SEO Checklist

- ✅ Semantic HTML structure
- ✅ Meta description & keywords
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Semantic headings (H1, H2, H3)
- ✅ Alt text untuk images
- ✅ Schema.org ready (bisa ditambahkan)

## 🛠️ Development Commands

```bash
npm run dev       # Development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint check
```

## Dynamic Paket (Cloudflare D1 + Worker API)

Route yang sudah ditambahkan:

- `GET /api/packages` untuk halaman publik
- `POST /api/admin/packages` untuk tambah/update paket
- `DELETE /api/admin/packages?id=<package_id>` untuk hapus paket
- Halaman admin: `/admin/`

Setup singkat di Cloudflare Worker:

1. Buka project Worker → **Settings** → **Bindings**.
2. Tambahkan D1 binding dengan nama `DB` ke database `ibadahku`.
2. Jalankan schema D1 dari `cloudflare/d1/schema.sql`.
3. Deploy project (Worker akan serve static assets dari `dist` dan API dari `workers/index.js`).
4. Buka `/admin/`, lalu kelola paket. Halaman publik akan fetch otomatis dari `/api/packages`.

Contoh eksekusi schema D1 via Wrangler:

```bash
npx wrangler d1 execute <NAMA_DB> --remote --file=cloudflare/d1/schema.sql
```

## 📄 License

Proprietary - ibadahku.id

---

Dibuat dengan ❤️ untuk memudahkan perjalanan ibadah Anda.
