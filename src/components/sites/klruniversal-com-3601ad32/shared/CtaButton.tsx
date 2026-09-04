import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "red" | "white";
  className?: string;
};

export function CtaButton({
  href,
  children,
  variant = "red",
  className,
}: CtaButtonProps) {
  const isRed = variant === "red";
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full py-1 pl-4 pr-1 text-sm font-medium transition-all duration-200 ease-out hover:shadow-md active:scale-[0.97]",
        isRed
          ? "bg-klr-red text-white hover:bg-klr-red-dark"
          : "bg-white text-klr-red hover:bg-white/90",
        className
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ease-out group-hover:translate-x-0.5",
          isRed ? "bg-white text-klr-red" : "bg-klr-red text-white"
        )}
      >
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </span>
    </Link>
  );
}
