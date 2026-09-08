import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { BlogListing, BLOG_PAGE_COUNT } from "@/components/sites/klruniversal-com-3601ad32/shared/BlogListing";

export function generateStaticParams() {
  return Array.from({ length: BLOG_PAGE_COUNT - 1 }, (_, i) => ({ num: String(i + 2) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ num: string }>;
}): Promise<Metadata> {
  const { num } = await params;
  return {
    title: "Blog | KLR Universal",
    alternates: { canonical: `/blog/page/${num}` },
  };
}

export default async function BlogPagedPage({ params }: { params: Promise<{ num: string }> }) {
  const { num } = await params;
  const page = Number(num);
  if (!Number.isInteger(page) || page < 2 || page > BLOG_PAGE_COUNT) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <BlogListing page={page} />
      </main>
      <Footer />
    </>
  );
}
