/**
 * Renders a JSON-LD block. The `<` escape keeps a string inside the data from
 * closing the script tag early, the same guard used by the page-level schema
 * elsewhere in the site.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
