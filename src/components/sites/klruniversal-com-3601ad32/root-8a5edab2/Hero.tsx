"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CtaButton } from "../shared/CtaButton";

const ASSET_BASE = "/sites/klruniversal-com-3601ad32/root-8a5edab2/images";

const SLIDES = [
  {
    src: `${ASSET_BASE}/hero-banner-1.webp`,
    alt: "KLR Universal drilling rig fleet on site",
  },
  {
    src: `${ASSET_BASE}/hero-banner-2.webp`,
    alt: "KLR Universal DTH hammers, drill bits and rock drilling tools",
  },
];

const SLIDE_DURATION = 5000;

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Honour a reduced-motion preference by leaving the first slide in place.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative hidden md:block">
      <div className="relative h-[420px] w-full overflow-hidden lg:h-[520px]">
        {SLIDES.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute left-6 top-1/2 w-[min(90vw,380px)] -translate-y-1/2 rounded-xl bg-white/95 p-6 shadow-xl lg:left-16">
        <h1 className="text-3xl font-medium leading-tight text-black lg:text-4xl">
          Built to Drill. Engineered to Lead.
        </h1>
        <p className="mt-3 text-sm text-black/70">
          Your global partner in drilling rig innovation and manufacturing
          since 1984.
        </p>
        <CtaButton href="#solutions" className="mt-5">
          Explore Our Solutions
        </CtaButton>
      </div>
    </section>
  );
}
