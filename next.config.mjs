// Plain JS, not TypeScript, on purpose. Hostinger's build image ships a glibc
// older than 2.29, so Next 16's native SWC binary cannot load and Next falls
// back to the WASM compiler. WASM initialises too late to transpile a
// TypeScript config, so a next.config.ts fails the build there outright.

// 'unsafe-inline' is required for scripts because Next.js inlines its
// hydration bootstrap, and for styles because Next/Tailwind inline critical
// CSS. frame-src allows only the Google Maps embed on Contact & Support.
import { LEGACY_REDIRECTS } from "./src/lib/legacy-redirects.mjs";

// Google Tag Manager needs four of these directives, not just script-src: the
// container script, the tracking pixels and beacons the tags it loads fire,
// and the noscript iframe. Miss any one and the tag fails silently in the
// browser with only a console violation to show for it. Note that GTM can be
// configured to load further third-party tags at any time without a deploy --
// if a tag stops reporting, check the console for a CSP violation first and
// add that origin here and in the layout's meta copy.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://www.gstatic.com https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://www.google.com https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com https://fonts.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "frame-src 'self' https://www.google.com https://translate.google.com https://www.googletagmanager.com",
  "connect-src 'self' https://translate.googleapis.com https://translate-pa.googleapis.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

/** @type {import("next").NextConfig} */
const nextConfig = {
  // Stops the response advertising the framework and its presence to scanners.
  poweredByHeader: false,

  // Next serves the site under both hostnames, so www duplicated every page.
  // Canonicals already pointed at the bare domain; this makes it a real 301.
  // Plus 301s for the previous site's URLs, which 404 after the migration.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.klruniversal.com" }],
        destination: "https://klruniversal.com/:path*",
        permanent: true,
      },
      // Rigs live at /drilling-rigs/<category>/<slug> but the category level
      // of that path had no page, so every /drilling-rigs/<category> 404'd.
      // Categories are served from /product-category/<category>.
      {
        source: "/drilling-rigs/:category",
        destination: "/product-category/:category",
        permanent: true,
      },
      // The category route used to be /product_category (underscore).
      // Semrush flagged the underscore as a warning -- Google treats it as a
      // word joiner rather than a separator, hyphens are the documented
      // preference. These URLs were already live and indexed, so this
      // preserves whatever ranking/link equity they held rather than just
      // letting them 404.
      {
        source: "/product_category/:category",
        destination: "/product-category/:category",
        permanent: true,
      },
      // The conventional feed path, pointing at the real feed.
      { source: "/blog/feed", destination: "/rss.xml", permanent: true },
      ...LEGACY_REDIRECTS.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
          // LiteSpeed does not send HSTS on its own, so without this the first
          // HTTP request of a session is downgrade-attackable before the 301
          // fires. Two years, subdomains included, preload-eligible.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Points crawlers and agents at the machine-readable layer from any page.
          {
            key: "Link",
            value:
              '</llms.txt>; rel="describedby"; type="text/plain", </rss.xml>; rel="alternate"; type="application/rss+xml"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
