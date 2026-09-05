"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Menu, X, ChevronLeft } from "lucide-react";
import { CtaButton } from "./CtaButton";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact & Support", href: "/contact-and-support" },
];

const THUMB_BASE = "/sites/klruniversal-com-3601ad32/product-thumbs";

type CategoryProduct = { name: string; href: string; thumb: string };
type CategoryPanel = {
  key: string;
  label: string;
  title: string;
  subtitle?: string;
  desc: string;
  products: CategoryProduct[];
};

const DRILLING_RIGS: CategoryPanel[] = [
  {
    key: "water-well",
    label: "Water Well Drill Rigs",
    title: "Water Well Drill Rigs",
    subtitle: "DTHR Series",
    desc: "Hydraulic-powered and built for air, foam, mud rotary, and DTH drilling, the DTHR Series adapts to any terrain drilling from 100 to 800 meters with ease.",
    products: [
      { name: "DTHR-150", href: "/drilling-rigs/water-well/dthr-150", thumb: `${THUMB_BASE}/dthr-150.png` },
      { name: "DTHR-300", href: "/drilling-rigs/water-well/dthr-300", thumb: `${THUMB_BASE}/dthr-300.png` },
      { name: "DTHR-600", href: "/drilling-rigs/water-well/dthr-600", thumb: `${THUMB_BASE}/dthr-600.png` },
      { name: "DTHR-750", href: "/drilling-rigs/water-well/dthr-750", thumb: `${THUMB_BASE}/dthr-750.png` },
      { name: "TBW-40", href: "/drilling-rigs/water-well/tbw-40", thumb: `${THUMB_BASE}/tbw-40.png` },
    ],
  },
  {
    key: "surface-mining",
    label: "Surface Mining & Quarrying Drill Rigs",
    title: "Surface Mining & Quarrying Drill Rigs",
    subtitle: "Mining & Quarrying Series",
    desc: "Hydraulic-powered and engineered for both Rotary and DTH drilling, the Mining & Quarrying Series is designed for robust performance in the toughest environments, delivering precision drilling from surface to deep rock formations.",
    products: [
      { name: "EA 20|30", href: "/drilling-rigs/surface-mining/ea-20-30", thumb: `${THUMB_BASE}/ea-20-30.png` },
      { name: "THA-20|30", href: "/drilling-rigs/surface-mining/tha-20-30", thumb: `${THUMB_BASE}/tha-20-30.png` },
      { name: "ITD 10", href: "/drilling-rigs/surface-mining/itd-10", thumb: `${THUMB_BASE}/itd-10.png` },
      { name: "HD 100", href: "/drilling-rigs/surface-mining/hd-100", thumb: `${THUMB_BASE}/hd-100.png` },
      { name: "TS 590 — 30 | 40 | 50 (D / E)", href: "/drilling-rigs/surface-mining/ts-590-30-40-50-d-e", thumb: `${THUMB_BASE}/ts-590-30-40-50-d-e.png` },
      { name: "TS 911 — 70 | 80 (D / E)", href: "/drilling-rigs/surface-mining/ts-911-70-80-d-e", thumb: `${THUMB_BASE}/ts-911-70-80-d-e.png` },
      { name: "TS 911 – 75 SP", href: "/drilling-rigs/surface-mining/ts-911-75-sp", thumb: `${THUMB_BASE}/ts-911-75-sp.png` },
    ],
  },
  {
    key: "construction",
    label: "Construction Drill Rigs",
    title: "Construction Drill Rigs",
    desc: "Hydraulic-powered and crafted for the most demanding construction and foundation projects, our Piling & Foundation Rigs are built to withstand extreme conditions, ensuring high efficiency and reliability in every borehole.",
    products: [
      { name: "CP 20", href: "/drilling-rigs/construction/cp-20", thumb: `${THUMB_BASE}/cp-20.png` },
      { name: "TP30", href: "/drilling-rigs/construction/tp-30", thumb: `${THUMB_BASE}/tp-30.png` },
      { name: "KPR", href: "/drilling-rigs/construction/kpr", thumb: `${THUMB_BASE}/kpr.png` },
    ],
  },
  {
    key: "exploration",
    label: "Exploration Drill Rigs",
    title: "Exploration Drill Rigs",
    desc: "Hydraulic-powered and built for tough soil investigations and geotechnical explorations, the Core Drilling Rigs are designed for precision and durability, providing accurate core sampling even in the most challenging terrains.",
    products: [
      { name: "CDR 150", href: "/drilling-rigs/exploration/core-drill-rig-150", thumb: `${THUMB_BASE}/core-drill-rig-150.png` },
      { name: "CDR 500", href: "/drilling-rigs/exploration/core-drill-rig-500", thumb: `${THUMB_BASE}/core-drill-rig-500.png` },
      { name: "CDR 750", href: "/drilling-rigs/exploration/core-drill-rig-750", thumb: `${THUMB_BASE}/core-drill-rig-750.png` },
      { name: "TMC 40", href: "/drilling-rigs/exploration/tmc", thumb: `${THUMB_BASE}/tmc.png` },
    ],
  },
  {
    key: "underground-drill-rigs",
    label: "Underground Drill Rigs",
    title: "Underground Drill Rigs",
    desc: "Built with the highest safety standards in mind, our Underground Production Drills ensure efficient, high-productivity drilling for underground mining operations, even in the most confined and hazardous environments.",
    products: [
      { name: "ITH 60", href: "/drilling-rigs/underground-drill-rigs/ith-60", thumb: `${THUMB_BASE}/ith-60.png` },
      { name: "KWD 10", href: "/drilling-rigs/underground-drill-rigs/kwd-10", thumb: `${THUMB_BASE}/kwd-10.png` },
    ],
  },
];

