import type { Metadata } from "next";
import { BadgeCheck, Clock3 } from "lucide-react";
import { certificates } from "@/lib/content";

export const metadata: Metadata = {
  title: "Certificates / SDS",
  description: "LuxCoat certificates and safety data sheet area."
};

export default function CertificatesPage() {
  return (
    <section className="page-shell section">
      <p className="eyebrow">Certificates / SDS</p>
      <h1 className="section-title">Launch-ready document center.</h1>
      <p className="section-copy">
        Final SDS, certificate of analysis, batch records, and import documents
        can be attached here before production launch.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {certificates.map((item) => {
          const Icon = item.icon;
          return (
            <article className="glass-panel rounded-[1.6rem] p-6" key={item.title}>
              <Icon className="text-cobalt" size={30} />
              <h2 className="mt-5 text-2xl font-black text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-yellow-300/25 bg-yellow-300/10 px-3 py-1.5 text-xs font-semibold text-yellow-100">
                  <Clock3 size={13} />
                  Pending upload
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-cobalt/30 bg-cobalt/10 px-3 py-1.5 text-xs font-semibold text-cobalt">
                  <BadgeCheck size={13} />
                  Admin-ready
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
