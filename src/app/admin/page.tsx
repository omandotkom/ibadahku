import type { Metadata } from "next";
import AdminPackagesPage from "./AdminPackagesPage";

export const metadata: Metadata = {
  title: "Admin Paket",
  description: "Kelola data paket umroh untuk website ibadahku.id",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminPackagesPage />;
}
