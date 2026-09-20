import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { BlogListing, BLOG_PAGE_COUNT } from "@/components/sites/klruniversal-com-3601ad32/shared/BlogListing";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";

export function generateStaticParams() {
  return Array.from({ length: BLOG_PAGE_COUNT - 1 }, (_, i) => ({ num: String(i + 2) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ num: string }>;
}): Promise<Metadata> {
  const { num } = await params;
  const title = `Blog — Page ${num} | KLR Universal`;
  const description = `Page ${num} of technical articles from KLR Universal on drilling rig selection, DTH and rotary drilling methods, exploration drilling and equipment maintenance.`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/page/${num}` },
    openGraph: { title, description, url: `/blog/page/${num}`, type: "website" },
  };
}

export default async function BlogPagedPage({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  const page = Number(num);
  if (!Number.isInteger(page) || page < 2 || page > BLOG_PAGE_COUNT) notFound();

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `KLR Universal Blog, page ${num}`,
        "url": `https://klruniversal.com/blog/page/${num}`,
        "inLanguage": "en",
        "isPartOf": { "@type": "Blog", "@id": "https://klruniversal.com/blog" },
        "publisher": { "@id": "https://klruniversal.com/#organization" },
      }} />
      <Header />
      <main className="flex-1">
        <BlogListing page={page} />
      </main>
      <Footer />
    </>
  );
}
