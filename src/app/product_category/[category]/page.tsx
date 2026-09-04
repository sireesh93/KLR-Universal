import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ProductCategoryListing } from "@/components/sites/klruniversal-com-3601ad32/shared/ProductCategoryListing";
import { products } from "@/content/klruniversal-com-3601ad32/products";

export function generateStaticParams() {
  const categories = [...new Set(products.map((p) => p.category))];
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const match = products.find((p) => p.category === category);
  if (!match) return {};
  return { title: `${match.categoryLabel} | KLR Universal` };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryProducts = products.filter((p) => p.category === category);
  if (categoryProducts.length === 0) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <ProductCategoryListing
          categoryLabel={categoryProducts[0].categoryLabel}
          products={categoryProducts}
        />
      </main>
      <Footer />
    </>
  );
}
