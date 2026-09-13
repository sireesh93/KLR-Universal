import { products } from "@/content/klruniversal-com-3601ad32/products";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * The AI-agent equivalent of a pricing page.
 *
 * Capital equipment has no public price, so the shortlisting question an agent
 * actually asks is "which rig reaches 300 m at 8 inches" -- a specification
 * question. Answering it today means rendering 21 separate HTML pages. This
 * serves the whole range as one flat markdown table set, generated from the
 * same products.json the spec tables render, so the two can never disagree.
 */

/**
 * Several model names contain a literal pipe ("EA-20|30", "TS 590 - 30 | 40 |
 * 50"), and an unescaped pipe silently splits a markdown table cell into extra
 * columns -- the exact failure that makes a spec table unparseable.
 */
function cell(value: string): string {
  return value.replace(/\r?\n/g, "; ").replace(/\|/g, "\\|");
}

function buildDocument(): string {
  const out: string[] = [];

  out.push("# KLR Universal — drilling rig specifications");
  out.push("");
  out.push(
    "Complete specifications for every drilling rig KLR Universal manufactures. " +
      "Generated from the same source as the specification tables on each product page.",
  );
  out.push("");
  out.push("Manufacturer: KLR Universal (also published as KLR Industries), Hyderabad, India");
  out.push("Certification: ISO 9001:2015 | Founded: 1984 | In use in 60+ countries");
  out.push("Enquiries: sales@klruniversal.com | +91 9030327878");
  out.push("");
  out.push(
    "Pricing is quote-based and not published: every rig is configured to the " +
      "application (depth, hole diameter, formation, carrier and power option), so " +
      "a price only exists against a specification. Send the target depth and " +
      "diameter to sales@klruniversal.com for a configured quote.",
  );
  out.push("");
  out.push("---");
  out.push("");

  // Index first: an agent scanning for one model should not read the whole file.
  out.push("## Model index");
  out.push("");
  out.push("| Model | Category | Quick specs | Page |");
  out.push("| --- | --- | --- | --- |");
  for (const p of products) {
    const quick = p.quickSpecs.map((s) => `${cell(s.label)}: ${cell(s.value)}`).join("; ");
    out.push(
      `| ${cell(p.title)} | ${cell(p.categoryLabel)} | ${quick} | ${SITE_URL}/drilling-rigs/${p.category}/${p.slug} |`,
    );
  }
  out.push("");
  out.push("---");
  out.push("");

  const categories = [...new Set(products.map((p) => p.category))];
  for (const category of categories) {
    const inCategory = products.filter((p) => p.category === category);
    out.push(`## ${inCategory[0].categoryLabel}`);
    out.push("");
    out.push(`Category page: ${SITE_URL}/product_category/${category}`);
    out.push("");
    for (const p of inCategory) {
      out.push(`### ${p.title}`);
      out.push("");
      if (p.seriesTag) out.push(`- Series: ${p.seriesTag}`);
      out.push(`- Category: ${p.categoryLabel}`);
      out.push(`- Manufacturer: KLR Universal`);
      out.push(`- Product page: ${SITE_URL}/drilling-rigs/${p.category}/${p.slug}`);
      for (const s of p.quickSpecs) out.push(`- ${s.label}: ${s.value}`);
      out.push("");
      if (p.bandHeading) {
        out.push(p.bandHeading);
        out.push("");
      }
      if (p.specRows.length > 0) {
        out.push("| Parameter | Value |");
        out.push("| --- | --- |");
        for (const row of p.specRows) {
          out.push(`| ${cell(row.param)} | ${cell(row.value)} |`);
        }
        out.push("");
      }
    }
    out.push("---");
    out.push("");
  }

  return `${out.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
}

export function GET() {
  return new Response(buildDocument(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
