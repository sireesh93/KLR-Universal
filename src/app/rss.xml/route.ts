import { blogPosts } from "@/content/klruniversal-com-3601ad32/blog-posts";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/**
 * RSS feed for the blog. Readers, aggregators and several AI crawlers look for
 * one at /rss.xml; both that and /blog/feed previously returned 404.
 */

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function firstParagraph(post: (typeof blogPosts)[number]) {
  const block = post.blocks.find((b) => b.tag === "P");
  return block && "text" in block ? block.text : "";
}

export function GET() {
  const posts = blogPosts
    .filter((p) => !p.standaloneUrl)
    .map((post) => ({ post, date: new Date(post.date) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const items = posts
    .map(({ post, date }) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = Number.isNaN(date.getTime()) ? "" : date.toUTCString();
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        pubDate ? `      <pubDate>${pubDate}</pubDate>` : "",
        `      <description>${escapeXml(firstParagraph(post))}</description>`,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const newest = posts.find(({ date }) => !Number.isNaN(date.getTime()));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>KLR Universal Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Technical articles on drilling rigs, rock drilling tools and drilling methods from KLR Universal, Hyderabad.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${newest ? `    <lastBuildDate>${newest.date.toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
