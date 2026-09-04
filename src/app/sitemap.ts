import type { MetadataRoute } from "next";
import { products } from "@/content/klruniversal-com-3601ad32/products";
import { blogPosts } from "@/content/klruniversal-com-3601ad32/blog-posts";

const SITE_URL = "https://klr-universal.vercel.app";
const BLOG_PAGE_SIZE = 6;
const BLOG_PAGE_COUNT = Math.ceil(blogPosts.length / BLOG_PAGE_SIZE);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about-us`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact-and-support`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/drilling-tools/drill-rods`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/drilling-tools/dth-drilling-tools`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/drilling-tools/rotary-drilling-tools`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const blogPaginationRoutes: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, BLOG_PAGE_COUNT - 1) },
    (_, i) => ({
      url: `${SITE_URL}/blog/page/${i + 2}`,
      changeFrequency: "weekly",
      priority: 0.5,
    })
  );

  const blogPostRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: post.standaloneUrl ? `${SITE_URL}/${post.slug}` : `${SITE_URL}/blog/${post.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const categories = [...new Set(products.map((p) => p.category))];
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/product_category/${category}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/drilling-rigs/${product.category}/${product.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    ...staticRoutes,
    ...blogPaginationRoutes,
    ...blogPostRoutes,
    ...categoryRoutes,
    ...productRoutes,
  ];
}
