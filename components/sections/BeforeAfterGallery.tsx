import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { beforeAfterExamples } from "@/lib/content";

export function BeforeAfterGallery() {
  return (
    <div>
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Before / After</p>
        <h2 className="section-title">Real Before & After Results</h2>
        <p className="section-copy mx-auto">
          Restore gloss, reduce oxidation appearance, and refresh faded paint in minutes.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {beforeAfterExamples.map((item) => (
          <article
            className="glass-panel group overflow-hidden rounded-[1.8rem] shadow-2xl shadow-black/25"
            key={item.title}
          >
            <div className="border-b border-white/10 bg-black/45">
              <div className="grid grid-cols-2 text-center text-[11px] font-black uppercase tracking-[0.18em]">
                <span className="border-r border-white/10 px-4 py-3 text-slate-300">
                  Before
                </span>
                <span className="px-4 py-3 text-cobalt">After</span>
              </div>
            </div>
            <div className="relative bg-black">
              <Image
                alt={item.alt}
                className="h-auto w-full object-contain"
                height={1254}
                quality={96}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                src={item.image}
                width={1254}
              />
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.45)]" />
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-2 text-cobalt">
                <Sparkles size={17} />
                <p className="text-xs font-black uppercase tracking-[0.16em]">
                  {item.eyebrow}
                </p>
              </div>
              <h3 className="mt-3 text-xl font-black text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-9 flex justify-center">
        <Link className="btn-primary" href="/product/luxcoat-liquid-glass-237ml">
          Shop LuxCoat Now
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
