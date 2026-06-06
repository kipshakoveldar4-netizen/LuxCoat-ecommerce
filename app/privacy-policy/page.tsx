import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy"
};

export default function PrivacyPolicyPage() {
  return (
    <section className="page-shell section">
      <p className="eyebrow">Policy</p>
      <h1 className="section-title">Privacy Policy</h1>
      <div className="glass-panel mt-8 grid gap-5 rounded-[2rem] p-6 text-sm leading-7 text-slate-300 sm:p-8">
        <p>
          LuxCoat collects customer contact, shipping, order, and payment-related
          information to process purchases and provide support.
        </p>
        <p>
          Payment data should be processed by PayPal or 2Checkout. LuxCoat should
          not store raw payment card information on its own servers.
        </p>
        <p>
          Before launch, configure analytics, cookie consent, retention rules, and
          region-specific privacy disclosures for the USA, UK, and Europe.
        </p>
      </div>
    </section>
  );
}
