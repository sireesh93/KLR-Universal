// Plain JS, not TypeScript, on purpose. Hostinger's build image ships a glibc
// older than 2.29, so Next 16's native SWC binary cannot load and Next falls
// back to the WASM compiler. WASM initialises too late to transpile a
// TypeScript config, so a next.config.ts fails the build there outright.

// 'unsafe-inline' is required for scripts because Next.js inlines its
// hydration bootstrap, and for styles because Next/Tailwind inline critical
// CSS. frame-src allows only the Google Maps embed on Contact & Support.
import { LEGACY_REDIRECTS } from "./src/lib/legacy-redirects.mjs";

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://www.gstatic.com https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://www.google.com https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com https://fonts.gstatic.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "frame-src 'self' https://www.google.com https://translate.google.com",
  "connect-src 'self' https://translate.googleapis.com https://translate-pa.googleapis.com",
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
          // Hostinger's LiteSpeed does not send HSTS the way Vercel did, so the
          // first HTTP request of a session is downgrade-attackable before the
          // 301 fires. Two years, subdomains included, preload-eligible.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
