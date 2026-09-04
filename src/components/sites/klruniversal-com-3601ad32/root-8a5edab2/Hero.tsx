import Image from "next/image";
import { CtaButton } from "../shared/CtaButton";

export function Hero() {
  return (
    <section className="relative hidden md:block">
      <div className="relative h-[420px] w-full lg:h-[520px]">
        <Image
          src="/sites/klruniversal-com-3601ad32/root-8a5edab2/images/hero-banner-1.webp"
          alt="KLR Universal drilling rigs fleet"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
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
