import { Quote, Star } from "lucide-react"

const TESTIMONIALS = [
  {
    quote:
      "Finally a dessert I don't feel guilty about ordering twice in one day. The millet chocolate cake tastes like a proper indulgence, not a diet snack.",
    name: "Ananya Rao",
    role: "Jubilee Hills, Hyderabad",
  },
  {
    quote:
      "The sugar-free boba tea is unreal — you genuinely can't tell there's no sugar in it. My whole office orders it now.",
    name: "Kiran Reddy",
    role: "Kondapur, Hyderabad",
  },
  {
    quote:
      "Ordered the Dubai mini burgers for a family dinner and they disappeared in minutes — vegan, gluten-free, and nobody could tell.",
    name: "Meera Iyer",
    role: "JP Nagar, Bangalore",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-secondary/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-extrabold uppercase tracking-widest text-accent">
            Reviews
          </span>
          <h2 className="mt-3 font-heading text-4xl font-extrabold text-foreground sm:text-5xl">
            Loved by our community
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col rounded-3xl border border-border/70 bg-card p-7 shadow-sm"
            >
              <Quote className="size-7 text-primary" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/85">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <figcaption className="mt-3">
                <p className="font-heading font-bold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
