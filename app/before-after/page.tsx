import type { Metadata } from "next";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { beforeAfterMetrics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Before / After",
  description: "Compare LuxCoat Liquid Glass before and after finish."
};

export default function BeforeAfterPage() {
  return (
    <section className="page-shell section">
      <p className="eyebrow">Before / After</p>
      <h1 className="section-title">See the finish transform.</h1>
      <p className="section-copy">
        A premium coating experience should be visible: darker contrast, sharper
        reflections, and a slick liquid-glass look.
      </p>
      <div className="mt-10">
        <BeforeAfterSlider />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {beforeAfterMetrics.map((metric) => (
          <article className="glass-panel rounded-[1.5rem] p-6" key={metric.label}>
            <p className="text-3xl font-black text-white">{metric.value}</p>
            <h2 className="mt-3 text-lg font-bold text-white">{metric.label}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Visual preview metric for the premium finish story. Final claims can
              be updated after lab or customer testing.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
