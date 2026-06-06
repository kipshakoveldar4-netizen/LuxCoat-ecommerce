import { CheckCircle2, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { productHighlights } from "@/lib/content";
import { formatMoney } from "@/lib/money";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="glass-panel group overflow-hidden rounded-[2rem]">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <Link
          className="relative block min-h-[360px] overflow-hidden bg-black/50 sm:min-h-[440px] lg:min-h-full"
          href={`/product/${product.slug}`}
        >
          <Image
            alt={product.title}
            className="object-cover transition duration-700 group-hover:scale-105"
            fill
            sizes="(min-width: 1024px) 420px, 100vw"
            src={product.imageUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 rounded-full border border-cobalt/40 bg-cobalt/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-cobalt backdrop-blur-xl">
            Bestseller
          </span>
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-xl">
              237 ml
            </span>
            <span className="rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-xl">
              Hand apply
            </span>
            <span className="rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-xl">
              6-7 months
            </span>
          </div>
        </Link>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">{product.sizeMl} ml detailing coating</p>
              <h3 className="mt-3 text-3xl font-black leading-tight text-white">
                {product.title}
              </h3>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-cobalt">
                Launch price
              </p>
              <p className="mt-1 text-2xl font-black text-white">
                {formatMoney(product.priceCents, product.currency)}
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            {product.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {productHighlights.map((item) => (
              <div className="rounded-2xl border border-white/10 bg-black/25 p-4" key={item.label}>
                <p className="text-lg font-black text-white">{item.value}</p>
                <p className="mt-1 text-[11px] font-bold uppercase leading-5 tracking-[0.12em] text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 text-sm text-slate-300">
            {[
              { icon: Sparkles, text: "Deep wet-look gloss and slick touch" },
              { icon: ShieldCheck, text: "UV, light scratch, and wash-wear support" },
              { icon: Truck, text: "Tracked shipping from China to target markets" },
              { icon: CheckCircle2, text: "SDS and certificate area prepared" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div className="flex items-center gap-3" key={item.text}>
                  <Icon className="shrink-0 text-cobalt" size={18} />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <AddToCartButton className="btn-primary flex-1" product={product} />
            <Link className="btn-secondary flex-1" href={`/product/${product.slug}`}>
              View Product
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
