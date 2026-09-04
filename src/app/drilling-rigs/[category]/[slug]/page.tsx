import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ProductTemplate } from "@/components/sites/klruniversal-com-3601ad32/shared/ProductTemplate";
import { products, getProduct } from "@/content/klruniversal-com-3601ad32/products";

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const product = getProduct(category, slug);
  if (!product) return {};
  const title = `${product.title} | KLR Universal`;
  const description = product.bandHeading
    ? `${product.title} — ${product.categoryLabel} by KLR Universal. ${product.bandHeading}`.slice(0, 160)
    : `${product.title} — ${product.categoryLabel} by KLR Universal, trusted in 60+ countries for reliable drilling equipment.`;
  return {
    title,
    description,
    alternates: { canonical: `/drilling-rigs/${product.category}/${product.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      images: product.heroImage ? [product.heroImage] : undefined,
    },
  };
}

export default async function DrillingRigProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const product = getProduct(category, slug);
  if (!product) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <ProductTemplate product={product} />
      </main>
      <Footer />
    </>
  );
}
