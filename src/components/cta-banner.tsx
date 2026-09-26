import { HoneycombPattern } from "@/components/icons"
import { OrderNowButton } from "@/components/order-now-button"

export function CtaBanner() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-accent px-8 py-14 text-center shadow-2xl shadow-primary/30 sm:px-16 sm:py-20">
        <HoneycombPattern className="absolute inset-0 h-full w-full text-primary-foreground/10" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold text-primary-foreground sm:text-4xl">
            Ready to taste the buzz?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-primary-foreground/85 sm:text-lg">
            Order fresh, honey-kissed treats for pickup or delivery — made
            daily, just for you.
          </p>
          <div className="mt-8 flex justify-center">
            <OrderNowButton
              variant="secondary"
              className="bg-card text-foreground hover:bg-card/90"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
