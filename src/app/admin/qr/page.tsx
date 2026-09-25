"use client";

import { QrPrintPage } from "@/components/qr-print-page";

/**
 * Staff-only: the printable QR sheet. Moved here from the public `/qr` route —
 * the old path is gone, and the public footer no longer advertises it.
 */
export default function AdminQrPage() {
  return <QrPrintPage />;
}
