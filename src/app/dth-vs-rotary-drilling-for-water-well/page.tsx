import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { BlogPostTemplate } from "@/components/sites/klruniversal-com-3601ad32/shared/BlogPostTemplate";
import { getBlogPost, getRelatedPosts } from "@/content/klruniversal-com-3601ad32/blog-posts";

const SLUG = "dth-vs-rotary-drilling-for-water-well";

export const metadata: Metadata = {
  alternates: { canonical: "/dth-vs-rotary-drilling-for-water-well" },
  title: "DTH vs Rotary Drilling: Which is Better for Water Well Drilling? | KLR Universal Blog",
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
