import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ProductCategoryListing } from "@/components/sites/klruniversal-com-3601ad32/shared/ProductCategoryListing";
import { products } from "@/content/klruniversal-com-3601ad32/products";
import { SITE_URL } from "@/lib/site";

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
  const count = products.filter((p) => p.category === category).length;
  const title = `${match.categoryLabel} | KLR Universal`;
  const description = `${count} ${match.categoryLabel} models from KLR Universal — hydraulic rigs built in-house since 1984, in use across 60+ countries.`;
  return {
    title,
    description,
    alternates: { canonical: `/product_category/${category}` },
    openGraph: {
      title,
      description,
      type: "website",
      images: ["/opengraph-image"],
    },
  };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryProducts = products.filter((p) => p.category === category);
  if (categoryProducts.length === 0) notFound();

  // ItemList tells Google this is a product listing and in what order, which
  // is what makes a category page eligible for a carousel result.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryProducts[0].categoryLabel,
        item: `${SITE_URL}/product_category/${category}`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: categoryProducts[0].categoryLabel,
    numberOfItems: categoryProducts.length,
    itemListElement: categoryProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${SITE_URL}/drilling-rigs/${p.category}/${p.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
