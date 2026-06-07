import type { Metadata } from "next";
import Image from "next/image";
import { applicationSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "How To Use",
  description: "How to apply LuxCoat Liquid Glass by hand."
};

export default function HowToUsePage() {
  return (
    <section className="page-shell section">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow">How To Use</p>
          <h1 className="section-title">Apply a deep gloss coating in about 15 minutes.</h1>
          <p className="section-copy">
            Wash the vehicle first, work panel by panel, and use clean microfiber
            towels for the clearest finish.
          </p>
        </div>
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem] border border-white/15 bg-black/35 p-4 sm:p-6">
          <Image
            alt="LuxCoat application bottle"
            className="h-full w-full object-contain"
            height={1254}
            quality={96}
            sizes="(max-width: 768px) 100vw, 50vw"
            src="/images/luxcoat-product.png"
            width={1254}
          />
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {applicationSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article className="glass-panel rounded-[1.6rem] p-6" key={step.title}>
              <div className="flex items-center justify-between">
                <Icon className="text-cobalt" size={28} />
                <span className="text-sm font-black text-cobalt">0{index + 1}</span>
              </div>
              <h2 className="mt-5 text-2xl font-black text-white">{step.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{step.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
