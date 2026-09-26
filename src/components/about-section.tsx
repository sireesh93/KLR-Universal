import { Check } from "lucide-react"

import { BeeIcon, HoneycombPattern, HoneyDropIcon } from "@/components/icons"

const STORY_POINTS = [
  "Real, raw honey sourced from local apiaries",
  "No preservatives, no shortcuts — ever",
  "Fresh batches baked before sunrise, daily",
]

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-4/5 w-full max-w-md overflow-hidden rounded-[2rem] bg-secondary">
            <HoneycombPattern className="absolute inset-0 h-full w-full text-primary/25" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="flex size-24 items-center justify-center rounded-full bg-primary/90 shadow-xl shadow-primary/30">
                <HoneyDropIcon className="size-12 text-primary-foreground" />
              </span>
              <p className="font-heading text-lg font-bold text-foreground/70">
                Est. 2013
              </p>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-4 flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-5 py-4 shadow-lg sm:-right-10">
            <BeeIcon className="size-8 text-accent" />
            <div className="text-sm">
              <p className="font-bold text-foreground">Family owned</p>
              <p className="text-muted-foreground">Three generations strong</p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="text-sm font-extrabold uppercase tracking-widest text-accent">
            Our Story
          </span>
          <h2 className="mt-3 font-heading text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
            Started with one hive, one oven, and a lot of buzz
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Yummy Bee began in a tiny kitchen with a single question: what if
            dessert tasted like sunshine? A decade later, we&apos;re still
            answering it — one honey-glazed batch at a time, using the same
            simple ingredients and slow methods we started with.
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            {STORY_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-accent">
                  <Check className="size-3.5" />
                </span>
                <span className="text-base font-semibold text-foreground/85">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
