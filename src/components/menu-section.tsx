import {
  ArrowRight,
  CakeSlice,
  Cookie,
  CupSoda,
  Hamburger,
  IceCreamBowl,
  Pizza,
} from "lucide-react"

import { ORDER_URL } from "@/lib/constants"

const MENU_ITEMS = [
  {
    name: "Dubai Viral Mini Burgers",
    description:
      "Vegan, gluten-free sliders inspired by Dubai's viral trend — zero maida, zero preservatives.",
    price: "₹199",
    icon: Hamburger,
    badge: "Bestseller",
  },
  {
    name: "Sugar-Free Boba Tea",
    description:
      "Classic bubble tea, reinvented — full flavor, zero added sugar.",
    price: "₹149",
    icon: CupSoda,
    badge: "New",
  },
  {
    name: "Millet Chocolate Cake",
    description:
      "Rich chocolate cake baked with our secret millet blend — no maida, no refined sugar.",
    price: "₹329",
    icon: CakeSlice,
    badge: null,
  },
  {
    name: "Guilt-Free Cheesecake",
    description:
      "Silky, creamy cheesecake that's sugar-free and gluten-free, without compromising on taste.",
    price: "₹249",
    icon: IceCreamBowl,
    badge: null,
  },
  {
    name: "Multigrain Veggie Pizza",
    description:
      "Wholesome continental pizza on a multigrain, gluten-free base.",
    price: "₹279",
    icon: Pizza,
    badge: null,
  },
  {
    name: "Sugar-Free Brownie",
    description:
      "Fudgy, chocolatey brownie made clean — sugar-free, gluten-free, still indulgent.",
    price: "₹129",
    icon: Cookie,
    badge: "Bestseller",
  },
]

export function MenuSection() {
  return (
    <section id="menu" className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-extrabold uppercase tracking-widest text-accent">
            Our Menu
          </span>
          <h2 className="mt-3 font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
            Our signature guilt-free treats
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Every item on our menu is sugar-free and gluten-free by design —
            clean ingredients, zero maida, never a compromise on taste.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <article
                key={item.name}
                className="group relative flex flex-col rounded-3xl border border-border/70 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                {item.badge ? (
                  <span className="absolute right-5 top-5 rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-accent-foreground">
                    {item.badge}
                  </span>
                ) : null}

                <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-accent">
                  <Icon className="size-7" />
                </span>

                <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
                  {item.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
                  <span className="font-heading text-lg font-extrabold text-foreground">
                    {item.price}
                  </span>
                  <a
                    href={ORDER_URL}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-accent transition-colors group-hover:text-accent/80"
                  >
                    Order now
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
