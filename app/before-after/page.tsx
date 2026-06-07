import type { Metadata } from "next";
import { BeforeAfterGallery } from "@/components/sections/BeforeAfterGallery";

export const metadata: Metadata = {
  title: "Before / After",
  description: "Compare LuxCoat Liquid Glass before and after finish."
};

export default function BeforeAfterPage() {
  return (
    <section className="page-shell section">
      <BeforeAfterGallery />
    </section>
  );
}
