"use client";

import { BadgeCheck, CreditCard, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { BuyNowButton } from "@/components/commerce/BuyNowButton";
import { paymentBadges } from "@/lib/content";
import { formatMoney } from "@/lib/money";
import type { Product } from "@/lib/types";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const subtotal = product.priceCents * quantity;

  return (
    <div className="glass-panel overflow-hidden rounded-[2rem] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Price</p>
          <p className="text-4xl font-black text-white">
            {formatMoney(product.priceCents, product.currency)}
          </p>
        </div>
        <div className="rounded-full border border-cobalt/40 bg-cobalt/10 px-4 py-2 text-sm font-bold text-cobalt">
          {product.inventoryQuantity} in stock
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            Size
          </p>
          <p className="mt-2 text-lg font-bold text-white">{product.sizeMl} ml bottle</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            Order total
          </p>
          <p className="mt-2 text-lg font-bold text-white">
            {formatMoney(subtotal, product.currency)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
        <p className="text-sm font-semibold text-slate-300">Quantity</p>
        <div className="flex items-center rounded-full border border-white/15 bg-white/10 p-1">
          <button
            aria-label="Decrease quantity"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            type="button"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center text-sm font-bold text-white">{quantity}</span>
          <button
            aria-label="Increase quantity"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10"
            onClick={() => setQuantity((value) => Math.min(24, value + 1))}
            type="button"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <AddToCartButton className="btn-primary w-full" product={product} quantity={quantity} />
        <BuyNowButton product={product} quantity={quantity} />
      </div>

      <div className="mt-6 grid gap-3 rounded-3xl border border-white/10 bg-black/25 p-4 text-sm text-slate-300">
        <div className="flex items-center gap-3">
          <Truck className="shrink-0 text-cobalt" size={18} />
          Ships from China with tracking to USA, UK, and Europe.
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="shrink-0 text-cobalt" size={18} />
          Effect duration up to 6-7 months with proper preparation.
        </div>
        <div className="flex items-center gap-3">
          <CreditCard className="shrink-0 text-cobalt" size={18} />
          Prepared for PayPal and 2Checkout secure payment integration.
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {paymentBadges.map((badge) => (
          <span
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-slate-300"
            key={badge}
          >
            <BadgeCheck size={13} />
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
