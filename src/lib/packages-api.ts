import type { Package } from "@/types";

function isPackage(value: unknown): value is Package {
  if (!value || typeof value !== "object") {
    return false;
  }

  const pkg = value as Package;
  return (
    typeof pkg.id === "string" &&
    typeof pkg.name === "string" &&
    typeof pkg.description === "string" &&
    typeof pkg.price === "number" &&
    typeof pkg.duration === "number" &&
    typeof pkg.hotelStars === "number" &&
    typeof pkg.airline === "string" &&
    typeof pkg.departureDate === "string" &&
    Array.isArray(pkg.features)
  );
}

function parsePayload(payload: unknown): Package[] {
  if (Array.isArray(payload)) {
    return payload.filter(isPackage);
  }

  if (payload && typeof payload === "object") {
    const data = (payload as { data?: unknown }).data;
    if (Array.isArray(data)) {
      return data.filter(isPackage);
    }
  }

  return [];
}

export async function fetchPackagesFromApi(): Promise<Package[]> {
  const response = await fetch("/api/packages", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GET /api/packages gagal (${response.status})`);
  }

  const payload: unknown = await response.json();
  return parsePayload(payload);
}
