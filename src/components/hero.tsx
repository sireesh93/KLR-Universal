import { Star } from "lucide-react"

import { BeeIcon, HoneycombPattern, HoneyDropIcon } from "@/components/icons"
import { OrderNowButton } from "@/components/order-now-button"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/70 via-background to-background">
      <HoneycombPattern className="pointer-events-none absolute inset-x-0 top-0 h-[640px] w-full text-primary/10" />
      <div className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-64 size-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-4 py-1.5 text-sm font-bold text-accent">
            <BeeIcon className="size-4" />
            Small-batch &amp; honey-kissed
          </div>

          <h1 className="mt-6 max-w-xl font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Deliciously golden.
            <br />
            Irresistibly{" "}
            <span className="relative inline-block text-accent">
              yummy.
              <svg
                viewBox="0 0 200 20"
                className="absolute -bottom-2 left-0 h-4 w-full text-primary"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 15C40 4 100 3 198 12"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Yummy Bee bakes small-batch pastries, cookies and cakes with real,
            raw honey and simple ingredients — baked fresh every morning and
            ready for pickup or delivery.
          </p>

          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <OrderNowButton className="w-full sm:w-auto" />
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              className="h-12 w-full rounded-full border-2 border-foreground/15 bg-card px-7 text-base font-bold sm:w-auto"
              render={<a href="#menu">Explore the menu</a>}
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4.5 fill-primary text-primary"
                />
              ))}
              <span className="ml-1 text-sm font-bold text-foreground">
                4.9/5
              </span>
              <span className="text-sm text-muted-foreground">
                from 2,300+ reviews
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary/90 to-accent/80 shadow-2xl shadow-primary/30">
            <HoneycombPattern className="absolute inset-0 h-full w-full text-primary-foreground/15" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BeeIcon className="size-40 text-primary-foreground/90 drop-shadow-lg" />
            </div>
            <HoneyDropIcon className="absolute left-10 top-10 size-8 text-primary-foreground/70" />
            <HoneyDropIcon className="absolute bottom-16 right-14 size-10 text-primary-foreground/50" />
          </div>

          <div className="absolute -left-4 top-6 flex items-center gap-2.5 rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-lg sm:-left-8">
            <span className="flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent">
              <HoneyDropIcon className="size-5" />
            </span>
            <div className="text-sm">
              <p className="font-bold text-foreground">100% Natural</p>
              <p className="text-muted-foreground">Raw local honey</p>
            </div>
          </div>

          <div className="absolute -bottom-6 right-2 flex items-center gap-2.5 rounded-2xl border border-border/70 bg-card px-4 py-3 shadow-lg sm:-right-6">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/20 text-accent">
              <BeeIcon className="size-5" />
            </span>
            <div className="text-sm">
              <p className="font-bold text-foreground">Baked Daily</p>
              <p className="text-muted-foreground">Fresh every morning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
