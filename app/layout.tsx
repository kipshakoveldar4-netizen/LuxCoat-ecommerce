import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "LuxCoat Liquid Glass | Premium Automotive Coating",
    template: "%s | LuxCoat"
  },
  description:
    "LuxCoat Liquid Glass is a premium automotive coating that restores shine, adds deep gloss, and protects from light scratches and UV damage.",
  openGraph: {
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
