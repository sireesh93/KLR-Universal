import Image from "next/image";
import Link from "next/link";

type Block =
  | { tag: "P" | "H2" | "H3" | "H4"; text: string }
  | { tag: "UL" | "OL"; items: string[] }
  | { tag: "TABLE"; rows: string[][] }
  | { tag: "IMG"; src: string; alt: string };

export type BlogPost = {
  slug: string;
  standaloneUrl?: boolean;
  title: string;
  date: string;
  heroImage: string | null;
  blocks: Block[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function postHref(post: Pick<BlogPost, "slug" | "standaloneUrl">) {
  return post.standaloneUrl ? `/${post.slug}` : `/blog/${post.slug}`;
}

export { postHref };

function renderBlock(block: Block, i: number) {
  switch (block.tag) {
    case "H2":
      return (
        <h2 key={i} id={slugify(block.text)} className="mt-10 text-2xl font-semibold">
          {block.text}
        </h2>
      );
    case "H3":
      return (
        <h3 key={i} className="mt-6 text-lg font-semibold">
          {block.text}
        </h3>
      );
    case "H4":
      return (
        <h4 key={i} className="mt-4 text-base font-semibold">
          {block.text}
        </h4>
      );
    case "P":
      return (
        <p key={i} className="mt-4 text-sm leading-relaxed text-black/70">
          {block.text}
        </p>
      );
    case "UL":
      return (
        <ul key={i} className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-black/70">
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    case "OL":
      return (
        <ol key={i} className="mt-4 list-decimal space-y-1.5 pl-5 text-sm text-black/70">
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ol>
      );
    case "TABLE":
      return (
        <div key={i} className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-black/10">
                {block.rows[0]?.map((cell, c) => (
                  <th key={c} scope="col" className="py-2 pr-4 text-left font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.slice(1).map((row, r) => (
                <tr key={r} className="border-b border-black/10">
                  {row.map((cell, c) => (
                    <td key={c} className="py-2 pr-4 text-black/70">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "IMG":
      return (
        <div key={i} className="relative mt-6 aspect-video w-full overflow-hidden rounded-lg">
          <Image src={block.src} alt={block.alt} fill className="object-cover" />
        </div>
      );
    default:
      return null;
  }
}

export function BlogPostTemplate({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const toc = post.blocks.filter((b): b is { tag: "H2"; text: string } => b.tag === "H2");

  return (
    <article className="bg-white py-10">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <h1 className="max-w-3xl text-3xl font-medium leading-tight md:text-4xl">
          {post.title}
        </h1>

        {post.heroImage && (
          <div className="relative mt-6 aspect-[16/9] w-full max-w-3xl overflow-hidden rounded-lg">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <p className="mt-4 text-sm text-black/50">{post.date}</p>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
          <div className="max-w-3xl">
            {post.blocks.map((b, i) => renderBlock(b, i))}
          </div>

          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-6 rounded-lg bg-klr-dark p-5 text-white">
                <p className="text-sm font-semibold">In this article</p>
                <ul className="mt-3 space-y-2 text-xs text-white/70">
                  {toc.map((h, i) => (
                    <li key={i}>
                      <a href={`#${slugify(h.text)}`} className="hover:text-white">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>

        {related.length > 0 && (
          <div className="mt-16 border-t border-black/10 pt-10">
            <h2 className="text-2xl font-medium">Related Articles</h2>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={postHref(r)} className="block">
                  {r.heroImage && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                      <Image
                        src={r.heroImage}
                        alt={r.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}
                  <p className="mt-3 text-sm font-medium">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
