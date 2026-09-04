"use client";

import { useState, type FormEvent } from "react";

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm placeholder:text-black/40 focus:border-klr-red focus:outline-none";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="grid overflow-hidden rounded-2xl md:grid-cols-2">
          <div className="relative flex flex-col justify-center overflow-hidden bg-klr-red p-10 text-white">
            <h2 className="text-3xl font-medium leading-tight md:text-4xl">
              Let&rsquo;s Build Something Groundbreaking
            </h2>
            <p className="mt-4 text-white/90">
              Whether you&rsquo;re looking for the right rig, spares, or
              tailored solutions — we&rsquo;re just a message away.
            </p>
          </div>

          <div className="bg-klr-offwhite p-8">
            {submitted ? (
              <p className="text-sm font-medium text-klr-red">
                Thanks — we&rsquo;ve received your enquiry and will be in
                touch shortly.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input className={inputClass} placeholder="Name*" name="name" />
                <input className={inputClass} placeholder="E-mail*" name="email" type="email" />
                <input className={inputClass} placeholder="Phone*" name="phone" type="tel" />
                <input className={inputClass} placeholder="Country*" name="country" />
                <input
                  className={inputClass}
                  placeholder="Drilling Depth (Ex: 5m or 5ft)*"
                  name="drilling-depth"
                />
                <input
                  className={inputClass}
                  placeholder="Drilling Diameter (Ex: 165 mm or 6.5&apos;)*"
                  name="drilling-diameter"
                />
                <select className={inputClass} name="select-category" defaultValue="">
                  <option value="" disabled>
                    Select Category*
                  </option>
                  <option>Drilling Rigs</option>
                  <option>Drilling Tools</option>
                </select>
                <select className={inputClass} name="select-product" defaultValue="">
                  <option value="" disabled>
                    Select Product*
                  </option>
                </select>
                <textarea
                  className={`${inputClass} sm:col-span-2`}
                  rows={4}
                  placeholder="Describe your needs, including any custom requirements you may have.*"
                  name="message"
                />
                <button
                  type="submit"
                  className="w-fit rounded-full bg-klr-red px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-klr-red-dark"
                >
                  Get In Touch
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
