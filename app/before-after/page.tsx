import type { Metadata } from "next";
import { BeforeAfterGallery } from "@/components/sections/BeforeAfterGallery";

export const metadata: Metadata = {
  title: "Before / After",
  description:
    "See real LuxCoat before and after results for scratched, oxidized, and faded automotive paint.",
  alternates: {
    canonical: "/before-after"
  }
};

export default function BeforeAfterPage() {
  return (
    <section className="page-shell section">
      <BeforeAfterGallery />
    </section>
  );
}
