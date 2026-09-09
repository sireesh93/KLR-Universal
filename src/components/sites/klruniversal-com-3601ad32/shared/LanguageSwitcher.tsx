"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";

/**
 * Language selector on the header globe.
 *
 * This is machine translation via Google's translate element: it rewrites the
 * page in the browser, so it is instant and costs nothing, but search engines
 * only ever see the English page. Real translated routes (/pt/..., indexed
 * separately) are the follow-up; this switcher is written so that swapping the
 * mechanism underneath it does not change the UI.
 *
 * Languages chosen for the markets KLR actually ships to: Portuguese reaches
 * Brazil plus Angola and Mozambique, Spanish the rest of Latin America, French
 * west and central Africa, Arabic the north.
 */
const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
] as const;

const COOKIE = "googtrans";

function readCurrent() {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  if (!match) return "en";
  // Cookie format is /en/<target>.
  const target = decodeURIComponent(match[1]).split("/")[2];
  return LANGUAGES.some((l) => l.code === target) ? target : "en";
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("en");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => setCurrent(readCurrent()), []);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(code: string) {
    setOpen(false);
    if (code === current) return;

    // The translate element reads this cookie on load. Setting it on the bare
    // host as well as the dotted form covers both how the widget writes it.
    const value = code === "en" ? "/en/en" : `/en/${code}`;
    const host = window.location.hostname;
    document.cookie = `${COOKIE}=${value};path=/`;
    document.cookie = `${COOKIE}=${value};path=/;domain=${host}`;
    document.cookie = `${COOKIE}=${value};path=/;domain=.${host}`;

    // Reload so the widget re-renders the whole document in the new language.
    // Switching the hidden <select> only repaints part of the tree.
    window.location.reload();
  }

  const currentLabel =
    LANGUAGES.find((l) => l.code === current)?.label ?? "English";

  return (
    <div className="notranslate relative" ref={boxRef}>
      <button
        type="button"
        aria-label={`Language: ${currentLabel}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        translate="no"
        onClick={() => setOpen((v) => !v)}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-klr-red text-white"
      >
        <Globe className="size-4" aria-hidden="true" />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-11 z-50 w-44 overflow-hidden rounded-lg border border-black/10 bg-white py-1 shadow-xl"
        >
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                role="option"
                aria-selected={lang.code === current}
                onClick={() => choose(lang.code)}
                lang={lang.code}
                className="flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-sm text-black hover:bg-klr-offwhite hover:text-klr-red"
              >
                <span>{lang.label}</span>
                {lang.code === current && (
                  <Check className="size-4 text-klr-red" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
