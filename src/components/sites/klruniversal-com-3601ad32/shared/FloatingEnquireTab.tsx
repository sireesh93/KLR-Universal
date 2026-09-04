import Link from "next/link";

export function FloatingEnquireTab() {
  return (
    <Link
      href="/contact-and-support"
      className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 items-center rounded-l-md bg-klr-red px-2 py-4 text-xs font-semibold tracking-wide text-white [writing-mode:vertical-rl] hover:bg-klr-red-dark md:flex"
    >
      Enquire Now
    </Link>
  );
}
