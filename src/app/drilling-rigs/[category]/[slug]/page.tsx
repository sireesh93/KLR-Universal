import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ProductTemplate } from "@/components/sites/klruniversal-com-3601ad32/shared/ProductTemplate";
import { products, getProduct, getRelatedProducts } from "@/content/klruniversal-com-3601ad32/products";

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
  // "DTHR-150 | KLR Universal" tells a search or AI engine nothing about what
  // the product is. The category label is already published on the page, so
  // folding it into the title adds the missing noun without inventing copy.
  // Some model names already carry a descriptor ("EA-20|30 - Down-the-Hole
  // Drill"), which would overrun the ~60 character display limit, so the plain
  // form is kept whenever the descriptive one gets too long.
  const noun = product.categoryLabel.replace(/Rigs$/, "Rig");
  // A few product names already carry the brand ("... – KLR Universal"), which
  // would otherwise repeat it twice in one title.
  const name = product.title.replace(/\s*[-–—|]\s*KLR Universal\s*$/i, "").trim();
  const descriptive = `${name} ${noun} | KLR Universal`;
  const title = descriptive.length <= 60 ? descriptive : `${name} | KLR Universal`;
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
      url: `/drilling-rigs/${product.category}/${product.slug}`,
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
        <ProductTemplate product={product} related={getRelatedProducts(category, slug)} />
      </main>
      <Footer />
    </>
  );
}
