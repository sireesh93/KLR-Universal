import type { Metadata } from "next";
import { Saira } from "next/font/google";
import { FloatingEnquireTab } from "@/components/sites/klruniversal-com-3601ad32/shared/FloatingEnquireTab";
import { CookieBanner } from "@/components/sites/klruniversal-com-3601ad32/shared/CookieBanner";
import "./globals.css";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://klr-universal.vercel.app";
const SITE_TITLE = "KLR Universal | Drilling Rigs & Drilling Tools Manufacturer";
const SITE_DESCRIPTION =
  "KLR Universal – trusted drilling rig & rock drilling tools manufacturer in India, delivering reliable solutions for water well, mining & construction.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "KLR Universal",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
        <CookieBanner />
      </body>
    </html>
  );
}
