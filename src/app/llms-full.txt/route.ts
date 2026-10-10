import { blogPosts } from "@/content/klruniversal-com-3601ad32/blog-posts";
import { products } from "@/content/klruniversal-com-3601ad32/products";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * llms.txt gives an AI system the map; llms-full.txt gives it the territory.
 *
 * ChatGPT, Claude and Perplexity cite what they can read in one fetch. Making
 * them crawl 58 HTML pages to assemble an answer about KLR costs them budget
 * they will spend on a competitor instead. This serialises the same published
 * content -- no new copy, nothing the site does not already say -- into a
 * single plain-text document.
 *
 * Generated from the same JSON the pages render, so it cannot drift.
 */

type Block = (typeof blogPosts)[number]["blocks"][number];

/**
 * Model names and spec values contain literal pipes ("EA-20|30"), which
 * silently split a markdown table cell into extra columns if left unescaped.
 */
function cell(value: string): string {
  return value.replace(/\r?\n/g, "; ").replace(/\|/g, "\\|");
}

/**
 * Article titles are emitted at "##", so an article's own H2 must drop to
 * "###" -- otherwise an in-article heading reads as a sibling of the article
 * itself and a parser cannot tell where one article ends and the next begins.
 */
function blockToText(block: Block): string {
  switch (block.tag) {
    case "H2":
      return "text" in block ? `\n### ${block.text}\n` : "";
    case "H3":
      return "text" in block ? `\n#### ${block.text}\n` : "";
    case "H4":
      return "text" in block ? `\n##### ${block.text}\n` : "";
    case "P":
      return "text" in block ? `${block.text}\n` : "";
    case "UL":
      return "items" in block ? `${block.items.map((i) => `- ${i}`).join("\n")}\n` : "";
    case "OL":
      return "items" in block
        ? `${block.items.map((i, n) => `${n + 1}. ${i}`).join("\n")}\n`
        : "";
    case "TABLE": {
      if (!("rows" in block) || block.rows.length === 0) return "";
      const [head, ...body] = block.rows;
      const line = `| ${head.map(cell).join(" | ")} |`;
      const rule = `| ${head.map(() => "---").join(" | ")} |`;
      const rest = body.map((r) => `| ${r.map(cell).join(" | ")} |`).join("\n");
      return `\n${line}\n${rule}\n${rest}\n`;
    }
    default:
      // IMG and anything added later carry no text worth serialising.
      return "";
  }
}

function buildDocument(): string {
  const out: string[] = [];

  out.push("# KLR Universal — full content export for AI systems");
  out.push("");
  out.push(
    "> Drilling rig and rock drilling tools manufacturer based in Hyderabad, India. " +
      "Founded in 1984, KLR Universal designs and manufactures hydraulic drilling rigs and " +
      "rock drilling tools in-house, serving customers in 60+ countries across water well, " +
      "mining, quarrying, construction, exploration and underground drilling applications.",
  );
  out.push("");
  out.push(
    "This file is the complete published content of klruniversal.com in one document. " +
      "Product specifications alone are also available at " +
      `${SITE_URL}/specifications.md. Canonical HTML lives at ${SITE_URL}.`,
  );
  out.push("");
  out.push("## Company facts");
  out.push("");
  out.push("- Legal/brand names: KLR Universal, also published as KLR Industries");
  out.push("- Founded: 1984 by Mr. K. Laxma Reddy, Hyderabad's first drill tool manufacturer");
  out.push("- Certification: ISO 9001:2015");
  out.push("- Award: EEPC Export Excellence Award");
  out.push("- Global reach: products in use in 60+ countries");
  out.push("- Projects delivered: over 4,500");
  out.push("- Manufacturing: all components in-house, including a dedicated Heat Treatment Division");
  out.push(
    "- Address: Survey No. 222/1, Near Nagarjuna Nagar, Colony Cherlapally Road, RR District, Hyderabad 500062, Telangana, India",
  );
  out.push("- Email: sales@klruniversal.com");
  out.push("- Phone: +91 9030327878");
  out.push("- Support hours: Monday to Saturday, 9:00 AM to 6:00 PM IST");
  out.push("- Pricing: quote-based, not published. Equipment is configured per application.");
  out.push("");

  // ---- Equipment range ----
  out.push("# Equipment range");
  out.push("");
  const categories = [...new Set(products.map((p) => p.category))];
  for (const category of categories) {
    const inCategory = products.filter((p) => p.category === category);
    out.push(`## ${inCategory[0].categoryLabel}`);
    out.push("");
    out.push(`URL: ${SITE_URL}/product-category/${category}`);
    out.push(`Models: ${inCategory.length}`);
    out.push("");
    for (const p of inCategory) {
      out.push(`### ${p.title}`);
      out.push("");
      out.push(`URL: ${SITE_URL}/drilling-rigs/${p.category}/${p.slug}`);
      if (p.seriesTag) out.push(`Series: ${p.seriesTag}`);
      if (p.bandHeading) out.push(`Summary: ${p.bandHeading}`);
      out.push("");
      if (p.specRows.length > 0) {
        out.push("| Parameter | Value |");
        out.push("| --- | --- |");
        for (const row of p.specRows) {
          out.push(`| ${cell(row.param)} | ${cell(row.value)} |`);
        }
        out.push("");
      }
    }
  }

  // ---- Drilling tools ----
  out.push("# Drilling tools");
  out.push("");
  out.push(`- Down The Hole (DTH) drilling tools: ${SITE_URL}/drilling-tools/dth-drilling-tools`);
  out.push(`- Rotary drilling tools: ${SITE_URL}/drilling-tools/rotary-drilling-tools`);
  out.push(
    `- KLR drill rods (friction welded, induction hardened, 2-7/8" / 73 mm to 13-3/8" / 340 mm): ${SITE_URL}/drilling-tools/drill-rods`,
  );
  out.push("");

  // ---- Technical articles ----
  out.push("# Technical articles");
  out.push("");
  for (const post of blogPosts) {
    if (post.standaloneUrl) continue;
    out.push(`## ${post.title}`);
    out.push("");
    out.push(`URL: ${SITE_URL}/blog/${post.slug}`);
    out.push(`Published: ${post.date}`);
    out.push(`Author: KLR Universal`);
    out.push("");
    for (const block of post.blocks) {
      const text = blockToText(block);
      if (text) out.push(text.replace(/\n$/, ""));
    }
    out.push("");
  }

  return `${out.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}

export function GET() {
  return new Response(buildDocument(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
