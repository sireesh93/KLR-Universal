"use client"

import { FormEvent, useState } from "react"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="flex items-center gap-2 text-sm font-semibold text-primary-foreground">
        <Check className="size-4" />
        You&apos;re on the list — sweet deals coming soon!
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm gap-2">
      <Input
        type="email"
        required
        placeholder="you@example.com"
        aria-label="Email address"
        className="border-white/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-white/40"
      />
      <Button
        type="submit"
        size="icon-lg"
        className="shrink-0 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90"
        aria-label="Subscribe"
      >
        <ArrowRight className="size-4.5" />
      </Button>
    </form>
  )
}
