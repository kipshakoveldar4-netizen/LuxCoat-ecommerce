import type { Metadata } from "next";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about LuxCoat Liquid Glass."
};

export default function FaqPage() {
  return (
    <section className="page-shell section">
      <p className="eyebrow">FAQ</p>
      <h1 className="section-title">Everything to know before coating.</h1>
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {faqs.map((item) => (
          <details className="glass-panel rounded-[1.4rem] p-5" key={item.question}>
            <summary className="cursor-pointer list-none text-lg font-bold text-white">
              {item.question}
            </summary>
            <p className="mt-4 text-sm leading-7 text-slate-400">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
