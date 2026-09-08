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
