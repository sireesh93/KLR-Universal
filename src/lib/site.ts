/**
 * Canonical origin for this deployment.
 *
 * Canonical tags, the sitemap, robots.txt, Open Graph URLs and the JSON-LD
 * all derive from this one value. Set NEXT_PUBLIC_SITE_URL at cutover and
 * every one of them follows the real domain without a code change; leave it
 * unset and the production domain is used, so a missing variable can never
 * point canonicals at a staging host.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://klruniversal.com"
).replace(/\/+$/, "");

/**
 * The homepage, written the way every real <a href="/"> on the site actually
 * resolves: with a trailing slash. Resolving a relative "/" against an
 * origin always yields "origin/" (standard URL resolution), so that's the
 * form every nav link, logo link and breadcrumb uses in practice.
 *
 * A few JSON-LD fields referenced the bare SITE_URL (no slash) instead.
 * Semrush's crawler treats bare vs trailing-slash as two different URLs, so
 * those references were quietly splitting the homepage's internal-link
 * count across two page identities -- the real one (slash) looking healthy,
 * and a near-orphan bare-URL phantom alongside it. Use this constant
 * anywhere "the homepage" is meant as a URL value, never the bare SITE_URL.
 */
export const HOME_URL = `${SITE_URL}/`;
