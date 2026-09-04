import type { Metadata } from "next";
import { Saira } from "next/font/google";
import { FloatingEnquireTab } from "@/components/sites/klruniversal-com-3601ad32/shared/FloatingEnquireTab";
import "./globals.css";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KLR Universal | Drilling Rigs & Drilling Tools Manufacturer",
  description:
    "KLR Universal – trusted drilling rig & rock drilling tools manufacturer in India, delivering reliable solutions for water well, mining & construction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${saira.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingEnquireTab />
      </body>
    </html>
  );
}
