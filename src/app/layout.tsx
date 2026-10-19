import type { Metadata } from "next";
import { Saira } from "next/font/google";
import { FloatingEnquireTab } from "@/components/sites/klruniversal-com-3601ad32/shared/FloatingEnquireTab";
import { CookieBanner } from "@/components/sites/klruniversal-com-3601ad32/shared/CookieBanner";
import { GoogleTranslate } from "@/components/sites/klruniversal-com-3601ad32/shared/GoogleTranslate";
import { HOME_URL, SITE_URL } from "@/lib/site";
import { buildCsp } from "@/lib/csp.mjs";
import "./globals.css";

const META_CSP = buildCsp({ forMeta: true });

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const GTM_ID = "GTM-M9VK9R9D";

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
    url: HOME_URL,
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
        {/* Consent Mode v2 defaults, which MUST run before the container so
            the denied state is in the dataLayer by the time any tag reads it.
            CookieBanner promises the visitor that declining changes nothing,
            and getCookieConsent() documents that trackers are gated on an
            explicit "accepted" — firing GTM unconditionally would make both
            untrue. Denied here means the container still loads and can send
            cookieless pings, but sets no analytics or advertising cookies
            until CookieBanner pushes a consent update. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
try{if(localStorage.getItem('klr-cookie-consent')==='accepted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}`,
          }}
        />
        {/* Google Tag Manager, as high in <head> as the framework allows, so
            the container is loading before anything else competes for it.
            Inline scripts are not hoisted by React the way src scripts are, so
            this stays where it is written. The CSP below and the matching
            header in next.config.mjs both allow googletagmanager.com; without
            those the container is blocked silently. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
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
            X-Frame-Options: SAMEORIGIN already covers framing. Sourced from
            src/lib/csp.mjs -- do not hand-edit this string, it drifted out of
            sync with the header once already and silently kept origins
            blocked that the header had already allowed. */}
        <meta httpEquiv="Content-Security-Policy" content={META_CSP} />
      </head>
      <body className="min-h-full flex flex-col">
        {/* GTM's no-JavaScript fallback, required to sit immediately after the
            opening body tag. Hidden and off-layout so it cannot affect the
            page; aria-hidden keeps it out of the accessibility tree. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
            aria-hidden="true"
          />
        </noscript>
        {children}
        <FloatingEnquireTab />
        <GoogleTranslate />
        <CookieBanner />
      </body>
    </html>
  );
}
