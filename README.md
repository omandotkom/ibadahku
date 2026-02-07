# ibadahku.id

Website layanan Umroh dan Haji dengan desain Modern Minimalist Elegant.
Dibangun dengan Next.js + Tailwind CSS, optimized untuk deployment static di Cloudflare Pages.

![Tech Stack](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![Tech Stack](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![Tech Stack](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Deployment](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare)

## ✨ Fitur

- **Responsive Design** - Mobile-first approach dengan breakpoints optimal
- **Modern Animations** - Smooth transitions menggunakan Framer Motion
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- **Static Export** - Ready untuk deploy di Cloudflare Pages
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

## 🌐 Deployment ke Cloudflare Pages

### Cara 1: Drag & Drop (Paling Mudah)

1. Build project:
```bash
npm run build
```

2. Compress folder `dist` menjadi zip

3. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com)

4. Pergi ke **Pages** → **Create a project** → **Upload assets**

5. Drag & drop file `dist.zip` atau folder `dist`

6. Klik **Deploy site**

### Cara 2: Git Integration (Auto Deploy)

1. Push project ke GitHub/GitLab

2. Di Cloudflare Dashboard, pilih **Pages** → **Create a project** → **Connect to Git**

3. Pilih repository dan branch (biasanya `main` atau `master`)

4. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

5. Klik **Save and Deploy**

Setiap kali push ke branch, Cloudflare akan otomatis rebuild dan redeploy.

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

## Dynamic Paket (Cloudflare D1 + Functions)

Route yang sudah ditambahkan:

- `GET /api/packages` untuk halaman publik
- `POST /api/admin/packages` untuk tambah/update paket
- `DELETE /api/admin/packages?id=<package_id>` untuk hapus paket
- Halaman admin: `/admin/`

Setup singkat di Cloudflare Pages:

1. Buat binding D1 dengan nama `DB` pada project Pages.
2. Jalankan schema D1 dari `cloudflare/d1/schema.sql`.
3. Deploy project (folder `functions/` akan dipakai otomatis oleh Pages Functions).
4. Buka `/admin/`, lalu kelola paket. Halaman publik akan fetch otomatis dari `/api/packages`.

Contoh eksekusi schema D1 via Wrangler:

```bash
npx wrangler d1 execute <NAMA_DB> --remote --file=cloudflare/d1/schema.sql
```

## 📄 License

Proprietary - ibadahku.id

---

Dibuat dengan ❤️ untuk memudahkan perjalanan ibadah Anda.
