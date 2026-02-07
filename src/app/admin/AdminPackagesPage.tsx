"use client";

import { useEffect, useState } from "react";
import type { Package } from "@/types";
import { packages as defaultPackages } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { fetchPackagesFromApi } from "@/lib/packages-api";

const STORAGE_KEY = "ibadahku-admin-packages";

type PackageForm = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  hotelStars: "3" | "4" | "5";
  airline: string;
  departureDate: string;
  quota: string;
  availableQuota: string;
  featuresText: string;
  isPopular: boolean;
  isRecommended: boolean;
  image: string;
};

type InitialState = {
  list: Package[];
  selectedId: string | null;
  form: PackageForm;
};

function toForm(pkg?: Package): PackageForm {
  return {
    id: pkg?.id ?? "",
    name: pkg?.name ?? "",
    description: pkg?.description ?? "",
    price: pkg ? String(pkg.price) : "",
    duration: pkg ? String(pkg.duration) : "",
    hotelStars: pkg ? (String(pkg.hotelStars) as "3" | "4" | "5") : "3",
    airline: pkg?.airline ?? "",
    departureDate: pkg?.departureDate ?? "",
    quota: pkg ? String(pkg.quota) : "",
    availableQuota: pkg ? String(pkg.availableQuota) : "",
    featuresText: pkg?.features.join("\n") ?? "",
    isPopular: pkg?.isPopular ?? false,
    isRecommended: pkg?.isRecommended ?? false,
    image: pkg?.image ?? "",
  };
}

function toPackage(form: PackageForm): Package {
  const features = form.featuresText
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    id: form.id.trim(),
    name: form.name.trim(),
    description: form.description.trim(),
    price: Number(form.price),
    duration: Number(form.duration),
    hotelStars: Number(form.hotelStars) as 3 | 4 | 5,
    airline: form.airline.trim(),
    departureDate: form.departureDate,
    quota: Number(form.quota),
    availableQuota: Number(form.availableQuota),
    features,
    isPopular: form.isPopular,
    isRecommended: form.isRecommended,
    image: form.image.trim() || undefined,
  };
}

function isValidPackage(pkg: Package): boolean {
  if (!pkg.id || !pkg.name || !pkg.description || !pkg.airline || !pkg.departureDate) {
    return false;
  }

  const validNumberFields = [pkg.price, pkg.duration, pkg.quota, pkg.availableQuota];
  const hasInvalidNumber = validNumberFields.some((value) => Number.isNaN(value) || value < 0);

  if (hasInvalidNumber || pkg.availableQuota > pkg.quota) {
    return false;
  }

  if (![3, 4, 5].includes(pkg.hotelStars) || pkg.features.length === 0) {
    return false;
  }

  return true;
}

