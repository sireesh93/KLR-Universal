import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/sites/klruniversal-com-3601ad32/shared/Header";
import { Footer } from "@/components/sites/klruniversal-com-3601ad32/shared/Footer";
import { BlogPostTemplate } from "@/components/sites/klruniversal-com-3601ad32/shared/BlogPostTemplate";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/content/klruniversal-com-3601ad32/blog-posts";
import { HOWTO_STEPS } from "@/content/klruniversal-com-3601ad32/howto-steps";
import { HOME_URL, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.filter((p) => !p.standaloneUrl).map((p) => ({ slug: p.slug }));
}

/** Cut at a word boundary under 160 characters, with no trailing ellipsis:
 *  a description that stops mid-word reads as broken in search results. */
function excerptFrom(post: ReturnType<typeof getBlogPost>) {
  const firstParagraph = post?.blocks.find((b) => b.tag === "P");
  const text = firstParagraph && "text" in firstParagraph ? firstParagraph.text : "";
  if (text.length <= 160) return text;
  const cut = text.slice(0, 160);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 100 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:—-]+$/, "");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  // Google truncates around 60 characters, so the suffix shrinks to fit
  // rather than disappearing outright -- dropping it entirely made the
  // <title> tag byte-for-byte identical to the on-page <h1> for every post
  // with a long headline (Semrush flagged this as a duplicate-H1/title
  // issue on 19 posts). A truncated-but-distinct title beats an exact
  // duplicate for most posts, but four headlines are 70+ characters on
  // their own -- long enough that even " | KLR" pushed the tag into
  // Semrush's separate "too much text in title" flag. Those four carry an
  // explicit shortTitle instead of being auto-suffixed.
  const suffixes = [" | KLR Universal Blog", " | KLR Universal", " | KLR"];
  const fitting = suffixes.find((s) => `${post.title}${s}`.length <= 60);
  const title = post.shortTitle
    ? `${post.shortTitle} | KLR Universal`
    : `${post.title}${fitting ?? suffixes[suffixes.length - 1]}`;
  const description = excerptFrom(post);
  const url = `/blog/${post.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post || post.standaloneUrl) notFound();

  // Article markup makes the 20 posts eligible for rich results. The date
  // strings are human formatted ("May 26, 2026"), so convert to ISO-8601 and
  // omit the field rather than emit an invalid value.
  const published = new Date(post.date);
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: excerptFrom(post),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    url: `${SITE_URL}/blog/${post.slug}`,
    ...(post.heroImage ? { image: `${SITE_URL}${post.heroImage}` } : {}),
    ...(Number.isNaN(published.getTime())
      ? {}
      : {
          datePublished: published.toISOString().slice(0, 10),
          // Without dateModified an AI engine has no freshness signal at all
          // and treats the whole blog as frozen at publish. These posts have
          // not been revised since, so the modified date is the published
          // date -- accurate, and enough to answer the question.
          dateModified: published.toISOString().slice(0, 10),
        }),
    inLanguage: "en",
    isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog`, name: "KLR Universal Blog" },
    // The @id on both nodes merges them into the single Organization entity
    // declared on the homepage instead of minting a second, unlinked copy of
    // the company on every post.
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "KLR Universal",
      url: HOME_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "KLR Universal",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/sites/klruniversal-com-3601ad32/root-8a5edab2/images/logo-klr.svg`,
      },
    },
  };

  const howTo = HOWTO_STEPS[post.slug];
  const howToJsonLd = howTo && {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <Header />
      <main className="flex-1">
        <BlogPostTemplate post={post} related={getRelatedPosts(post.slug)} />
      </main>
      <Footer />
    </>
  );
}
