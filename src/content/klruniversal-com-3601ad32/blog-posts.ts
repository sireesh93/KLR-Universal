import type { BlogPost } from "@/components/sites/klruniversal-com-3601ad32/shared/BlogPostTemplate";
import raw from "./blog-posts.json";

export const blogPosts = raw as unknown as BlogPost[];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3) {
  // A plain filter+slice always returns the same leading posts for every
  // page, so only the first few posts in the array ever receive an inbound
  // related-post link -- everything past position ~4 gets none at all. This
  // is what Semrush flagged as "only one internal link" on most posts.
  //
  // Picking the next `count` posts after this one in a circular order gives
  // every post exactly `count` inbound links instead (each post is "next"
  // for exactly `count` others), spreading link equity evenly across the
  // whole list rather than concentrating it on a handful of posts.
  const index = blogPosts.findIndex((p) => p.slug === slug);
  if (index === -1) return blogPosts.slice(0, count);
  const related: typeof blogPosts = [];
  for (let i = 1; i <= count && i < blogPosts.length; i++) {
    related.push(blogPosts[(index + i) % blogPosts.length]);
  }
  return related;
}
