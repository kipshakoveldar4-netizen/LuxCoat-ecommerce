import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/lib/content";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LuxCoat Liquid Glass | Premium Automotive Coating",
    template: "%s | LuxCoat"
  },
  description:
    "LuxCoat Liquid Glass is a premium automotive coating that restores shine, adds deep gloss, and protects from light scratches and UV damage.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "LuxCoat Liquid Glass",
    description:
      "Premium hand-applied automotive liquid glass coating for deep gloss and durable protection.",
    images: [
      {
        url: "/images/luxcoat-hero.png",
        width: 1672,
        height: 941,
        alt: "LuxCoat Liquid Glass bottle with premium glossy car finish"
      }
    ],
    siteName: site.name,
    type: "website",
    url: "/"
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxCoat Liquid Glass",
    description:
      "Premium hand-applied automotive liquid glass coating for deep gloss and durable protection.",
    images: ["/images/luxcoat-hero.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
