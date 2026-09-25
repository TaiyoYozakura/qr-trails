"use client";

import { useSyncExternalStore } from "react";

/**
 * Admin session — a deliberately soft, device-local gate.
 *
 * The site is static and backend-free, so there is nothing that can verify an
 * administrator server-side. This keeps the admin views out of the visitor flow
 * (and out of search engines) — it is NOT security: the passcode ships in the
 * client bundle, so anyone determined can read it. Anything that must actually
 * be protected needs a server (upgrade plan §7).
 *
 * Set the real values with NEXT_PUBLIC_ADMIN_EMAIL / NEXT_PUBLIC_ADMIN_PASSCODE
 * before deploying; the fallbacks are for local development only.
 */
export const adminConfig = {
  email: process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "shravan.r.chaursiya@gmail.com",
  passcode: process.env.NEXT_PUBLIC_ADMIN_PASSCODE ?? "udyan-2026",
};

const SESSION_KEY = "qr-trails:admin-session";

export interface AdminSession {
  email: string;
  signedInAt: number;
}

function readSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AdminSession;
    return parsed?.email ? parsed : null;
  } catch {
    return null;
  }
}

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Cached so `getSnapshot` stays referentially stable between changes. */
let cached: AdminSession | null | undefined;

function getSnapshot(): AdminSession | null {
  const next = readSession();
  const same =
    (next === null && cached === null) ||
    (next !== null &&
      cached != null &&
      cached.email === next.email &&
      cached.signedInAt === next.signedInAt);
  if (!same) cached = next;
  return cached ?? null;
}

function getServerSnapshot(): AdminSession | null {
  return null;
}

export function isSignedIn(): boolean {
  return readSession() !== null;
}

export function signIn(passcode: string): { ok: boolean; error?: string } {
  if (passcode.trim() !== adminConfig.passcode) {
    return { ok: false, error: "That passcode does not match." };
  }
  try {
    window.localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ email: adminConfig.email, signedInAt: Date.now() }),
    );
  } catch {
    return { ok: false, error: "This browser is blocking local storage." };
  }
  cached = undefined;
  notify();
  return { ok: true };
}

export function signOut() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
  cached = undefined;
  notify();
}

export function useAdminSession(): AdminSession | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
