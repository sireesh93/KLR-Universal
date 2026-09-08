/**
 * Locale configuration.
 *
 * English is the source language and lives at the site root, so every URL
 * already indexed (/about-us, /product_category/water-well, ...) keeps its
 * address and its rankings. Translations live under a prefix: /es/about-us.
 *
 * `ready` is the safety gate. A locale is only routed, linked, listed in the
 * sitemap and advertised in hreflang once its dictionary is actually
 * translated and signed off. Until then it generates no pages at all, so the
 * site can never ship a Spanish URL serving English text -- that is duplicate
 * content, and Google's scaled-content-abuse policy treats a pile of thin
 * machine-filled locale pages as spam.
 *
 * To launch a language: translate its dictionary, review it, flip `ready`.
 * No other code change is needed.
 */
export type Locale = "en" | "es" | "pt" | "fr";

export type LocaleConfig = {
  code: Locale;
  /** Written in the language itself, the way a native speaker expects. */
  label: string;
  /** BCP 47 tag for <html lang> and hreflang. */
  hrefLang: string;
  ready: boolean;
};

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALES: LocaleConfig[] = [
  { code: "en", label: "English", hrefLang: "en", ready: true },
  // Portuguese is the efficient second language: it reaches Brazil and
  // Angola/Mozambique, so one translation covers both target regions.
  { code: "pt", label: "Português", hrefLang: "pt", ready: false },
  { code: "es", label: "Español", hrefLang: "es", ready: false },
  { code: "fr", label: "Français", hrefLang: "fr", ready: false },
];

/** Locales that are live. Everything routable derives from this. */
export const readyLocales = () => LOCALES.filter((l) => l.ready);

/** Locales that get their own URL prefix (everything except the default). */
export const prefixedLocales = () =>
  readyLocales().filter((l) => l.code !== DEFAULT_LOCALE);

export const isLocale = (value: string): value is Locale =>
  LOCALES.some((l) => l.code === value);

export const localeConfig = (code: Locale) =>
  LOCALES.find((l) => l.code === code) ?? LOCALES[0];

/** Path for a route in a given locale. English keeps the bare path. */
export function localePath(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === DEFAULT_LOCALE ? clean : `/${locale}${clean === "/" ? "" : clean}`;
}
