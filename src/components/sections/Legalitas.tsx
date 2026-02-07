"use client";

import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const legalitasKolomSatu = [
  {
    label: "Nomor Izin Berusaha (NIB)",
    value: "1204000211904",
  },
  {
    label: "Tanda Daftar Usaha Pariwisata",
    value: "82/14.11/31/75/-1.858.8/e/2017",
  },
  {
    label: "Izin Kementrian Agama Republik Indonesia",
    value: "SK No U.456 Tahun 2021",
  },
  {
    label: "Terakreditasi A oleh KAN, dengan nomor registrasi",
    value: "MSAC-PPIU-0041",
  },
  {
    label: "Anggota ASPHIRASI dengan No Keanggotaan",
    value: "013/ASPHIRASI/2023",
  },
  {
    label: "Tour Guide bersertifikat BNSP",
    value: "-",
  },
  {
    label: "Tour Leader bersertifikat BNSP",
    value: "-",
  },
  {
    label: "Pembimbing Ibadah bersertifikat KEMENAG",
    value: "-",
  },
];

const legalitasKolomDua = [
  {
    label: "Nomor Izin Berusaha (NIB)",
    value: "9120301701811",
  },
  {
    label: "Nomor Tanda Daftar Usaha Pariwisata (TDUP)",
    value: "1/Y.1.7/31.75.06.1001.10.012.C.1/3/-1.858.8/e/2020",
  },
  {
    label: "Izin Haji (PIHK) KEMENAG",
    value: "9120301701811",
  },
  {
    label: "Izin Umroh (PPIU) KEMENAG",
    value: "U.43 Tahun 2023",
  },
  {
    label: "Terakreditasi A KAN dengan nomor",
    value: "TiMS/BPW-04.20061",
  },
  {
    label: "Anggota ASPHIRASI",
    value: "13/ASPHIRASI/2023",
  },
  {
    label: "Pembimbing Ibadah bersertifikat KEMENAG",
    value: "-",
  },
  {
    label: "Tour Leader & Tour Guide bersertifikat BNSP",
    value: "-",
  },
];

function LegalCard({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: string }>;
}) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
      <h3 className="mb-5 font-serif text-2xl font-bold text-[var(--text-primary)]">{title}</h3>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className={`border-b border-[var(--border-light)] last:border-b-0 ${
              item.value === "-" ? "py-2" : "pb-3"
            }`}
          >
            {item.value === "-" ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[var(--brand-green-primary)]" />
                <p className="text-sm font-medium text-[var(--text-secondary)]">{item.label}</p>
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-[var(--text-secondary)]">{item.label}</p>
                <p className="mt-1 break-words text-base font-semibold text-[var(--brand-green-dark)]">{item.value}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Legalitas() {
  return (
    <motion.section
      id="legalitas"
      className="bg-[var(--surface-elevated)] py-20 lg:py-24"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Container>
        <SectionHeader
          badge="Perizinan & Sertifikasi"
          title="Perizinan & Sertifikasi Resmi"
          subtitle="Seluruh dokumen legal dan sertifikasi perusahaan tersedia untuk memastikan perjalanan ibadah Anda aman dan terpercaya."
          align="center"
          className="mb-12"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <LegalCard title="Data Perizinan" items={legalitasKolomSatu} />
          <LegalCard title="Data Sertifikasi" items={legalitasKolomDua} />
        </div>
      </Container>
    </motion.section>
  );
}
