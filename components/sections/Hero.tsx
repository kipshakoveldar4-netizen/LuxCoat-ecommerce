import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Star,
  Timer
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { paymentBadges, product, productHighlights } from "@/lib/content";
import { formatMoney } from "@/lib/money";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-7rem)] overflow-hidden">
      <Image
        alt="LuxCoat Liquid Glass with glossy black car"
        className="object-cover object-[68%_50%] sm:object-center"
        fill
        priority
        sizes="100vw"
        src="/images/luxcoat-hero.png"
      />
      <div className="absolute inset-0 lux-grid opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/82 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent" />
      <div className="page-shell relative flex min-h-[calc(100vh-7rem)] items-center py-12 sm:py-16">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-3">
            <span className="premium-chip">
              <Sparkles size={14} />
              Liquid Glass 237 ml
            </span>
            <span className="premium-chip">
              <ShieldCheck size={14} />
              6-7 month effect
            </span>
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Premium mirror-gloss protection in about 15 minutes.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
            LuxCoat restores shine, adds a deep wet-look finish, and helps protect
            automotive paint from light scratches, UV damage, road film, and daily
            wash wear.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 text-cobalt">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star fill="currentColor" key={index} size={17} />
              ))}
            </div>
            <p className="text-sm font-semibold text-slate-200">
              4.9/5 from detail-focused drivers
            </p>
            <span className="hidden h-1 w-1 rounded-full bg-slate-500 sm:block" />
            <p className="text-sm font-semibold text-white">
              {formatMoney(product.priceCents, product.currency)}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary" href="/product/luxcoat-liquid-glass-237ml">
              Shop LuxCoat
              <ArrowRight size={18} />
            </Link>
            <Link className="btn-secondary" href="/before-after">
              See Before / After
            </Link>
          </div>
          <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {productHighlights.map((item, index) => {
              const Icon =
                index === 0
                  ? Timer
                  : index === 1
                    ? Sparkles
                    : index === 2
                      ? ShieldCheck
                      : CheckCircle2;
              return (
                <div
                  className="rounded-2xl border border-white/15 bg-black/35 px-4 py-4 backdrop-blur-xl"
                  key={item.label}
                >
                  <Icon className="text-cobalt" size={19} />
                  <p className="mt-3 text-xl font-black text-white">{item.value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase leading-5 tracking-[0.12em] text-slate-400">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {paymentBadges.map((badge) => (
              <span
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-slate-300"
                key={badge}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