const DRILLING_TOOLS = [
  { label: "Down The Hole Drilling Tools", href: "/drilling-tools/dth-drilling-tools" },
  { label: "Rotary Drilling Tools", href: "/drilling-tools/rotary-drilling-tools" },
  { label: "KLR Drill Rods", href: "/drilling-tools/drill-rods" },
];

export function Header() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryPanel | null>(null);

  function closeProducts() {
    setProductsOpen(false);
    setActiveCategory(null);
  }

  useEffect(() => {
    if (!productsOpen && !mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeProducts();
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [productsOpen, mobileOpen]);

  return (
    <header className="relative z-50 bg-klr-header">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 py-3 md:px-8">
        <Link href="/" className="shrink-0">
          <Image
            src="/sites/klruniversal-com-3601ad32/root-8a5edab2/images/logo-klr.svg"
            alt="KLR Universal"
            width={64}
            height={62}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {NAV_LINKS[0] && (
            <Link href={NAV_LINKS[0].href} className="hover:text-klr-red">
              {NAV_LINKS[0].label}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setProductsOpen(true)}
            aria-expanded={productsOpen}
            aria-haspopup="true"
            className="hover:text-klr-red"
          >
            Products
          </button>
          {NAV_LINKS.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-klr-red">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CtaButton href="/contact-and-support" className="hidden md:inline-flex">
            Enquire Now
          </CtaButton>
          <button
            type="button"
            aria-label="Language"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-klr-red text-white"
          >
            <Globe className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-klr-red text-white md:hidden"
          >
            <Menu className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Products drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity ${
          productsOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!productsOpen}
        inert={!productsOpen}
      >
        <div className="absolute inset-0 bg-black/50" onClick={closeProducts} />

        {/* Category detail panel: full-screen on mobile, cascades left of the category list at md+ */}
        <div
          className={`absolute right-0 top-0 z-10 h-full w-full max-w-md overflow-y-auto bg-white p-8 shadow-2xl transition-transform duration-300 md:right-96 ${
            activeCategory ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {activeCategory && (
            <>
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="-ml-2 flex items-center gap-1 rounded px-2 py-1.5 text-sm text-black/50 hover:text-klr-red"
              >
                <ChevronLeft className="size-4" aria-hidden="true" /> Back
              </button>
              <h2 className="mt-4 text-3xl font-semibold text-klr-red">{activeCategory.title}</h2>
              {activeCategory.subtitle && (
                <p className="mt-2 text-sm font-semibold text-klr-red/80">{activeCategory.subtitle}</p>
              )}
              <p className="mt-3 text-sm text-black/70">{activeCategory.desc}</p>

              <div className="mt-6 grid grid-cols-3 gap-4">
                {activeCategory.products.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={closeProducts}
                    className="flex flex-col items-center gap-2 rounded-lg border border-black/10 p-2 text-center hover:border-klr-red"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image src={p.thumb} alt={p.name} fill className="object-contain" />
                    </div>
                    <span className="text-xs font-semibold">{p.name}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-klr-red p-8 text-white shadow-2xl transition-transform duration-300 ${
            productsOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Products</h2>
            <button
              type="button"
              aria-label="Close"
              onClick={closeProducts}
              className="rounded-full p-1 hover:bg-white/10"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <h3 className="mt-8 text-lg font-semibold">Drilling Rigs</h3>
          <ul className="mt-3 space-y-3">
            {DRILLING_RIGS.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(item)}
                  className={`text-left text-sm hover:text-white ${
                    activeCategory?.key === item.key ? "font-semibold text-white" : "text-white"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-lg font-semibold">Drilling Tools</h3>
          <ul className="mt-3 space-y-3">
            {DRILLING_TOOLS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={closeProducts}
                  className="text-sm text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-klr-red p-6 text-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Image
              src="/sites/klruniversal-com-3601ad32/root-8a5edab2/images/logo-mobile-menu.svg"
              alt="KLR"
              width={40}
              height={38}
            />
            <button
              type="button"
              aria-label="Close"
              onClick={() => setMobileOpen(false)}
              className="rounded-full p-1 hover:bg-white/10"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-5 text-base font-medium">
            {NAV_LINKS[0] && (
              <Link href={NAV_LINKS[0].href} onClick={() => setMobileOpen(false)}>
                {NAV_LINKS[0].label}
              </Link>
            )}
            <button
              type="button"
              className="text-left"
              onClick={() => {
                setMobileOpen(false);
                setProductsOpen(true);
              }}
            >
              Products
            </button>
            {NAV_LINKS.slice(1).map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <CtaButton
              href="/contact-and-support"
              variant="white"
              className="mt-4 justify-center"
            >
              Enquire Now
            </CtaButton>
          </nav>
        </div>
      </div>
    </header>
  );
}
