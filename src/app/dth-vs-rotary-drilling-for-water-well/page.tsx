import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { BlogPostTemplate } from "@/components/sites/klruniversal-com-3601ad32/shared/BlogPostTemplate";
import { getBlogPost, getRelatedPosts } from "@/content/klruniversal-com-3601ad32/blog-posts";

const SLUG = "dth-vs-rotary-drilling-for-water-well";

export const metadata: Metadata = {
  alternates: { canonical: "/dth-vs-rotary-drilling-for-water-well" },
  title: "DTH vs Rotary Drilling for Water Wells | KLR Universal",
  description:
    "How DTH and rotary drilling compare for water well work — penetration rate, formation suitability, hole quality and running cost — and how to choose between them.",
};

export default function DthVsRotaryStandalonePage() {
  const post = getBlogPost(SLUG);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <BlogPostTemplate post={post} related={getRelatedPosts(SLUG)} />
      </main>
      <Footer />
    </>
  );
}
