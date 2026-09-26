import { Clock, Heart, Leaf, Truck } from "lucide-react"

const FEATURES = [
  {
    icon: Leaf,
    title: "Naturally Sourced",
    description:
      "Raw honey from local apiaries and simple, real ingredients — nothing artificial.",
  },
  {
    icon: Clock,
    title: "Baked Fresh Daily",
    description:
      "Every batch is mixed and baked before sunrise so it reaches you at its best.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Same-day delivery across the city, or grab it warm at pickup counters.",
  },
  {
    icon: Heart,
    title: "Made With Love",
    description:
      "Family recipes, handled by hand, refined over three generations of bakers.",
  },
]

export function FeaturesSection() {
  return (
    <section id="why-us" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-extrabold uppercase tracking-widest text-accent">
          Why Yummy Bee
        </span>
        <h2 className="mt-3 font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
          Why everyone&apos;s buzzing
        </h2>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-border/70 bg-card p-7 text-center shadow-sm transition-shadow hover:shadow-lg"
          >
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/15 text-accent">
              <feature.icon className="size-7" />
            </span>
            <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
