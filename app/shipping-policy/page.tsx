import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy"
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage title="Shipping Policy">
      <p>
        LuxCoat orders ship from China to supported markets in the USA, UK, and
        Europe. Delivery timelines vary by destination, customs processing, and
        carrier availability.
      </p>
      <p>
        Tracking details should be emailed after fulfillment. Customers are
        responsible for providing accurate shipping information and responding to
        carrier or customs requests when required.
      </p>
      <p>
        Final delivery windows, shipping rates, taxes, and duties should be
        configured before launch based on the selected logistics provider.
      </p>
    </PolicyPage>
  );
}

function PolicyPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="page-shell section">
      <p className="eyebrow">Policy</p>
      <h1 className="section-title">{title}</h1>
      <div className="glass-panel mt-8 grid gap-5 rounded-[2rem] p-6 text-sm leading-7 text-slate-300 sm:p-8">
        {children}
      </div>
    </section>
  );
}
