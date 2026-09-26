import { CandyOff, ShieldCheck, Vegan, WheatOff } from "lucide-react"

const FEATURES = [
  {
    icon: CandyOff,
    title: "100% Sugar-Free",
    description:
      "Every dessert is made with zero refined sugar, without losing an ounce of flavor.",
  },
  {
    icon: WheatOff,
    title: "Zero Maida",
    description:
      "No refined flour, ever — just our secret millet blend and clean ingredients.",
  },
  {
    icon: Vegan,
    title: "Vegan-Friendly",
    description:
      "Plant-based options across the menu, so everyone gets to indulge.",
  },
  {
    icon: ShieldCheck,
    title: "Clean & Transparent",
    description:
      "No preservatives, no shortcuts — just honest, wholesome ingredients.",
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
