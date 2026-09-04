import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { BlogListing } from "@/components/sites/klruniversal-com-3601ad32/shared/BlogListing";

export const metadata: Metadata = {
  title: "Blog | KLR Universal",
  description: "News, innovations, and expert resources from KLR Universal.",
};

export default function BlogIndexPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <BlogListing page={1} />
      </main>
      <Footer />
    </>
  );
}
