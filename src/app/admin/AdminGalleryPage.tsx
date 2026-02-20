"use client";

import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/utils";

/**
 * Type definitions for Gallery Item
 */
type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  type: "image" | "video";
  created_at?: string;
};

type GalleryForm = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  type: "image" | "video";
};

const CATEGORIES = ["Makkah", "Madinah", "Jamaah", "Video"];

function generateId(): string {
  const timestamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  const randomSuffix = Math.random().toString(36).slice(2, 8);
  return `gallery-${timestamp}-${randomSuffix}`;
}

function createNewForm(): GalleryForm {
  return {
    id: generateId(),
    src: "",
    alt: "",
    caption: "",
    category: "Jamaah",
    type: "image",
  };
}

export default function AdminGalleryPage() {
  const formCardRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState<GalleryForm>(createNewForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const isEditing = editingId !== null;

  useEffect(() => {
    void loadGallery();
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // Auto-detect type
    if (selectedFile.type.startsWith("video/")) {
      updateField("type", "video");
      updateField("category", "Video");
    } else {
      updateField("type", "image");
    }

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  async function loadGallery() {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/gallery");
      const json = await res.json();
      if (res.ok && Array.isArray(json.data)) {
        setItems(json.data);
      } else {
        setMessage(json.error || "Gagal memuat galeri.");
      }
    } catch (error) {
      setMessage("Error loading gallery: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSyncing(false);
    }
  }

  function updateField<K extends keyof GalleryForm>(field: K, value: GalleryForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSelect(item: GalleryItem) {
    setEditingId(item.id);
    setForm({
      id: item.id,
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      category: item.category,
      type: item.type as "image" | "video",
    });
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setMessage("");
    formCardRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleReset() {
    setEditingId(null);
    setForm(createNewForm());
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setMessage("Form reset.");
  }

  async function uploadImageToR2(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    });

    const payload = await response.json();
    if (!response.ok || !payload?.url) {
      throw new Error(payload?.error ?? "Upload failed");
    }
    return payload.url;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSyncing(true);
    setMessage("Menyimpan...");

    try {
      let finalSrc = form.src;

      if (selectedFile) {
        finalSrc = await uploadImageToR2(selectedFile);
      }

      const payload = {
        item: {
          ...form,
          src: finalSrc,
        },
      };

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Gagal menyimpan.");

      await loadGallery();
      handleReset();
      setMessage("Berhasil disimpan!");
    } catch (error) {
      setMessage("Error: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSyncing(false);
    }
  }

  async function handleDelete() {
    if (!editingId) return;
    if (!confirm("Hapus item ini?")) return;

    setIsSyncing(true);
    try {
      const res = await fetch(`/api/admin/gallery?id=${editingId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus.");

      await loadGallery();
      handleReset();
      setMessage("Item dihapus.");
    } catch (error) {
      setMessage("Error: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsSyncing(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[var(--text-primary)]">Daftar Galeri ({items.length})</h2>
          <button
            onClick={loadGallery}
            className="text-xs px-2 py-1 border rounded hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className={`cursor-pointer border rounded-lg overflow-hidden relative group ${
                editingId === item.id ? "ring-2 ring-[var(--brand-green-primary)]" : "hover:border-[var(--brand-green-primary)]"
              }`}
            >
              <div className="aspect-square bg-gray-100 relative">
                 {item.type === "video" ? (
                    <video src={item.src} className="w-full h-full object-cover" />
                 ) : (
                    <img src={item.src} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
                 )}
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-2 bg-white text-xs truncate">
                <span className="font-medium block truncate">{item.caption}</span>
                <span className="text-[var(--text-muted)]">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        ref={formCardRef}
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[var(--text-primary)]">
              {isEditing ? "Edit Item" : "Tambah Item Baru"}
            </h2>
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="text-red-600 text-xs font-medium hover:underline"
              >
                Hapus Item
              </button>
            )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
           <div className="space-y-1">
             <label className="text-sm font-medium">Upload File</label>
             <input
               ref={fileInputRef}
               type="file"
               accept="image/*,video/*"
               onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
               className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-[var(--brand-green-pale)] file:text-[var(--brand-green-dark)]
                hover:file:bg-[var(--brand-green-lighter)]
              "
             />
             <p className="text-xs text-[var(--text-muted)]">Otomatis upload ke R2 saat disimpan.</p>
           </div>

           {(previewUrl || form.src) && (
             <div className="row-span-3">
               <p className="text-sm font-medium mb-1">Preview</p>
               <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                  {form.type === "video" || (selectedFile?.type.startsWith("video")) ? (
                    <video src={previewUrl || form.src} controls className="w-full h-full object-contain" />
                  ) : (
                    <img src={previewUrl || form.src} alt="Preview" className="w-full h-full object-contain" />
                  )}
               </div>
             </div>
           )}

           <div className="space-y-1">
             <label className="text-sm font-medium">Caption</label>
             <input
               type="text"
               required
               value={form.caption}
               onChange={(e) => updateField("caption", e.target.value)}
               className="w-full border rounded-lg px-3 py-2 text-sm"
               placeholder="Contoh: Jamaah di Masjidil Haram"
             />
           </div>

           <div className="space-y-1">
             <label className="text-sm font-medium">Alt Text</label>
             <input
               type="text"
               required
               value={form.alt}
               onChange={(e) => updateField("alt", e.target.value)}
               className="w-full border rounded-lg px-3 py-2 text-sm"
               placeholder="Deskripsi singkat untuk SEO"
             />
           </div>

           <div className="space-y-1">
             <label className="text-sm font-medium">Kategori</label>
             <select
               value={form.category}
               onChange={(e) => updateField("category", e.target.value)}
               className="w-full border rounded-lg px-3 py-2 text-sm"
             >
               {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
             </select>
           </div>

           <div className="space-y-1">
             <label className="text-sm font-medium">Tipe</label>
             <select
               value={form.type}
               onChange={(e) => updateField("type", e.target.value as "image" | "video")}
               className="w-full border rounded-lg px-3 py-2 text-sm"
             >
               <option value="image">Image</option>
               <option value="video">Video</option>
             </select>
           </div>
        </div>

        <div className="pt-4 flex items-center gap-3 border-t">
           <button
             type="submit"
             disabled={isSyncing}
             className="bg-[var(--brand-green-primary)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--brand-green-dark)] disabled:opacity-50"
           >
             {isSyncing ? "Menyimpan..." : "Simpan Gallery"}
           </button>
           <button
             type="button"
             onClick={handleReset}
             className="border px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
           >
             Batal / Reset
           </button>
           {message && <span className="text-sm text-[var(--text-secondary)]">{message}</span>}
        </div>

      </form>
    </div>
  );
}
