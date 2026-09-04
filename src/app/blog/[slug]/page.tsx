import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { BlogPostTemplate } from "@/components/sites/klruniversal-com-3601ad32/shared/BlogPostTemplate";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/content/klruniversal-com-3601ad32/blog-posts";

export function generateStaticParams() {
  return blogPosts.filter((p) => !p.standaloneUrl).map((p) => ({ slug: p.slug }));
}

function excerptFrom(post: ReturnType<typeof getBlogPost>) {
  const firstParagraph = post?.blocks.find((b) => b.tag === "P");
  const text = firstParagraph && "text" in firstParagraph ? firstParagraph.text : "";
  return text.length > 157 ? `${text.slice(0, 157).trimEnd()}...` : text;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const title = `${post.title} | KLR Universal Blog`;
  const description = excerptFrom(post);
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post || post.standaloneUrl) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <BlogPostTemplate post={post} related={getRelatedPosts(post.slug)} />
      </main>
      <Footer />
    </>
  );
}
