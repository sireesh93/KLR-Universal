import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CtaButton } from "./CtaButton";

export type ToolFeature = {
  title: string;
  desc: string;
  img: string;
  sizes: string | null;
};

const WHY_US = [
  "40+ years of expertise",
  "Industry leader",
  "Trusted in 60 countries",
  "Excellent after-sales support",
];

export function ToolCategoryTemplate({
  title,
  heroImage,
  bandHeading,
  bandDesc,
  features,
}: {
  title: string;
  heroImage: string;
  bandHeading: string;
  bandDesc: string;
  features: ToolFeature[];
}) {
  return (
    <>
      <div className="mx-auto flex max-w-[1400px] items-center gap-1 px-4 py-4 text-xs text-black/50 md:px-8">
        <Link href="/" className="hover:text-klr-red">
          Home
        </Link>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span>Products</span>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span>Drilling Tools</span>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span className="text-black">{title}</span>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="relative flex min-h-[220px] items-center overflow-hidden rounded-lg bg-black/5">
          <div className="relative z-10 m-6 max-w-md rounded-lg bg-white p-6">
            <h1 className="text-2xl font-medium leading-tight md:text-3xl">{title}</h1>
          </div>
          <Image src={heroImage} alt={title} fill className="object-cover" priority />
        </div>
      </section>

      <section className="mt-8 bg-klr-red py-14 text-white">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 className="text-3xl font-medium leading-tight md:text-4xl">{bandHeading}</h2>
          <p className="mt-4 max-w-3xl text-white">{bandDesc}</p>
        </div>
      </section>

      <section className="bg-klr-offwhite py-16">
        <div className="mx-auto max-w-[1400px] space-y-6 px-4 md:px-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="grid grid-cols-1 items-center gap-8 rounded-lg bg-white p-8 md:grid-cols-2"
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 text-sm text-black/70">{f.desc}</p>
                {f.sizes && (
                  <p className="mt-4 inline-block rounded bg-klr-red/10 px-3 py-2 text-sm font-medium text-klr-red">
                    {f.sizes}
                  </p>
                )}
              </div>
              <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-klr-offwhite ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <Image src={f.img} alt={f.title} fill className="object-contain p-6" />
              </div>
            </div>
          ))}

          <div className="rounded-lg bg-white p-6">
            <h3 className="font-semibold">Why KLR Universal</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-black/70">
              {WHY_US.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <CtaButton href="/contact-and-support" className="mt-4">
              Contact & Support
            </CtaButton>
          </div>
        </div>
      </section>
    </>
  );
}
