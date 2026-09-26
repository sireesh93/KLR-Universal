const STATS = [
  { value: "15+", label: "Cafés across India" },
  { value: "0g", label: "Refined sugar, always" },
  { value: "100%", label: "Gluten & maida free" },
  { value: "4.8★", label: "Average rating" },
]

export function StatsStrip() {
  return (
    <section className="border-y border-border/70 bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-10 sm:px-8 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-3xl font-extrabold text-accent sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
