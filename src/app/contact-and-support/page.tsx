import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { ContactForm } from "@/components/sites/klruniversal-com-3601ad32/shared/ContactForm";
import { FaqAccordion } from "@/components/sites/klruniversal-com-3601ad32/contact-and-support-0e2de176/FaqAccordion";

export const metadata: Metadata = {
  title: "Contact & Support | KLR Universal",
  description:
    "Have a question, need support, or ready to explore a solution? KLR Universal's teams are here to help every step of the way.",
};

const HERO_IMAGE =
  "/sites/klruniversal-com-3601ad32/about-us-57424c1f/images/hero-banner-collage.png";

const FAQS = [
  {
    q: "About KLR's Global Presence.",
    a: "Our brand is well recognized in about 60 countries across the globe. Our continues R & D has ensured a very long and efficient working life for our equipment and this has truly helped us and given very strong brand name.",
  },
  {
    q: "ISO 9001:2015 Certification",
    a: "We are an ISO 9001:2015 certified company having wide global presence with world class quality products and services which provide most affordable and reliable solution for drilling across the world.",
  },
  {
    q: "How many years has KLR Industries been in business?",
    a: "We have been in business for more than 3 decades and are growing strong.",
  },
  {
    q: "Our Manufacturing Facilities",
    a: "KLR Industries has the biggest facility among all the other Drilling Equipment Manufacturers in India. KLR Introduced Friction Welded and Induction Hardened Drill Rods in India.",
  },
  {
    q: "Our support",
    a: "We support 24/7, KLR Industries firmly believes in constant Support, Development, Improvement and Upgradation of all its products. We have a dedicated team working in our R&D wing in order to constantly improve our products.",
  },
];

export default function ContactAndSupportPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-klr-header py-10">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-4 md:grid-cols-2 md:items-center md:px-8">
            <div>
              <h1 className="text-3xl font-medium leading-tight md:text-4xl">
                Let&rsquo;s Drill Into the Details Together
              </h1>
              <p className="mt-3 text-black/70">
                Have a question, need support, or ready to explore a
                solution? We&rsquo;re here to help every step of the way.
              </p>
            </div>
            <div className="relative h-[200px] w-full overflow-hidden rounded-lg md:h-[260px]">
              <Image
                src={HERO_IMAGE}
                alt="KLR Universal drilling rigs collage"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
        </section>

        {/* Intro band */}
        <section className="relative overflow-hidden bg-klr-red py-14 text-white">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-4 md:grid-cols-2 md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              Your Global Drilling Partner, Always Within Reach
            </h2>
            <p className="text-white/90">
              From tailored support to technical assistance, KLR
              Universal&rsquo;s dedicated teams are available to help you
              make informed decisions, troubleshoot challenges, or explore
              customized solutions. Whether it&rsquo;s a new inquiry, a
              service request, or feedback, we&rsquo;re just a message away.
            </p>
          </div>
        </section>

        <ContactForm />

        {/* Get in Touch */}
        <section className="bg-klr-offwhite py-16">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-4 md:grid-cols-2 md:px-8">
            <div>
              <h2 className="text-3xl font-medium leading-tight md:text-4xl">
                Get in Touch
              </h2>
              <p className="mt-4 text-sm text-black/70">
                Survey No. 222/1 Near Nagarjuna Nagar, Colony Cherlapally
                Road, RR District, Hyderabad-500062, Telangana, India
              </p>
              <a
                href="mailto:sales@klruniversal.com"
                className="mt-4 flex items-center gap-2 text-sm text-klr-red hover:underline"
              >
                <Mail className="size-4" /> sales@klruniversal.com
              </a>
              <a
                href="tel:+919030327878"
                className="mt-2 flex items-center gap-2 text-sm text-klr-red hover:underline"
              >
                <MessageCircle className="size-4" /> +91 9030327878
              </a>
              <p className="mt-6 text-sm font-medium">
                Monday to Saturday — 9:00 AM to 6:00 PM IST
              </p>
              <p className="text-sm text-black/60">
                Closed on Sundays and Public Holidays
              </p>
            </div>
            <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-black/10 bg-white text-sm text-black/40">
              Map
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              Check FAQ Before you Ask
            </h2>
            <FaqAccordion items={FAQS} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
