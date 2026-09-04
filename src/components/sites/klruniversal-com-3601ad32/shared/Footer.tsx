import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const ASSET_BASE =
  "/sites/klruniversal-com-3601ad32/root-8a5edab2/images";

const QUICK_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/#solutions" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact & Support", href: "/contact-and-support" },
];

const DRILLING_RIGS = [
  { label: "Water Well Drill Rigs", href: "/drilling-rigs/water-well/dthr-150" },
  { label: "Surface Mining & Quarrying Drill Rigs", href: "/drilling-rigs/surface-mining/ea-20-30" },
  { label: "Construction Drill Rigs", href: "/drilling-rigs/construction/tp-30" },
  { label: "Exploration Drill Rigs", href: "/drilling-rigs/exploration/core-drill-rig-150" },
  { label: "Underground Drill Rigs", href: "/drilling-rigs/underground-drill-rigs/ith-60" },
];

const DRILLING_TOOLS = [
  { label: "Down The Hole Drilling Tools", href: "/drilling-tools/dth-drilling-tools" },
  { label: "Rotary Drilling Tools", href: "/drilling-tools/rotary-drilling-tools" },
  { label: "KLR Drill Rods", href: "/drilling-tools/drill-rods" },
];

const SOCIAL = [
  { icon: "social-youtube.svg", href: "https://www.youtube.com/@klrindustries2886", label: "YouTube" },
  { icon: "social-linkedin.svg", href: "https://www.linkedin.com/company/klr-industries/", label: "LinkedIn" },
  { icon: "social-twitter.svg", href: "#", label: "X / Twitter" },
];

function FooterCol({
  heading,
  items,
}: {
  heading: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{heading}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="text-sm text-white/60 hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-klr-dark py-12 text-white">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <div>
            <Image
              src={`${ASSET_BASE}/logo-klr.svg`}
              alt="KLR Universal"
              width={64}
              height={62}
              className="brightness-0 invert"
            />
            <p className="mt-4 text-sm text-white/60">
              Survey No. 222/1 Near Nagarjuna Nagar, Colony Cherlapally Road,
              RR District, Hyderabad-500062, Telangana, India
            </p>
            <a
              href="mailto:sales@klruniversal.com"
              className="mt-3 flex items-center gap-2 text-sm text-white/60 hover:text-white"
            >
              <Mail className="size-4" /> sales@klruniversal.com
            </a>
            <a
              href="tel:+919030327878"
              className="mt-2 flex items-center gap-2 text-sm text-white/60 hover:text-white"
            >
              <Phone className="size-4" /> +91 9030327878
            </a>
          </div>

          <FooterCol heading="Quick Links" items={QUICK_LINKS} />
          <FooterCol heading="Drilling Rigs" items={DRILLING_RIGS} />
          <FooterCol heading="Drilling Tools" items={DRILLING_TOOLS} />

          <div>
            <h3 className="text-sm font-semibold text-white">Follow Us</h3>
            <div className="mt-4 flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                  className="block opacity-90 transition-opacity hover:opacity-100"
                >
                  <Image src={`${ASSET_BASE}/${s.icon}`} alt="" width={36} height={36} />
                </a>
              ))}
            </div>
            <Image
              src={`${ASSET_BASE}/badge-make-in-india.svg`}
              alt="Make in India"
              width={90}
              height={90}
              className="mt-8"
            />
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          Copyright © {new Date().getFullYear()} KLR UNIVERSAL.
        </div>
      </div>
    </footer>
  );
}
