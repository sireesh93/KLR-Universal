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
        "group inline-flex items-center gap-3 rounded-full py-1 pl-4 pr-1 text-sm font-medium transition-colors",
        isRed
          ? "bg-klr-red text-white hover:bg-klr-red-dark"
          : "bg-white text-klr-red hover:bg-white/90",
        className
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full",
          isRed ? "bg-white text-klr-red" : "bg-klr-red text-white"
        )}
      >
        <ArrowRight className="size-3.5" />
      </span>
    </Link>
  );
}
