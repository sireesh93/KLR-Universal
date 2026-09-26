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
  ["/bore-well-drilling-machine-manufacturer-in-hyderabad", "/product_category/water-well"],
  ["/borewell-machine-manufacturer-in-hyderabad", "/product_category/water-well"],
  ["/borehole-drilling-machine-manufacturer-in-hyderabad", "/product_category/water-well"],
  ["/borehole-drilling-machine-for-sale", "/product_category/water-well"],
  ["/bore-well-machine-price-in-hyderabad", "/product_category/water-well"],
  ["/drilling-machine-for-sale-in-hyderabad", "/product_category/water-well"],

  // DTH and tooling -> the DTH tools page
  // Search engines and AI summaries still cite these mining URLs, which had no
  // mapping and so 404'd. Surface mining and quarrying is the closest range.
  ["/mining-equipment-manufacturer-in-hyderabad", "/product_category/surface-mining"],
  ["/mining-equipment-manufacturer-in-india", "/product_category/surface-mining"],
  ["/mining-drilling-rig-manufacturer-in-hyderabad", "/product_category/surface-mining"],
  ["/blast-hole-drilling-rig-manufacturer-in-hyderabad", "/product_category/surface-mining"],
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
  ["/horizontal-drilling-rig-manufacturer-in-india", "/product_category/construction"],

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
];