function getInitialState(): InitialState {
  if (typeof window === "undefined") {
    const first = defaultPackages[0];
    return {
      list: defaultPackages,
      selectedId: first?.id ?? null,
      form: toForm(first),
    };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Package[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        return {
          list: parsed,
          selectedId: parsed[0].id,
          form: toForm(parsed[0]),
        };
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  const first = defaultPackages[0];
  return {
    list: defaultPackages,
    selectedId: first?.id ?? null,
    form: toForm(first),
  };
}

function normalizeApiError(message: string): string {
  if (message.includes("404")) {
    return "API belum aktif di environment ini. Deploy Worker terbaru untuk sinkron server.";
  }

  return message;
}

export default function AdminPackagesPage() {
  const [initial] = useState<InitialState>(() => getInitialState());
  const [packageList, setPackageList] = useState<Package[]>(initial.list);
  const [form, setForm] = useState<PackageForm>(initial.form);
  const [editingId, setEditingId] = useState<string | null>(initial.selectedId);
  const [message, setMessage] = useState<string>("");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const isEditing = editingId !== null && packageList.some((item) => item.id === editingId);

  function persist(nextList: Package[]) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList));
    }
  }

  function applyList(nextList: Package[]) {
    setPackageList(nextList);
    persist(nextList);

    if (nextList.length === 0) {
      setEditingId(null);
      setForm(toForm());
      return;
    }

    const current = nextList.find((item) => item.id === editingId) ?? nextList[0];
    setEditingId(current.id);
    setForm(toForm(current));
  }

  async function loadFromServer(showSuccessMessage = false) {
    setIsSyncing(true);
    try {
      const remotePackages = await fetchPackagesFromApi();
      if (remotePackages.length > 0) {
        applyList(remotePackages);
        if (showSuccessMessage) {
          setMessage("Data paket berhasil dimuat dari server.");
        }
      } else if (showSuccessMessage) {
        setMessage("Data server kosong.");
      }
    } catch (error) {
      if (showSuccessMessage) {
        const detail = error instanceof Error ? error.message : "Unknown error";
        setMessage(normalizeApiError(detail));
      }
    } finally {
      setIsSyncing(false);
    }
  }

  useEffect(() => {
    void loadFromServer(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateField<K extends keyof PackageForm>(field: K, value: PackageForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSelectPackage(pkg: Package) {
    setEditingId(pkg.id);
    setForm(toForm(pkg));
    setMessage("");
  }

  function handleNewPackage() {
    setEditingId(null);
    setForm(toForm());
    setSelectedImageFile(null);
    setMessage("Mode tambah paket baru aktif.");
  }

  function validateForm(pkg: Package): string | null {
    if (!isValidPackage(pkg)) {
      return "Data belum valid. Cek field wajib, angka, kuota, dan fitur paket.";
    }

    const duplicateId = packageList.some((item) => item.id === pkg.id && item.id !== editingId);
    if (duplicateId) {
      return "ID paket sudah dipakai. Gunakan ID yang unik.";
    }

    return null;
  }

  async function upsertServerPackage(pkg: Package, previousId: string | null) {
    const response = await fetch("/api/admin/packages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        package: pkg,
        previousId,
      }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      throw new Error(payload?.error ?? `POST /api/admin/packages gagal (${response.status})`);
    }
  }

  async function handleUploadImage() {
    const fileToUpload = selectedImageFile;
    if (!fileToUpload) {
      setMessage("Pilih file gambar terlebih dahulu.");
      return;
    }

    setIsUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);

      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as
        | { url?: string; error?: string }
        | null;

      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error ?? `POST /api/admin/upload-image gagal (${response.status})`);
      }

      updateField("image", payload.url);
      setSelectedImageFile(null);
      setMessage("Gambar berhasil diupload ke R2.");
    } catch (uploadError) {
      const detail = uploadError instanceof Error ? uploadError.message : "Unknown error";
      setMessage(`Upload gambar gagal. Detail: ${normalizeApiError(detail)}`);
    } finally {
      setIsUploadingImage(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedPackage = toPackage(form);
    const error = validateForm(normalizedPackage);
    if (error) {
      setMessage(error);
      return;
    }

    setIsSyncing(true);

    try {
      await upsertServerPackage(normalizedPackage, isEditing ? editingId : null);
      await loadFromServer(false);
      setMessage(isEditing ? "Paket berhasil diperbarui di server." : "Paket baru berhasil ditambahkan ke server.");
    } catch (saveError) {
      const detail = saveError instanceof Error ? saveError.message : "Unknown error";
      const nextList = isEditing && editingId
        ? packageList.map((item) => (item.id === editingId ? normalizedPackage : item))
        : [normalizedPackage, ...packageList];
      setPackageList(nextList);
      persist(nextList);
      setEditingId(normalizedPackage.id);
      setMessage(`Gagal sinkron server. Tersimpan lokal. Detail: ${normalizeApiError(detail)}`);
    } finally {
      setIsSyncing(false);
    }
  }

  async function handleDeleteCurrent() {
    if (!editingId) {
      setMessage("Pilih paket yang ingin dihapus.");
      return;
    }

    const target = packageList.find((item) => item.id === editingId);
    if (!target) {
      return;
    }

    const confirmed = window.confirm(`Hapus paket ${target.name}?`);
    if (!confirmed) {
      return;
    }

    setIsSyncing(true);

    try {
      const response = await fetch(`/api/admin/packages?id=${encodeURIComponent(editingId)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? `DELETE /api/admin/packages gagal (${response.status})`);
      }

      await loadFromServer(false);
      setMessage("Paket berhasil dihapus dari server.");
    } catch (deleteError) {
      const detail = deleteError instanceof Error ? deleteError.message : "Unknown error";
      const nextList = packageList.filter((item) => item.id !== editingId);
      applyList(nextList);
      setMessage(`Gagal hapus di server. Data lokal diperbarui. Detail: ${normalizeApiError(detail)}`);
    } finally {
      setIsSyncing(false);
    }
  }

  function handleResetToDefault() {
    const confirmed = window.confirm("Kembalikan ke data paket default awal (lokal)?");
    if (!confirmed) {
      return;
    }

    const nextList = [...defaultPackages];
    applyList(nextList);
    setMessage("Data lokal dikembalikan ke default. Gunakan simpan per item untuk kirim ke server.");
  }

  async function handleCopyJson() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(packageList, null, 2));
      setMessage("JSON paket berhasil disalin.");
    } catch {
      setMessage("Gagal menyalin JSON. Browser memblokir akses clipboard.");
    }
  }

  function handleDownloadJson() {
    const blob = new Blob([JSON.stringify(packageList, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "packages.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setMessage("File packages.json berhasil diunduh.");
  }

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm text-[var(--text-primary)]";

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--brand-green-primary)]">
            Admin
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-[var(--text-primary)]">
            Kelola Paket Umroh
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Form tersambung ke `/api/admin/packages` (Cloudflare Worker + D1).
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-semibold text-[var(--text-primary)]">Daftar Paket</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => void loadFromServer(true)}
                  disabled={isSyncing}
                  className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-primary)] disabled:opacity-50"
                >
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={handleNewPackage}
                  className="rounded-lg bg-[var(--brand-green-primary)] px-3 py-2 text-xs font-medium text-white"
                >
                  Tambah
                </button>
              </div>
            </div>

            <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-1">
              {packageList.map((pkg) => {
                const active = pkg.id === editingId;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      active
                        ? "border-[var(--brand-green-primary)] bg-[var(--brand-green-pale)]"
                        : "border-[var(--border)] hover:border-[var(--brand-green-light)]"
                    }`}
                  >
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{pkg.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{pkg.id}</p>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {formatPrice(pkg.price)} | Sisa {pkg.availableQuota}/{pkg.quota}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopyJson}
                className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-primary)]"
              >
                Copy JSON
              </button>
              <button
                type="button"
                onClick={handleDownloadJson}
                className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-primary)]"
              >
                Download JSON
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetToDefault}
              className="w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
            >
              Reset Lokal ke Default
            </button>
          </div>

          <form
            onSubmit={(event) => void handleSubmit(event)}
            className="space-y-4 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-semibold text-[var(--text-primary)]">
                {isEditing ? "Edit Paket" : "Paket Baru"}
              </h2>
              <button
                type="button"
                onClick={() => void handleDeleteCurrent()}
                disabled={isSyncing}
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700 disabled:opacity-50"
              >
                Hapus Paket
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-[var(--text-secondary)]">ID Paket</span>
                <input
                  className={inputClass}
                  value={form.id}
                  onChange={(e) => updateField("id", e.target.value)}
                  required
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="text-[var(--text-secondary)]">Nama Paket</span>
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                />
              </label>

              <label className="space-y-1 text-sm md:col-span-2">
                <span className="text-[var(--text-secondary)]">Deskripsi</span>
                <textarea
                  className={inputClass}
                  rows={3}
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  required
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="text-[var(--text-secondary)]">Harga (IDR)</span>
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  value={form.price}
                  onChange={(e) => updateField("price", e.target.value)}
                  required
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="text-[var(--text-secondary)]">Durasi (hari)</span>
                <input
                  type="number"
                  min={1}
                  className={inputClass}
                  value={form.duration}
                  onChange={(e) => updateField("duration", e.target.value)}
                  required
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="text-[var(--text-secondary)]">Hotel Stars</span>
                <select
                  className={inputClass}
                  value={form.hotelStars}
                  onChange={(e) => updateField("hotelStars", e.target.value as "3" | "4" | "5")}
                >
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </label>

              <label className="space-y-1 text-sm">
                <span className="text-[var(--text-secondary)]">Maskapai</span>
                <input
                  className={inputClass}
                  value={form.airline}
                  onChange={(e) => updateField("airline", e.target.value)}
                  required
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="text-[var(--text-secondary)]">Tanggal Berangkat</span>
                <input
                  type="date"
                  className={inputClass}
                  value={form.departureDate}
                  onChange={(e) => updateField("departureDate", e.target.value)}
                  required
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="text-[var(--text-secondary)]">Kuota Total</span>
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  value={form.quota}
                  onChange={(e) => updateField("quota", e.target.value)}
                  required
                />
              </label>

              <label className="space-y-1 text-sm">
                <span className="text-[var(--text-secondary)]">Kuota Tersedia</span>
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  value={form.availableQuota}
                  onChange={(e) => updateField("availableQuota", e.target.value)}
                  required
                />
              </label>

              <label className="space-y-1 text-sm md:col-span-2">
                <span className="text-[var(--text-secondary)]">Image Path (opsional)</span>
                <input
                  className={inputClass}
                  value={form.image}
                  onChange={(e) => updateField("image", e.target.value)}
                />
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => {
                      const nextFile = e.target.files?.[0] ?? null;
                      setSelectedImageFile(nextFile);
                      if (nextFile) {
                        void (async () => {
                          setIsUploadingImage(true);
                          try {
                            const formData = new FormData();
                            formData.append("file", nextFile);

                            const response = await fetch("/api/admin/upload-image", {
                              method: "POST",
                              body: formData,
                            });

                            const payload = (await response.json().catch(() => null)) as
                              | { url?: string; error?: string }
                              | null;

                            if (!response.ok || !payload?.url) {
                              throw new Error(
                                payload?.error ??
                                  `POST /api/admin/upload-image gagal (${response.status})`,
                              );
                            }

                            updateField("image", payload.url);
                            setSelectedImageFile(null);
                            setMessage("Gambar berhasil diupload ke R2.");
                          } catch (uploadError) {
                            const detail =
                              uploadError instanceof Error ? uploadError.message : "Unknown error";
                            setMessage(`Upload gambar gagal. Detail: ${normalizeApiError(detail)}`);
                          } finally {
                            setIsUploadingImage(false);
                          }
                        })();
                      }
                    }}
                    className="max-w-full text-xs text-[var(--text-secondary)]"
                  />
                  <button
                    type="button"
                    onClick={() => void handleUploadImage()}
                    disabled={!selectedImageFile || isUploadingImage}
                    className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-primary)] disabled:opacity-50"
                  >
                    {isUploadingImage ? "Uploading..." : "Upload ke R2"}
                  </button>
                </div>
                {form.image && (
                  <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] p-2">
                    <p className="mb-2 text-xs text-[var(--text-secondary)]">Preview thumbnail:</p>
                    <img
                      src={form.image}
                      alt="Preview gambar paket"
                      className="h-28 w-28 rounded-lg object-cover"
                    />
                  </div>
                )}
              </label>

              <label className="space-y-1 text-sm md:col-span-2">
                <span className="text-[var(--text-secondary)]">Features (1 baris = 1 fitur)</span>
                <textarea
                  className={inputClass}
                  rows={6}
                  value={form.featuresText}
                  onChange={(e) => updateField("featuresText", e.target.value)}
                  required
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <label className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <input
                  type="checkbox"
                  checked={form.isPopular}
                  onChange={(e) => updateField("isPopular", e.target.checked)}
                />
                Popular
              </label>

              <label className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <input
                  type="checkbox"
                  checked={form.isRecommended}
                  onChange={(e) => updateField("isRecommended", e.target.checked)}
                />
                Recommended
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={isSyncing}
                className="rounded-lg bg-[var(--brand-green-primary)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {isEditing ? "Simpan Perubahan" : "Tambah Paket"}
              </button>
              <button
                type="button"
                onClick={() => setForm(toForm())}
                className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-primary)]"
              >
                Kosongkan Form
              </button>
              <span className="text-sm text-[var(--text-secondary)]">
                Total paket: {packageList.length}
              </span>
              {isSyncing && <span className="text-sm text-[var(--text-secondary)]">Sinkronisasi...</span>}
            </div>

            {message && (
              <p className="rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-sm text-[var(--text-secondary)]">
                {message}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
