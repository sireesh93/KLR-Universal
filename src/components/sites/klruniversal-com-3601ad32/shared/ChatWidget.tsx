"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import { products } from "@/content/klruniversal-com-3601ad32/products";
import { blogPosts } from "@/content/klruniversal-com-3601ad32/blog-posts";

/**
 * A small, retrieval-only assistant: it answers from the same structured
 * data already on the site (products, categories, blog titles) plus a fixed
 * set of company facts, with no external API and no new secret. It never
 * invents a spec -- every product/category reply links to the real page
 * rather than quoting a number, so it can't drift from what that page says.
 */

const CATEGORIES = [...new Map(products.map((p) => [p.category, p.categoryLabel])).entries()];

const DRILLING_RIG_PRODUCTS = products.map((p) => p.title);
const DRILLING_TOOL_PRODUCTS = [
  "Down The Hole Drilling Tools",
  "Rotary Drilling Tools",
  "KLR Drill Rods",
];

const COMPANY_FACTS =
  "KLR Universal has been manufacturing hydraulic drilling rigs and rock drilling tools in-house since 1984, from our Hyderabad facility. We're ISO 9001:2015 certified, with 4,500+ projects delivered across 60+ countries.";

type Message =
  | { role: "bot"; id: string; node: React.ReactNode }
  | { role: "user"; id: string; text: string };

type View = "chat" | "enquiry" | "sent";

let msgCounter = 0;
function nextId() {
  msgCounter += 1;
  return `m${msgCounter}`;
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-klr-red text-white">
        <Bot className="size-3.5" aria-hidden="true" />
      </span>
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-klr-offwhite px-3.5 py-2.5 text-sm text-black/80">
        {children}
      </div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-klr-red px-3.5 py-2.5 text-sm text-white">
        {text}
      </div>
    </div>
  );
}

function Chip({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-klr-red/30 bg-white px-3 py-1.5 text-xs font-medium text-klr-red transition-colors hover:bg-klr-red hover:text-white"
    >
      {label}
    </button>
  );
}

