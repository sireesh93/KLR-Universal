import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ProductCategoryListing } from "@/components/sites/klruniversal-com-3601ad32/shared/ProductCategoryListing";
import { FaqAccordion } from "@/components/sites/klruniversal-com-3601ad32/contact-and-support-0e2de176/FaqAccordion";
import { products } from "@/content/klruniversal-com-3601ad32/products";
import { CATEGORY_DESCRIPTIONS } from "@/content/klruniversal-com-3601ad32/category-descriptions";
import { HOME_URL, SITE_URL } from "@/lib/site";

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
    alternates: { canonical: `/product-category/${category}` },
    openGraph: {
      title,
      description,
      url: `/product-category/${category}`,
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
      { "@type": "ListItem", position: 1, name: "Home", item: HOME_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryProducts[0].categoryLabel,
        item: `${SITE_URL}/product-category/${category}`,
      },
    ],
  };

  // Sourced from the same product array and category label already on the
  // page, plus the real depth/diameter spread used in CATEGORY_DESCRIPTIONS
  // -- no per-model number invented here, only the count and name the page
  // already states.
  const categoryLabel = categoryProducts[0].categoryLabel;
  const modelNames = categoryProducts.map((p) => p.title).join(", ");
  const faqs = [
    {
      q: `How many ${categoryLabel} models does KLR Universal offer?`,
      a: `KLR Universal offers ${categoryProducts.length} models in the ${categoryLabel} range: ${modelNames}.`,
    },
    {
      q: `Are KLR Universal's ${categoryLabel} built in-house?`,
      a: `Yes. Every rig is built in-house at KLR Universal's Hyderabad facility, operating since 1984, including its own Heat Treatment Division for the drill rods and hammer components.`,
    },
    {
      q: `Can KLR Universal customize a ${categoryLabel} rig for my project?`,
      a: `Yes. KLR Universal builds custom drilling equipment to meet application-specific requirements -- contact our team to discuss your project.`,
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main className="flex-1">
        <ProductCategoryListing
          categoryLabel={categoryLabel}
          description={CATEGORY_DESCRIPTIONS[category]}
          products={categoryProducts}
        />
        {/* Visible accordion matching the FAQPage schema above verbatim. */}
        <section className="bg-klr-offwhite py-16">
          <div className="mx-auto max-w-[800px] px-4 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              Frequently Asked Questions
            </h2>
            <FaqAccordion items={faqs} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
