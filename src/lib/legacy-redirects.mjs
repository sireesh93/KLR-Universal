/**
 * URLs the previous klruniversal.com served that this site does not.
 *
 * Recovered from the Wayback Machine and confirmed 404 against the live site.
 * Most were keyword landing pages ("borewell machine manufacturer in
 * hyderabad") that carried real rankings and links, so each is 301'd to the
 * closest topical match rather than blanket-redirected to the homepage --
 * Google treats an irrelevant redirect as a soft 404 and drops the signal.
 *
 * Deliberately NOT redirected, and left to 404:
 *   /author/*            WordPress author archives, no equivalent, no value
 *   /inside/images/*.swf Flash assets
 *   /contact-and-support/feed/ handled below, it has an obvious target
 */
export const LEGACY_REDIRECTS = [
  // Water well / borewell drilling -> the water well rig category
  ["/bore-well-drilling-machine-manufacturer-in-hyderabad", "/product-category/water-well"],
  ["/borewell-machine-manufacturer-in-hyderabad", "/product-category/water-well"],
  ["/borehole-drilling-machine-manufacturer-in-hyderabad", "/product-category/water-well"],
  ["/borehole-drilling-machine-for-sale", "/product-category/water-well"],
  ["/bore-well-machine-price-in-hyderabad", "/product-category/water-well"],
  ["/drilling-machine-for-sale-in-hyderabad", "/product-category/water-well"],

  // DTH and tooling -> the DTH tools page
  // Search engines and AI summaries still cite these mining URLs, which had no
  // mapping and so 404'd. Surface mining and quarrying is the closest range.
  ["/mining-equipment-manufacturer-in-hyderabad", "/product-category/surface-mining"],
  ["/mining-equipment-manufacturer-in-india", "/product-category/surface-mining"],
  ["/mining-drilling-rig-manufacturer-in-hyderabad", "/product-category/surface-mining"],
  ["/blast-hole-drilling-rig-manufacturer-in-hyderabad", "/product-category/surface-mining"],
  ["/dth-drilling-machine-manufacturer-in-hyderabad", "/drilling-tools/dth-drilling-tools"],
  ["/drilling-tools-manufacturer-in-hyderabad", "/drilling-tools/dth-drilling-tools"],
  ["/dth-hammer-specifications.html", "/drilling-tools/dth-drilling-tools"],
  ["/hammers-trouble-shooting.html", "/drilling-tools/dth-drilling-tools"],

  // Section roots that never had a page. Search still lists /drilling-rigs, so
  // send each to the page that answers what it implies.
  ["/drilling-rigs", "/drilling-rig-manufacturer-in-india"],
  ["/product_category", "/drilling-rig-manufacturer-in-india"],
  ["/drilling-tools", "/drilling-tools/dth-drilling-tools"],

  // Construction / horizontal rigs
  ["/horizontal-drilling-rig-manufacturer-in-india", "/product-category/construction"],

  // Broad manufacturer terms -> the homepage, which is genuinely about this
  // /drilling-rig-manufacturer-in-india used to 301 to the homepage. It is now
  // a real page targeting that search, so the redirect is gone: a redirect wins
  // over a route in Next, and would have made the new page unreachable.
  ["/drilling-equipment-manufacturer-in-hyderabad", "/"],
  ["/drilling-equipments-manufacturer-in-hyderabad", "/"],
  ["/hydraulic-drilling-machine-manufacturer-in-hyderabad", "/"],
  ["/best-drilling-rigs-in-india", "/"],
  ["/backhoe-loaders-2.html", "/"],

  // Company / credentials
  ["/indias-best-drilling-rigs-manufacturers-exporters", "/about-us"],

  // Contact and enquiry entry points
  ["/enquiry", "/contact-and-support"],
  ["/contact-us.asp", "/contact-and-support"],
  ["/demo-web-form", "/contact-and-support"],
  ["/contact-and-support/feed", "/contact-and-support"],

  // Comparison posts promoted from /blog/<slug> to a clean root URL, same
  // treatment already given to dth-vs-rotary-drilling-for-water-well.
  // generateStaticParams excludes standaloneUrl posts from /blog/[slug], so
  // without this the old indexed URL 404s instead of landing on the new one.
  ["/blog/rotary-vs-dth-drilling-hard-rock", "/rotary-vs-dth-drilling-hard-rock"],
  ["/blog/dth-vs-top-hammer-drilling-guide", "/dth-vs-top-hammer-drilling-guide"],
  ["/blog/dth-vs-rotary-drilling-for-water-well", "/dth-vs-rotary-drilling-for-water-well"],

  // Old WordPress product detail pages (/Products/klr-*, capital P as the old
  // CMS served it). Verified every target slug/category against the current
  // product data before writing these -- none guessed.
  ["/Products/klr-cdr-750", "/drilling-rigs/exploration/core-drill-rig-750"],
  ["/Products/klr-cdr-500", "/drilling-rigs/exploration/core-drill-rig-500"],
  ["/Products/klr-cdr-300", "/drilling-rigs/exploration/cdr-300"],
  ["/Products/klr-cdr-150", "/drilling-rigs/exploration/core-drill-rig-150"],
  ["/Products/klr-cdr-50", "/drilling-rigs/exploration/cdr-50"],
  ["/Products/klr-cdr-1000", "/drilling-rigs/exploration/cdr-1000"],
  ["/Products/klr-cdr-2000", "/drilling-rigs/exploration/cdr-2000"],
  ["/Products/klr-dth-1500-double", "/drilling-rigs/water-well/dth-1500-double-truck"],
  ["/Products/klr-dth-1500", "/drilling-rigs/water-well/dth-1500"],
  ["/Products/klr-dthr-600", "/drilling-rigs/water-well/dthr-600"],
  ["/Products/klr-dthr-300", "/drilling-rigs/water-well/dthr-300"],
  ["/Products/klr-dthr-100", "/drilling-rigs/water-well/dthr-100"],
  ["/Products/klr-tbw-40", "/drilling-rigs/water-well/tbw-40"],
  ["/Products/klr-tc-40", "/drilling-rigs/exploration/tc-40"],
  ["/Products/klr-itd-46-blast-hole-drill-rig", "/drilling-rigs/surface-mining/itd-46"],
  ["/Products/klr-kpr-5-42", "/drilling-rigs/construction/kpr"],
  // Generic old tool listing pages. "bits" and "hammers" covered both DTH and
  // rotary tooling on the old site with no single current equivalent; routed
  // to the DTH tools hub as the larger, primary line -- an imperfect but
  // defensible default, not a guess at a non-existent page.
  ["/Products/bits", "/drilling-tools/dth-drilling-tools"],
  ["/Products/hammers", "/drilling-tools/dth-drilling-tools"],
  ["/Products/drill-rods", "/drilling-tools/drill-rods"],
  // Not redirected, left to 404: /Products/round-khr, klr-itd-60-ground-blast-
  // hole-drill-rig, klr-k2-blast-hole-drill-rig -- none match a current slug,
  // so routing them anywhere would be a guess, not a mapping.

  // Marketing / informational pages from the old site.
  ["/lp-thankyou", "/contact-and-support"],
  ["/thank-you", "/contact-and-support"],
  ["/where-to-buy", "/contact-and-support"],
  ["/wide-range-of-products", "/drilling-rig-manufacturer-in-india"],
  ["/facilities-of-biggest-drilling-equipment-manufacturers-in-india", "/about-us"],
  ["/about-klr-industries", "/about-us"],
  ["/drilling-tools-construction-mining", "/drilling-tools/dth-drilling-tools"],
  ["/what-is-drilling-rig-oil-gas-mining", "/drilling-rig-manufacturer-in-india"],
  ["/depth-soil-type-drilling-rig-choice", "/blog/how-depth-soil-type-impact-drilling-rig-choice"],
  ["/tractor-borewell-machine-price", "/tractor-mounted-drilling-rig"],
  ["/klr-website", "/"],
];
