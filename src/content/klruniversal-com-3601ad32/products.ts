import type { Product } from "@/components/sites/klruniversal-com-3601ad32/shared/ProductTemplate";
import raw from "./products.json";

export const products = raw as unknown as Product[];

export function getProduct(category: string, slug: string) {
  return products.find((p) => p.category === category && p.slug === slug);
}

export function getRelatedProducts(category: string, slug: string, count = 3) {
  // Same-category siblings are the genuinely useful recommendation -- someone
  // on a water-well rig page plausibly wants to see other water-well rigs.
  //
  // Two categories (water-well: 5, surface-mining: 7) have more siblings than
  // `count`, so a plain slice(0, count) would hit the same bug just fixed in
  // getRelatedPosts: every product in the category would always surface the
  // same leading few, and the rest would never get a same-category inbound
  // link at all. Rotating from this product's own position within its
  // category spreads those links evenly across all of them instead.
  const sameCategory = products.filter((p) => p.category === category);
  const categoryIndex = sameCategory.findIndex((p) => p.slug === slug);
  const related: typeof products = [];
  const seen = new Set([slug]);

  for (let i = 1; related.length < count && i < sameCategory.length; i++) {
    const candidate = sameCategory[(categoryIndex + i) % sameCategory.length];
    if (!seen.has(candidate.slug)) {
      related.push(candidate);
      seen.add(candidate.slug);
    }
  }

  // The two smallest categories (construction: 3, underground-drill-rigs: 2)
  // can't fill the quota from siblings alone even after rotating. Pad from
  // the full catalog, rotating from this product's position in the whole
  // list so the fallback portion is spread out too, not sourced from the
  // same few pages every time.
  if (related.length < count) {
    const fullIndex = products.findIndex((p) => p.category === category && p.slug === slug);
    for (let i = 1; related.length < count && i < products.length; i++) {
      const candidate = products[(fullIndex + i) % products.length];
      if (!seen.has(candidate.slug)) {
        related.push(candidate);
        seen.add(candidate.slug);
      }
    }
  }

  return related;
}
