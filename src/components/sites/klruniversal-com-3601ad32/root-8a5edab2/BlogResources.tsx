import Image from "next/image";
import Link from "next/link";
import { CtaButton } from "../shared/CtaButton";
import { Reveal } from "../shared/Reveal";

const ASSET_BASE =
  "/sites/klruniversal-com-3601ad32/root-8a5edab2/images";

const POSTS = [
  {
    image: "blog-card-01.webp",
    title: "Role of Drilling Tools in Mining & Construction",
    excerpt:
      "Imagine building a tall office tower in Hyderabad or digging deep beneath its bustling streets. These big projects don’t…",
    href: "/blog/role-of-drilling-tools-in-mining-construction",
  },
  {
    image: "blog-card-02.webp",
    title: "What Is a Drilling Rig?",
    excerpt:
      "Have you ever wondered where oil comes from for the vehicles burning it, or the minerals for construction? The…",
    href: "/blog/what-is-drilling-rig",
  },
  {
    image: "blog-card-03.webp",
    title: "How Depth & Soil Type Impact Drilling Rig Choice",
    excerpt:
      "Choosing the proper drilling rig is about technology, and it’s the secret to success in your project. Whether it…",
    href: "/blog/how-depth-soil-type-impact-drilling-rig-choice",
  },
];

export function BlogResources() {
  return (
    <section className="bg-klr-offwhite py-16">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <Reveal className="flex items-center justify-between">
          <h2 className="text-3xl font-medium leading-tight md:text-4xl">
            News, Innovations & Expert Resources
          </h2>
          <CtaButton href="/blog/" className="hidden sm:inline-flex">
            All Blogs
          </CtaButton>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal key={post.href} delay={i * 75}>
              <article>
                <Link href={post.href} className="block overflow-hidden rounded-lg">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={`${ASSET_BASE}/${post.image}`}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                    />
                  </div>
                </Link>
                <p className="mt-4 text-sm text-black/70">{post.excerpt}</p>
                <Link
                  href={post.href}
                  className="mt-2 inline-block text-sm font-medium text-klr-red transition-colors hover:underline"
                >
                  Read more
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <CtaButton href="/blog/" className="mt-8 w-fit sm:hidden">
          All Blogs
        </CtaButton>
      </div>
    </section>
  );
}
