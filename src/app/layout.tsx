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
  title: "Yummy Bee | Guilt-Free Desserts & Wholesome Café",
  description:
    "Yummy Bee is India's pioneering café for guilt-free indulgence — sugar-free, gluten-free, millet-based desserts and clean-eating favorites. Order online today.",
  openGraph: {
    title: "Yummy Bee | Guilt-Free Desserts & Wholesome Café",
    description:
      "Sugar-free, gluten-free, millet-based desserts and clean-eating favorites, made with zero maida and zero compromise.",
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
