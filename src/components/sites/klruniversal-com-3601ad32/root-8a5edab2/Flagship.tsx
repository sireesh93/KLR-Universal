"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const ASSET_BASE =
  "/sites/klruniversal-com-3601ad32/root-8a5edab2/images";

const SLIDE_COUNT = 14;
const SLIDES = Array.from({ length: SLIDE_COUNT }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `${ASSET_BASE}/flagship-slide-${n}.webp`;
});

export function Flagship() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-klr-red py-14 text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-10 px-4 md:flex-row md:px-8">
        <div className="max-w-sm">
          <h2 className="text-3xl font-medium leading-tight md:text-4xl">
            Performance That Sets Standards
          </h2>
          <p className="mt-4 text-white/90">
            These aren&rsquo;t just our bestsellers, they&rsquo;re industry
            benchmarks in action, reliability, and ROI.
          </p>
        </div>

        <div className="relative h-[220px] w-full max-w-[560px] md:h-[315px]">
          {SLIDES.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`Flagship product ${i + 1}`}
              fill
              className={`object-contain transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              sizes="(min-width: 768px) 560px, 90vw"
              priority={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
