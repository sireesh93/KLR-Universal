import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { BlogPostTemplate } from "@/components/sites/klruniversal-com-3601ad32/shared/BlogPostTemplate";
import { getBlogPost, getRelatedPosts } from "@/content/klruniversal-com-3601ad32/blog-posts";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";

const SLUG = "dth-vs-rotary-drilling-for-water-well";

export const metadata: Metadata = {
  alternates: { canonical: "/dth-vs-rotary-drilling-for-water-well" },
  title: "DTH vs Rotary Drilling for Water Wells | KLR Universal",
  description:
    "How DTH and rotary drilling compare for water well work — penetration rate, formation suitability, hole quality and running cost — and how to choose between them.",
  openGraph: {
    title: "DTH vs Rotary Drilling for Water Wells | KLR Universal",
    description: "How DTH and rotary drilling compare for water well work — penetration rate, formation suitability, hole quality and running cost — and how to choose between them.",
    url: "/dth-vs-rotary-drilling-for-water-well",
    type: "website",
  },
};

export default function DthVsRotaryStandalonePage() {
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
        "url": "https://klruniversal.com/dth-vs-rotary-drilling-for-water-well",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://klruniversal.com/dth-vs-rotary-drilling-for-water-well",
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
