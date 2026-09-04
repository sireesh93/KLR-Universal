import Link from "next/link";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { CtaButton } from "@/components/sites/klruniversal-com-3601ad32/shared/CtaButton";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto flex max-w-[1400px] flex-col items-center px-4 py-32 text-center md:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-klr-red">404</p>
          <h1 className="mt-4 text-3xl font-medium leading-tight md:text-4xl">
            We couldn&rsquo;t find that page
          </h1>
          <p className="mt-3 max-w-md text-black/60">
            The page you&rsquo;re looking for may have moved or no longer
            exists. Head back to the homepage or browse our drilling rigs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <CtaButton href="/">Back to Home</CtaButton>
            <Link
              href="/contact-and-support"
              className="text-sm font-medium text-klr-red hover:underline"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
