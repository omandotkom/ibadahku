"use client";

import { useState } from "react";
import AdminPackagesPage from "./AdminPackagesPage";
import AdminGalleryPage from "./AdminGalleryPage";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"packages" | "gallery">("packages");

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--brand-green-primary)]">
              Admin Panel
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold text-[var(--text-primary)]">
              {activeTab === "packages" ? "Kelola Paket Umroh" : "Kelola Galeri Foto & Video"}
            </h1>
          </div>

          <nav className="flex space-x-1 rounded-xl bg-[var(--surface-elevated)] p-1">
            <button
              onClick={() => setActiveTab("packages")}
              className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[var(--brand-green-primary)] ring-white ring-opacity-60 ring-offset-2 ring-offset-[var(--brand-green-light)] focus:outline-none focus:ring-2 px-4 transition-all ${
                activeTab === "packages"
                  ? "bg-white shadow"
                  : "text-[var(--text-secondary)] hover:bg-white/[0.12] hover:text-white"
              }`}
            >
              Paket Umroh
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[var(--brand-green-primary)] ring-white ring-opacity-60 ring-offset-2 ring-offset-[var(--brand-green-light)] focus:outline-none focus:ring-2 px-4 transition-all ${
                activeTab === "gallery"
                  ? "bg-white shadow"
                  : "text-[var(--text-secondary)] hover:bg-white/[0.12] hover:text-white"
              }`}
            >
              Galeri
            </button>
          </nav>
        </header>

        {activeTab === "packages" ? <AdminPackagesPage /> : <AdminGalleryPage />}
      </div>
    </main>
  );
}
