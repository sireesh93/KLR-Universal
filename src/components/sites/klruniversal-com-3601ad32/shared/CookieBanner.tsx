"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "klr-cookie-consent";

type Consent = "accepted" | "declined";

/** Read the visitor's stored choice. Analytics must be gated on this
 *  returning "accepted" — do not load trackers before checking. */
export function getCookieConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === null) setVisible(true);
  }, []);

  function choose(consent: Consent) {
    try {
      window.localStorage.setItem(STORAGE_KEY, consent);
    } catch {
      // Storage unavailable (private mode, blocked cookies) — respect the
      // choice for this page view and ask again next visit.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:p-5"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <p className="text-sm text-black/70">
          We&rsquo;d like to use analytics cookies to understand which pages are
          useful and how the site performs. The site works exactly the same if
          you decline. See our{" "}
          <Link href="/privacy-policy" className="text-klr-red hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium text-black/70 transition-colors hover:bg-black/5"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-full bg-klr-red px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-klr-red-dark"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
