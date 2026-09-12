import type { Metadata } from "next";
import { Saira } from "next/font/google";
import { FloatingEnquireTab } from "@/components/sites/klruniversal-com-3601ad32/shared/FloatingEnquireTab";
import { CookieBanner } from "@/components/sites/klruniversal-com-3601ad32/shared/CookieBanner";
import { GoogleTranslate } from "@/components/sites/klruniversal-com-3601ad32/shared/GoogleTranslate";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
      <head>
        {/* The translate engine and its assets come from four Google origins.
            Opening the TCP and TLS handshakes early saves a round trip each on
            mobile, where that latency is most of the cost. */}
        <link rel="preconnect" href="https://translate.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://translate.google.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Hostinger's edge replaces our Content-Security-Policy header with a
            single directive, so the policy is restored here where it cannot be
            stripped. frame-ancestors is header-only and is therefore absent;
            X-Frame-Options: SAMEORIGIN already covers framing. */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://www.gstatic.com https://fonts.googleapis.com; img-src 'self' data: blob: https://www.google.com https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com https://fonts.gstatic.com; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://www.google.com https://translate.google.com; connect-src 'self' https://translate.googleapis.com https://translate-pa.googleapis.com; object-src 'none'; base-uri 'self'; form-action 'self'"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingEnquireTab />
        <GoogleTranslate />
        <CookieBanner />
      </body>
    </html>
  );
}
