"use client";

import { useState, type FormEvent } from "react";
import { products } from "@/content/klruniversal-com-3601ad32/products";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm placeholder:text-black/40 focus:border-klr-red focus:outline-none";
const labelClass = "text-xs font-medium text-black/60";

const DRILLING_RIG_PRODUCTS = products.map((p) => p.title);
const DRILLING_TOOL_PRODUCTS = [
  "Down The Hole Drilling Tools",
  "Rotary Drilling Tools",
  "KLR Drill Rods",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("");

  const productOptions =
    category === "Drilling Rigs"
      ? DRILLING_RIG_PRODUCTS
      : category === "Drilling Tools"
        ? DRILLING_TOOL_PRODUCTS
        : [];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(
          result.error ??
            "We couldn't send your enquiry. Please email sales@klruniversal.com."
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setError(
        "We couldn't reach the server. Please check your connection, or email sales@klruniversal.com."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="grid overflow-hidden rounded-2xl md:grid-cols-2">
          <div className="relative flex flex-col justify-center overflow-hidden bg-klr-red p-10 text-white">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              Let&rsquo;s Build Something Groundbreaking
            </h2>
            <p className="mt-4 text-white">
              Whether you&rsquo;re looking for the right rig, spares, or
              tailored solutions — we&rsquo;re just a message away.
            </p>
          </div>

          <div className="bg-klr-offwhite p-8">
            {submitted ? (
              <p role="status" className="text-sm font-medium text-klr-red">
                Thanks — we&rsquo;ve received your enquiry and will be in
                touch shortly.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Honeypot: hidden from people, catches bots that fill everything. */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-name" className={labelClass}>
                    Name*
                  </label>
                  <input id="cf-name" className={inputClass} name="name" required aria-required="true" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-email" className={labelClass}>
                    E-mail*
                  </label>
                  <input
                    id="cf-email"
                    className={inputClass}
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-phone" className={labelClass}>
                    Phone*
                  </label>
                  <input
                    id="cf-phone"
                    className={inputClass}
                    name="phone"
                    type="tel"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-country" className={labelClass}>
                    Country*
                  </label>
                  <input id="cf-country" className={inputClass} name="country" required aria-required="true" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-depth" className={labelClass}>
                    Drilling Depth (Ex: 5m or 5ft)*
                  </label>
                  <input
                    id="cf-depth"
                    className={inputClass}
                    name="drilling-depth"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-diameter" className={labelClass}>
                    Drilling Diameter (Ex: 165 mm or 6.5&apos;)*
                  </label>
                  <input
                    id="cf-diameter"
                    className={inputClass}
                    name="drilling-diameter"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-category" className={labelClass}>
                    Category*
                  </label>
                  <select
                    id="cf-category"
                    className={inputClass}
                    name="select-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    aria-required="true"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option>Drilling Rigs</option>
                    <option>Drilling Tools</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-product" className={labelClass}>
                    Product*
                  </label>
                  <select
                    key={category}
                    id="cf-product"
                    className={inputClass}
                    name="select-product"
                    defaultValue=""
                    required
                    aria-required="true"
                    disabled={productOptions.length === 0}
                  >
                    <option value="" disabled>
                      {category ? "Select Product" : "Select a category first"}
                    </option>
                    {productOptions.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="cf-message" className={labelClass}>
                    Your Requirements*
                  </label>
                  <textarea
                    id="cf-message"
                    className={inputClass}
                    rows={4}
                    placeholder="Describe your needs, including any custom requirements you may have."
                    name="message"
                    required
                    aria-required="true"
                  />
                </div>
                {error && (
                  <p
                    role="alert"
                    className="rounded-lg bg-klr-red/10 px-4 py-3 text-sm text-klr-red sm:col-span-2"
                  >
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-fit rounded-full bg-klr-red px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-klr-red-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Get In Touch"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
