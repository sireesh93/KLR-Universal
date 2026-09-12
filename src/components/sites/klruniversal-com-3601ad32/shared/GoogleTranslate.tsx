"use client";

import Script from "next/script";

/**
 * Loads Google's translate element once, hidden.
 *
 * The visible control is LanguageSwitcher; this only mounts the engine and the
 * container it insists on writing into. autoDisplay is off so nothing appears
 * until a language is actually chosen.
 */
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: { translate?: { TranslateElement?: new (o: object, el: string) => void } };
  }
}

export function GoogleTranslate() {
  return (
    <>
      <div id="google_translate_element" aria-hidden="true" />
      <Script id="gt-init" strategy="lazyOnload">
        {`window.googleTranslateElementInit = function () {
            if (!window.google || !window.google.translate) return;
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages: "en,pt,es,fr,ar",
                autoDisplay: false
              },
              "google_translate_element"
            );
          };`}
      </Script>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
    </>
  );
}
