"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import { CtaButton } from "../shared/CtaButton";

const NAV_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact & Support", href: "/contact-and-support" },
];

const DRILLING_RIGS = [
  "Water Well Drill Rigs",
  "Surface Mining & Quarrying Drill Rigs",
  "Construction Drill Rigs",
  "Exploration Drill Rigs",
  "Underground Drill Rigs",
];

const DRILLING_TOOLS = [
  "Down The Hole Drilling Tools",
  "Rotary Drilling Tools",
  "KLR Drill Rods",
];

export function Header() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-40 bg-klr-header">
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
          <CtaButton href="/contact-us/" className="hidden md:inline-flex">
            Enquire Now
          </CtaButton>
          <button
            type="button"
            aria-label="Language"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-klr-red text-white"
          >
            <Globe className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-klr-red text-white md:hidden"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>

      {/* Products drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity ${
          productsOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setProductsOpen(false)}
        />
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
              onClick={() => setProductsOpen(false)}
              className="rounded-full p-1 hover:bg-white/10"
            >
              <X className="size-6" />
            </button>
          </div>

          <h3 className="mt-8 text-lg font-semibold">Drilling Rigs</h3>
          <ul className="mt-3 space-y-3">
            {DRILLING_RIGS.map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-white/90 hover:text-white">
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-lg font-semibold">Drilling Tools</h3>
          <ul className="mt-3 space-y-3">
            {DRILLING_TOOLS.map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-white/90 hover:text-white">
                  {item}
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
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-white p-6 shadow-2xl transition-transform duration-300 ${
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
              className="rounded-full p-1 hover:bg-black/5"
            >
              <X className="size-6" />
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
            <CtaButton href="/contact-us/" className="mt-4 justify-center">
              Enquire Now
            </CtaButton>
          </nav>
        </div>
      </div>
    </header>
  );
}
