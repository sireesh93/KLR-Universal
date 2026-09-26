import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import {
  BeeIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
} from "@/components/icons"
import { NewsletterForm } from "@/components/newsletter-form"
import { ORDER_URL } from "@/lib/constants"

const QUICK_LINKS = [
  { href: "#about", label: "Our Story" },
  { href: "#menu", label: "Menu" },
  { href: "#why-us", label: "Why Us" },
  { href: "#testimonials", label: "Reviews" },
]

const MENU_CATEGORIES = ["Donuts", "Cookies", "Cakes", "Pastries", "Muffins"]

const SOCIALS = [
  { icon: InstagramIcon, label: "Instagram" },
  { icon: FacebookIcon, label: "Facebook" },
  { icon: XIcon, label: "X (Twitter)" },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <BeeIcon className="size-6" />
              </span>
              <span className="font-heading text-xl font-extrabold text-background">
                Yummy Bee
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">
              Small-batch, honey-kissed treats baked fresh every day. Sweetness,
              delivered.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <social.icon className="size-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-extrabold uppercase tracking-widest text-background/60">
              Quick Links
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-semibold text-background/80 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-extrabold uppercase tracking-widest text-background/60">
              Menu
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {MENU_CATEGORIES.map((category) => (
                <li key={category}>
                  <a
                    href={ORDER_URL}
                    className="text-sm font-semibold text-background/80 transition-colors hover:text-primary"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-extrabold uppercase tracking-widest text-background/60">
              Visit Us
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm font-semibold text-background/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4.5 shrink-0 text-primary" />
                221 Honeycomb Lane, Sweetville
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4.5 shrink-0 text-primary" />
                <a href="tel:+15551234567" className="hover:text-primary">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4.5 shrink-0 text-primary" />
                <a href="mailto:hello@yummybee.com" className="hover:text-primary">
                  hello@yummybee.com
                </a>
              </li>
            </ul>

            <p className="mt-6 text-sm font-bold text-background">
              Get sweet deals in your inbox
            </p>
            <div className="mt-3">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-background/15 pt-6 text-sm text-background/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Yummy Bee Bakery. All rights reserved.</p>
          <p>Baked with honey and a little bit of magic.</p>
        </div>
      </div>
    </footer>
  )
}
