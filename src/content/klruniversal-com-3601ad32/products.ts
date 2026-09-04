import type { Product } from "@/components/sites/klruniversal-com-3601ad32/shared/ProductTemplate";
import raw from "./products.json";

export const products = raw as unknown as Product[];

export function getProduct(category: string, slug: string) {
  return products.find((p) => p.category === category && p.slug === slug);
}
