import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact LuxCoat support."
};

export default function ContactPage() {
  return (
    <section className="page-shell section">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="section-title">Questions about orders, coating, or wholesale?</h1>
          <p className="section-copy">
            Send a message and the support team can respond with shipping,
            product, compliance, or distribution details.
          </p>
          <div className="mt-8 grid gap-4 text-sm text-slate-300">
            <p>Support: support@luxcoat.example</p>
            <p>Markets: USA, UK, and Europe</p>
            <p>Shipping origin: China</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
