import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { BlogListing } from "@/components/sites/klruniversal-com-3601ad32/shared/BlogListing";
import { JsonLd } from "@/components/sites/klruniversal-com-3601ad32/shared/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog | KLR Universal",
  description: "News, innovations, and expert resources from KLR Universal.",
  openGraph: {
    title: "Blog | KLR Universal",
    description: "News, innovations, and expert resources from KLR Universal.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": "https://klruniversal.com/blog",
        "name": "KLR Universal Blog",
        "url": "https://klruniversal.com/blog",
        "description":
          "Technical articles on drilling rigs, rock drilling tools and drilling methods.",
        "inLanguage": "en",
        "publisher": { "@id": "https://klruniversal.com/#organization" },
      }} />
      <Header />
      <main className="flex-1">
        <BlogListing page={1} />
      </main>
      <Footer />
    </>
  );
}
