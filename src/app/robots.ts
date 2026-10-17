import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * The wildcard rule already permits everything, so naming the AI crawlers
 * changes no behaviour today. It is written out deliberately: these are the
 * agents that decide whether KLR appears in ChatGPT, Claude, Perplexity,
 * Copilot and Google's AI answers, and having them listed makes the decision
 * to allow them explicit and reviewable rather than an accident of the
 * wildcard. Blocking any of them later is then a one-line change with an
 * obvious consequence.
 */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI indexing
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "OAI-SearchBot", // OpenAI search
  "ClaudeBot",
  "Claude-User", // Claude browsing/agent actions on a user's behalf
  "Claude-SearchBot", // Claude search indexing
  "anthropic-ai",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User", // Perplexity browsing on a user's behalf
  "Google-Extended", // Gemini and AI Overviews
  "Applebot-Extended",
  "Bingbot", // powers Copilot
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
