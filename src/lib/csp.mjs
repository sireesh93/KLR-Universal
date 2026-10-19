// Single source for the CSP directive list. Header (next.config.mjs) and meta
// fallback (layout.tsx) both import this so they cannot drift out of sync --
// a prior drift (header updated, meta copy not) is why Hostinger's edge kept
// enforcing a stale, more restrictive policy on real browsers despite the
// header looking correct in plain curl checks.
export const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://www.gstatic.com https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://www.google.com https://www.google.co.in https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com https://fonts.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "frame-src 'self' https://www.google.com https://translate.google.com https://www.googletagmanager.com",
  "connect-src 'self' https://translate.googleapis.com https://translate-pa.googleapis.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.google.com https://stats.g.doubleclick.net",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
];

// frame-ancestors is header-only -- browsers ignore it in a meta http-equiv
// CSP tag, so the meta copy must omit it (X-Frame-Options: SAMEORIGIN covers
// framing instead).
export function buildCsp({ forMeta = false } = {}) {
  return CSP_DIRECTIVES.filter((d) => !(forMeta && d.startsWith("frame-ancestors"))).join("; ");
}
