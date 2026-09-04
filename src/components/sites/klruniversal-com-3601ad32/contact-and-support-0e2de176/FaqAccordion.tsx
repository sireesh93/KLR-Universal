"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type FaqItem = { q: string; a: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-8 space-y-3 text-left">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q} className="rounded-lg bg-klr-offwhite">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium"
            >
              {item.q}
              {open ? (
                <Minus className="size-4 shrink-0" aria-hidden="true" />
              ) : (
                <Plus className="size-4 shrink-0" aria-hidden="true" />
              )}
            </button>
            {open && (
              <p id={`faq-panel-${i}`} className="px-5 pb-4 text-sm text-black/60">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
