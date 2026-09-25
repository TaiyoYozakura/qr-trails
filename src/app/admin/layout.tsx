import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";

/**
 * The staff side of the site: its own chrome (no public header/footer) and kept
 * out of search engines. See `lib/admin.ts` for what the sign-in gate is — and
 * is not — able to protect.
 */
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · QR Trails Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <AdminShell>{children}</AdminShell>;
}
