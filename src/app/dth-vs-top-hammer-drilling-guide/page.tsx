import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { BlogPostTemplate } from "@/components/sites/klruniversal-com-3601ad32/shared/BlogPostTemplate";
import { getBlogPost, getRelatedPosts } from "@/content/klruniversal-com-3601ad32/blog-posts";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";

const SLUG = "dth-vs-top-hammer-drilling-guide";

export const metadata: Metadata = {
  alternates: { canonical: "/dth-vs-top-hammer-drilling-guide" },
  title: "DTH vs Top Hammer Drilling | KLR Universal",
  description:
    "Key differences between DTH and top hammer drilling — penetration mechanism, hole depth, formation suitability and when to choose each method.",
  openGraph: {
    title: "DTH vs Top Hammer Drilling | KLR Universal",
    description: "Key differences between DTH and top hammer drilling — penetration mechanism, hole depth, formation suitability and when to choose each method.",
    url: "/dth-vs-top-hammer-drilling-guide",
    type: "website",
  },
};

export default function DthVsTopHammerStandalonePage() {
  const post = getBlogPost(SLUG);
  if (!post) notFound();

  // Same guard as blog/[slug]: post.date is a human string ("May 26, 2026"),
  // parsed to ISO. Without dateModified an AI engine has no freshness signal
  // and may rank this comparison page as stale against ones that carry it --
  // this page answers a direct, frequently-asked comparison query.
  const published = new Date(post.date);
  const dateFields = Number.isNaN(published.getTime())
    ? {}
    : {
        datePublished: published.toISOString().slice(0, 10),
        dateModified: published.toISOString().slice(0, 10),
      };

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "url": "https://klruniversal.com/dth-vs-top-hammer-drilling-guide",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://klruniversal.com/dth-vs-top-hammer-drilling-guide",
        },
        "inLanguage": "en",
        ...dateFields,
        "author": { "@id": "https://klruniversal.com/#organization" },
        "publisher": { "@id": "https://klruniversal.com/#organization" },
      }} />
      <Header />
      <main className="flex-1">
        <BlogPostTemplate post={post} related={getRelatedPosts(SLUG)} />
      </main>
      <Footer />
    </>
  );
}
