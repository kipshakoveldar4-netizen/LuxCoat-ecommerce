import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service"
};

export default function TermsPage() {
  return (
    <section className="page-shell section">
      <p className="eyebrow">Policy</p>
      <h1 className="section-title">Terms of Service</h1>
      <div className="glass-panel mt-8 grid gap-5 rounded-[2rem] p-6 text-sm leading-7 text-slate-300 sm:p-8">
        <p>
          By purchasing LuxCoat products, customers agree to provide accurate
          order information and follow application and safety guidance.
        </p>
        <p>
          Product results may vary by paint condition, preparation, climate, and
          maintenance. LuxCoat is not a substitute for professional paint repair
          or deep scratch correction.
        </p>
        <p>
          These terms should be finalized with legal review before accepting live
          payments in each target market.
        </p>
      </div>
    </section>
  );
}
