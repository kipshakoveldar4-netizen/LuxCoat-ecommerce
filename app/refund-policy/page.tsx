import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy"
};

export default function RefundPolicyPage() {
  return (
    <section className="page-shell section">
      <p className="eyebrow">Policy</p>
      <h1 className="section-title">Refund Policy</h1>
      <div className="glass-panel mt-8 grid gap-5 rounded-[2rem] p-6 text-sm leading-7 text-slate-300 sm:p-8">
        <p>
          Refunds may be requested for damaged, missing, or incorrect products.
          Customers should contact support with order number, delivery photos, and
          a description of the issue.
        </p>
        <p>
          Opened or used coating products may not be eligible for refund unless
          required by local consumer law. Final refund rules should be reviewed by
          counsel before launch in each target market.
        </p>
      </div>
    </section>
  );
}
