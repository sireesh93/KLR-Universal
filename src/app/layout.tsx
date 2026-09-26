import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yummy Bee | Artisan Honey Bakery",
  description:
    "Yummy Bee bakes small-batch, honey-kissed treats fresh every day. Explore our menu and order online — sweetness, delivered.",
  openGraph: {
    title: "Yummy Bee | Artisan Honey Bakery",
    description:
      "Small-batch, honey-kissed treats baked fresh every day. Explore our menu and order online.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
