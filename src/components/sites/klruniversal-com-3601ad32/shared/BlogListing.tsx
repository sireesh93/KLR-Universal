import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/content/klruniversal-com-3601ad32/blog-posts";
import { postHref } from "./BlogPostTemplate";

const PAGE_SIZE = 6;
export const BLOG_PAGE_COUNT = Math.ceil(blogPosts.length / PAGE_SIZE);

const HERO_IMAGE =
  "/sites/klruniversal-com-3601ad32/about-us-57424c1f/images/hero-banner-collage.png";

function excerptOf(post: (typeof blogPosts)[number]) {
  const firstParagraph = post.blocks.find((b) => b.tag === "P");
  return firstParagraph && "text" in firstParagraph ? firstParagraph.text : "";
}

export function BlogListing({ page }: { page: number }) {
  const start = (page - 1) * PAGE_SIZE;
  const posts = blogPosts.slice(start, start + PAGE_SIZE);

  return (
    <>
      <section className="bg-klr-header py-10">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="relative flex min-h-[220px] items-center overflow-hidden rounded-lg bg-black/5 p-8">
            <div className="relative z-10 max-w-md rounded-lg bg-white p-6">
              <h1 className="text-3xl font-medium leading-tight md:text-4xl">
                News, Innovations & Expert Resources
              </h1>
            </div>
            <div className="absolute inset-0">
              <Image src={HERO_IMAGE} alt="" fill className="object-cover opacity-90" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-klr-offwhite py-16">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={postHref(post)} className="block overflow-hidden rounded-lg">
                  <div className="relative aspect-[4/3] w-full">
                    {post.heroImage && (
                      <Image
                        src={post.heroImage}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform hover:scale-105"
                      />
                    )}
                  </div>
                </Link>
                <p className="mt-4 text-xs font-medium text-klr-red">{post.date}</p>
                <Link href={postHref(post)}>
                  <h2 className="mt-1 text-lg font-semibold leading-snug hover:text-klr-red">
                    {post.title}
                  </h2>
                </Link>
                <p className="mt-2 line-clamp-2 text-sm text-black/60">{excerptOf(post)}</p>
                <Link
                  href={postHref(post)}
                  className="mt-2 inline-block text-sm font-medium text-klr-red hover:underline"
                >
                  Read more<span className="sr-only"> about {post.title}</span>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: BLOG_PAGE_COUNT }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                href={n === 1 ? "/blog" : `/blog/page/${n}`}
                className={`flex size-9 items-center justify-center rounded-md text-sm font-medium ${
                  n === page
                    ? "bg-klr-red text-white"
                    : "border border-black/10 bg-white text-black hover:border-klr-red"
                }`}
              >
                {n}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
