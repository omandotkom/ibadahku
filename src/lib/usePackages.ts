"use client";

import { useEffect, useState } from "react";
import type { Package } from "@/types";
import { packages as defaultPackages } from "@/lib/data";
import { fetchPackagesFromApi } from "@/lib/packages-api";

export function usePackages() {
  const [packageList, setPackageList] = useState<Package[]>(defaultPackages);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPackages() {
      try {
        const remotePackages = await fetchPackagesFromApi();
        if (!cancelled && remotePackages.length > 0) {
          setPackageList(remotePackages);
        }
      } catch {
        // Keep static fallback data when API is unavailable.
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPackages();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    packageList,
    loading,
  };
}
