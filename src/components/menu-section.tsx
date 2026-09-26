import { ArrowRight } from "lucide-react"

import { BeeIcon, HoneycombIcon, HoneyDropIcon } from "@/components/icons"
import { ORDER_URL } from "@/lib/constants"

const MENU_ITEMS = [
  {
    name: "Honey Glazed Donuts",
    description: "Pillowy-soft donuts dipped in warm, raw honey glaze.",
    price: "$4.50",
    icon: HoneyDropIcon,
    badge: "Bestseller",
  },
  {
    name: "Bee's Knees Cookies",
    description: "Brown-butter cookies with honeycomb crunch and sea salt.",
    price: "$3.25",
    icon: HoneycombIcon,
    badge: null,
  },
  {
    name: "Golden Honey Cake",
    description: "Layered vanilla sponge soaked in honey syrup and cream.",
    price: "$32.00",
    icon: BeeIcon,
    badge: "New",
  },
  {
    name: "Honeycomb Croissants",
    description: "Buttery, flaky croissants laced with honeycomb butter.",
    price: "$5.00",
    icon: HoneycombIcon,
    badge: null,
  },
  {
    name: "Wildflower Muffins",
    description: "Moist muffins studded with wildflower honey drizzle.",
    price: "$3.75",
    icon: HoneyDropIcon,
    badge: null,
  },
  {
    name: "Royal Jelly Tart",
    description: "Silky honey custard tart in a toasted almond crust.",
    price: "$6.50",
    icon: BeeIcon,
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
            Our signature treats
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            A taste of what comes out of our ovens every day — every item
            made with real honey, never corn syrup.
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