function searchSite(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return { products: [] as typeof products, posts: [] as typeof blogPosts };
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  const score = (haystack: string) =>
    words.reduce((n, w) => (haystack.toLowerCase().includes(w) ? n + 1 : n), 0);

  const matchedProducts = products
    .map((p) => ({ p, s: score(`${p.title} ${p.categoryLabel} ${p.category}`) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3)
    .map((r) => r.p);

  const matchedPosts = blogPosts
    .map((post) => ({ post, s: score(post.title) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 2)
    .map((r) => r.post);

  return { products: matchedProducts, posts: matchedPosts };
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (open && messages.length === 0) {
      addBot(
        <>
          <p>Hi! I&rsquo;m KLR&rsquo;s assistant. Ask me about our rigs, tools, or the company -- or jump straight to an enquiry.</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <Chip label="Browse Drill Rigs" onClick={() => showCategories()} />
            <Chip label="Drilling Tools" onClick={() => showTools()} />
            <Chip label="About KLR" onClick={() => showAbout()} />
            <Chip label="Get a Quote" onClick={() => setView("enquiry")} />
          </div>
        </>
      );
    }
    // The canned opener must fire once on first open, not on every message --
    // adding the handlers below as deps would re-fire it on each bot reply.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, view]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closePanel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function closePanel() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  function addBot(node: React.ReactNode) {
    setMessages((m) => [...m, { role: "bot", id: nextId(), node }]);
  }
  function addUser(text: string) {
    setMessages((m) => [...m, { role: "user", id: nextId(), text }]);
  }

  function showCategories() {
    addUser("Browse Drill Rigs");
    addBot(
      <>
        <p>Pick a category:</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {CATEGORIES.map(([slug, label]) => (
            <Chip key={slug} label={label} onClick={() => showCategoryProducts(slug, label)} />
          ))}
        </div>
      </>
    );
  }

  function showCategoryProducts(slug: string, label: string) {
    addUser(label);
    const items = products.filter((p) => p.category === slug);
    addBot(
      <>
        <p>{label} -- {items.length} model{items.length === 1 ? "" : "s"}:</p>
        <ul className="mt-2 space-y-1.5">
          {items.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/drilling-rigs/${p.category}/${p.slug}`}
                className="font-medium text-klr-red underline-offset-2 hover:underline"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-2.5">
          <Chip label="Get a Quote" onClick={() => setView("enquiry")} />
        </div>
      </>
    );
  }

  function showTools() {
    addUser("Drilling Tools");
    addBot(
      <>
        <p>KLR Universal&rsquo;s drilling tools range:</p>
        <ul className="mt-2 space-y-1.5">
          <li>
            <Link href="/drilling-tools/dth-drilling-tools" className="font-medium text-klr-red hover:underline">
              Down The Hole (DTH) Drilling Tools
            </Link>
          </li>
          <li>
            <Link href="/drilling-tools/rotary-drilling-tools" className="font-medium text-klr-red hover:underline">
              Rotary Drilling Tools
            </Link>
          </li>
          <li>
            <Link href="/drilling-tools/drill-rods" className="font-medium text-klr-red hover:underline">
              KLR Drill Rods
            </Link>
          </li>
        </ul>
        <div className="mt-2.5">
          <Chip label="Get a Quote" onClick={() => setView("enquiry")} />
        </div>
      </>
    );
  }

  function showAbout() {
    addUser("About KLR");
    addBot(
      <>
        <p>{COMPANY_FACTS}</p>
        <p className="mt-2.5">
          <Link href="/about-us" className="font-medium text-klr-red hover:underline">
            Visit the About page &rarr;
          </Link>
        </p>
      </>
    );
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    addUser(q);
    setInput("");

    const { products: foundProducts, posts: foundPosts } = searchSite(q);

    if (foundProducts.length === 0 && foundPosts.length === 0) {
      addBot(
        <>
          <p>
            I couldn&rsquo;t find a page for that. Try a product name like
            &ldquo;DTHR-300&rdquo;, or ask about a category.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            <Chip label="Browse Drill Rigs" onClick={() => showCategories()} />
            <Chip label="Get a Quote" onClick={() => setView("enquiry")} />
          </div>
        </>
      );
      return;
    }

    addBot(
      <>
        {foundProducts.length > 0 && (
          <>
            <p>Products matching that:</p>
            <ul className="mt-1.5 space-y-1.5">
              {foundProducts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/drilling-rigs/${p.category}/${p.slug}`}
                    className="font-medium text-klr-red hover:underline"
                  >
                    {p.title}
                  </Link>{" "}
                  <span className="text-black/50">({p.categoryLabel})</span>
                </li>
              ))}
            </ul>
          </>
        )}
        {foundPosts.length > 0 && (
          <>
            <p className={foundProducts.length > 0 ? "mt-3" : ""}>From our blog:</p>
            <ul className="mt-1.5 space-y-1.5">
              {foundPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={post.standaloneUrl ? `/${post.slug}` : `/blog/${post.slug}`}
                    className="font-medium text-klr-red hover:underline"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }

  async function handleEnquirySubmit(e: FormEvent<HTMLFormElement>) {
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
        setError(result.error ?? "We couldn't send your enquiry. Please email sales@klruniversal.com.");
        return;
      }
      setView("sent");
    } catch {
      setError("We couldn't reach the server. Please check your connection, or email sales@klruniversal.com.");
    } finally {
      setSubmitting(false);
    }
  }

  const productOptions =
    category === "Drilling Rigs"
      ? DRILLING_RIG_PRODUCTS
      : category === "Drilling Tools"
        ? DRILLING_TOOL_PRODUCTS
        : [];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="mb-3 flex h-[min(32rem,70vh)] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between bg-klr-red px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-white/15">
                <Bot className="size-4" aria-hidden="true" />
              </span>
              <p id={titleId} className="text-sm font-semibold">
                KLR Assistant
              </p>
            </div>
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close chat"
              className="rounded-full p-1 hover:bg-white/15"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          {view === "enquiry" || view === "sent" ? (
            <div className="flex-1 overflow-y-auto p-4">
              {view === "sent" ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <span className="flex size-10 items-center justify-center rounded-full bg-klr-red/10 text-klr-red">
                    <Bot className="size-5" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-medium text-black/80">
                    Thanks -- we&rsquo;ve received your enquiry and will be in touch shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setView("chat")}
                    className="mt-1 rounded-full border border-klr-red/30 px-4 py-1.5 text-xs font-medium text-klr-red hover:bg-klr-red hover:text-white"
                  >
                    Back to chat
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => setView("chat")}
                    className="mb-1 self-start text-xs font-medium text-black/50 hover:text-klr-red"
                  >
                    &larr; Back to chat
                  </button>
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                  {[
                    { name: "name", label: "Name", type: "text" },
                    { name: "email", label: "E-mail", type: "email" },
                    { name: "phone", label: "Phone", type: "tel" },
                    { name: "country", label: "Country", type: "text" },
                    { name: "drilling-depth", label: "Drilling Depth (Ex: 5m)", type: "text" },
                    { name: "drilling-diameter", label: "Drilling Diameter (Ex: 165mm)", type: "text" },
                  ].map((f) => (
                    <input
                      key={f.name}
                      name={f.name}
                      type={f.type}
                      placeholder={f.label}
                      required
                      aria-label={f.label}
                      className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm placeholder:text-black/40 focus:border-klr-red focus:outline-none"
                    />
                  ))}
                  <select
                    name="select-category"
                    required
                    aria-label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-klr-red focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option>Drilling Rigs</option>
                    <option>Drilling Tools</option>
                  </select>
                  <select
                    key={category}
                    name="select-product"
                    required
                    aria-label="Product"
                    disabled={productOptions.length === 0}
                    defaultValue=""
                    className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-klr-red focus:outline-none disabled:opacity-50"
                  >
                    <option value="" disabled>
                      {category ? "Select Product" : "Select a category first"}
                    </option>
                    {productOptions.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                  <textarea
                    name="message"
                    rows={2}
                    placeholder="Your requirements"
                    required
                    aria-label="Your requirements"
                    className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm placeholder:text-black/40 focus:border-klr-red focus:outline-none"
                  />
                  {error && (
                    <p role="alert" className="rounded-lg bg-klr-red/10 px-3 py-2 text-xs text-klr-red">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 rounded-full bg-klr-red px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-klr-red-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Submit Enquiry"}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <>
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
                {messages.map((m) =>
                  m.role === "bot" ? <BotBubble key={m.id}>{m.node}</BotBubble> : <UserBubble key={m.id} text={m.text} />
                )}
              </div>
              <form onSubmit={handleSearch} className="flex shrink-0 items-center gap-2 border-t border-black/10 p-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about a product..."
                  aria-label="Ask a question"
                  className="w-full rounded-full border border-black/10 px-3.5 py-2 text-sm placeholder:text-black/40 focus:border-klr-red focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-klr-red text-white transition-colors hover:bg-klr-red-dark"
                >
                  <Send className="size-3.5" aria-hidden="true" />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="flex size-14 items-center justify-center rounded-full bg-klr-red text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-klr-red-dark active:scale-95"
      >
        {open ? <X className="size-6" aria-hidden="true" /> : <MessageCircle className="size-6" aria-hidden="true" />}
      </button>
    </div>
  );
}
