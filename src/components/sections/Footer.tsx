"use client";

import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Youtube,
  ExternalLink
} from "lucide-react";
import Container from "@/components/ui/Container";
import { siteConfig, navItems } from "@/lib/data";
import { getCurrentYear } from "@/lib/utils";

/**
 * Footer Component
 * 
 * Site footer with navigation, contact info, and social links.
 * 
 * UX Decisions:
 * - Clear section grouping
 * - Accessible contact links
 * - Social media prominence
 * - Newsletter signup ready
 * - Copyright and legal links
 * 
 * @component
 */

// Social icon mapping
const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

export default function Footer() {
  const currentYear = getCurrentYear();

  return (
    <footer className="bg-[var(--brand-green-dark)] text-white">
      {/* Main Footer Content */}
      <div className="py-16 lg:py-20">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--brand-green-light)] to-[var(--brand-green-primary)] flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-lg">i</span>
                </div>
                <span className="font-serif font-bold text-xl">
                  ibadahku<span className="text-[var(--accent-gold)]">.id</span>
                </span>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Layanan perjalanan Umroh dan Haji terpercaya dengan pengalaman lebih dari 15 tahun. 
                Mewujudkan impian ibadah Anda ke Tanah Suci.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {siteConfig.social.map((social) => {
                  const Icon = socialIcons[social.platform as keyof typeof socialIcons] || ExternalLink;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--brand-green-primary)] transition-colors min-w-[44px] min-h-[44px]"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Menu Utama</h4>
              <ul className="space-y-3">
                {navItems.slice(0, 4).map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-white/70 hover:text-white transition-colors text-sm inline-flex items-center gap-1 group"
                    >
                      {item.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Layanan</h4>
              <ul className="space-y-3">
                {[
                  "Paket Umroh Reguler",
                  "Paket Umroh Plus",
                  "Paket Umroh VIP",
                  "Paket Haji Khusus",
                  "Paket Halal Tour",
                  "Manasik & Bimbingan",
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#packages"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Hubungi Kami</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Assalamualaikum%20saya%20mau%20tanya-tanya%20tentang%20paket%20perjalanan%20ke%20tanah%20suci`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-white/70 hover:text-white transition-colors"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--accent-gold)]" />
                    <span className="text-sm">{siteConfig.contact.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-start gap-3 text-white/70 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--accent-gold)]" />
                    <span className="text-sm">{siteConfig.contact.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-white/70">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-[var(--accent-gold)]" />
                  <span className="text-sm">{siteConfig.contact.address}</span>
                </li>
              </ul>

              {/* Business Hours */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm font-medium text-white mb-2">Jam Operasional</p>
                <p className="text-sm text-white/70">Senin - Sabtu: 08:00 - 17:00</p>
                <p className="text-sm text-white/70">Minggu: 09:00 - 15:00</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60 text-center md:text-left">
              {currentYear} ibadahku.id. Hak Cipta Dilindungi.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <Link href="#" className="hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/syarat-ketentuan" className="hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
