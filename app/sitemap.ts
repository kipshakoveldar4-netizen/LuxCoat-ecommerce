import type { MetadataRoute } from "next";
import { product, site } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

const routes = [
  { path: "/", priority: 1 },
  { path: "/shop", priority: 0.9 },
  { path: `/product/${product.slug}`, priority: 0.95 },
  { path: "/how-to-use", priority: 0.75 },
  { path: "/before-after", priority: 0.85 },
  { path: "/reviews", priority: 0.7 },
  { path: "/faq", priority: 0.7 },
  { path: "/contact", priority: 0.65 },
  { path: "/shipping-policy", priority: 0.45 },
  { path: "/refund-policy", priority: 0.45 },
  { path: "/privacy-policy", priority: 0.4 },
  { path: "/terms-of-service", priority: 0.4 },
  { path: "/certificates-sds", priority: 0.65 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route.priority
  }));
}
