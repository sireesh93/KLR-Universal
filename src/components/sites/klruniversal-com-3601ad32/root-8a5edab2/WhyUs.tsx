import Image from "next/image";
import Link from "next/link";
import { CtaButton } from "../shared/CtaButton";
import { Reveal } from "../shared/Reveal";

const ASSET_BASE =
  "/sites/klruniversal-com-3601ad32/root-8a5edab2/images";

const FEATURES = [
  { icon: "why-us-icon-experience.svg", text: "40+ years of engineering expertise" },
  { icon: "why-us-icon-projects.svg", text: "4500+ projects delivered" },
  {
    icon: "why-us-icon-iso.svg",
    text: "ISO 9001:2015-certified Quality Management System",
  },
  { icon: "why-us-icon-rnd.svg", text: "Strong R&D backbone for continuous innovation" },
  { icon: "why-us-icon-countries.svg", text: "Serving 60+ countries worldwide" },
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-klr-red py-16 text-white">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        {/* Not wrapped in Reveal: on mobile (where Hero is hidden) this is
            the first visible content and the LCP candidate. Reveal starts
            elements at opacity:0 until IntersectionObserver fires post-
            hydration, which measurably delays LCP for content that's
            already in the initial viewport with nothing to scroll to. */}
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start">
          <h2 className="text-3xl font-medium leading-tight md:text-4xl">
            Drilling Innovation from the Ground Up
          </h2>
          <div>
            <p className="text-white">
              KLR Universal isn&rsquo;t just a name-it&rsquo;s a legacy of
              engineering precision and progress. What began as a small unit
              manufacturing DTH bits has evolved into a global force in{" "}
              <Link href="/drilling-rig-manufacturer-in-india" className="underline hover:text-white/80">
                high-performance drilling rigs
              </Link>{" "}
              and rock drilling tools and accessories.
            </p>
            <CtaButton href="/about-us" variant="white" className="mt-6">
              See Our Journey
            </CtaButton>
          </div>
        </div>

        <h3 className="mt-14 text-2xl font-medium">Why KLR Universal?</h3>
        <div className="mt-6 border-t border-white/20" />

        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-5">
          {FEATURES.map((f, i) => (
            <Reveal key={f.text} delay={i * 75} className="flex items-center gap-3">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/95 p-2">
                <Image
                  src={`${ASSET_BASE}/${f.icon}`}
                  alt=""
                  width={40}
                  height={40}
                />
              </div>
              <p className="text-sm font-medium">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
