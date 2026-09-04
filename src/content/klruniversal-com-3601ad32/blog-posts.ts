import type { BlogPost } from "@/components/sites/klruniversal-com-3601ad32/shared/BlogPostTemplate";
import raw from "./blog-posts.json";

export const blogPosts = raw as unknown as BlogPost[];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, count = 3) {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, count);
}
