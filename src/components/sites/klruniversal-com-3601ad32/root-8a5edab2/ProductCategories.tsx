import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../shared/Reveal";

const ASSET_BASE =
  "/sites/klruniversal-com-3601ad32/root-8a5edab2/images";

const CATEGORIES = [
  {
    icon: "category-icon-waterwell.svg",
    eyebrow: "Geothermal Drilling Rigs",
    title: "Waterwell Drill Rigs",
    href: "/product-category/water-well",
  },
  {
    icon: "category-icon-mining.svg",
    eyebrow: "Mining Drilling Rigs",
    title: "Surface Mining & Quarrying Drill Rigs",
    href: "/product-category/surface-mining",
  },
  {
    icon: "category-icon-construction.svg",
    eyebrow: "Construction Drill Rigs",
    title: "Construction Drilling Rigs",
    href: "/product-category/construction",
  },
  {
    icon: "category-icon-exploration.svg",
    eyebrow: "Exploration Drilling Rigs",
    title: "Exploration Drill Rigs",
    href: "/product-category/exploration",
  },
  {
    icon: "category-icon-tools.png",
    eyebrow: "Drilling Tools",
    title: "Drilling Tools",
    href: "/drilling-tools/dth-drilling-tools",
  },
];

export function ProductCategories() {
  return (
    <section id="solutions" className="bg-white py-16">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-md text-3xl font-medium leading-tight md:text-4xl">
            Solutions for Every Drilling Challenge
          </h2>
          <p className="max-w-md text-sm text-black/60">
            Whether you&rsquo;re drilling for water, minerals and metal
            mining, exploration, geotechnical data, or foundation work,
            we&rsquo;ve got the right rig for your terrain and depth.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 75}>
              <Link
                href={cat.href}
                className="group flex h-full flex-col rounded-lg border border-black/10 bg-klr-offwhite p-4 shadow-[0_0_0_0.75px_#eee] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex size-24 items-center justify-center rounded-lg bg-klr-red transition-transform duration-300 group-hover:scale-105">
                  {/* Sized to match the live site (~98px). The tools icon is a
                      hairline-stroke PNG with no vector version available, so
                      shrinking it below native resolution turns the strokes
                      semi-transparent and they blend into the red tile. */}
                  <Image
                    src={`${ASSET_BASE}/${cat.icon}`}
                    alt=""
                    width={100}
                    height={100}
                    className="size-[88px]"
                  />
                </div>
                <p className="mt-4 text-xs text-black/50">{cat.eyebrow}</p>
                <p className="mt-1 font-medium">{cat.title}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-klr-red opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                  Explore More <ArrowRight className="size-3" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
