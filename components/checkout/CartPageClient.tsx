"use client";

import { BadgeCheck, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  readCart,
  removeFromCart,
  updateCartQuantity
} from "@/components/commerce/cart-store";
import { paymentBadges } from "@/lib/content";
import { formatMoney } from "@/lib/money";
import type { CartItem } from "@/lib/types";

export function CartPageClient() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const refresh = () => setItems(readCart());
    refresh();
    window.addEventListener("luxcoat-cart", refresh);
    return () => window.removeEventListener("luxcoat-cart", refresh);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.priceCents * item.quantity, 0),
    [items]
  );
  const shipping = subtotal >= 7000 || subtotal === 0 ? 0 : 695;
  const total = subtotal + shipping;
  const freeShippingRemaining = Math.max(0, 7000 - subtotal);
  const currency = items[0]?.currency ?? "USD";

  return (
    <section className="page-shell section">
      <p className="eyebrow">Cart</p>
      <h1 className="section-title">Review your coating order.</h1>
      <p className="section-copy">
        Confirm quantity, shipping cost, and checkout confidence signals before
        entering customer details.
      </p>

      {items.length === 0 ? (
        <div className="glass-panel mt-10 rounded-[2rem] p-8 text-center">
          <ShoppingBag className="mx-auto text-cobalt" size={38} />
          <h2 className="mt-5 text-2xl font-black text-white">Your cart is empty.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
            Add LuxCoat Liquid Glass to start a USA, UK, or Europe checkout flow.
          </p>
          <Link className="btn-primary mt-6" href="/shop">
            Shop LuxCoat
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="grid gap-4">
            {items.map((item) => (
              <article
                className="glass-panel grid gap-5 rounded-[1.6rem] p-4 sm:grid-cols-[120px_1fr] lg:grid-cols-[120px_1fr_auto]"
                key={item.productId}
              >
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-black/40 p-1.5">
                  <Image
                    alt={item.title}
                    className="h-full w-full object-contain"
                    height={1254}
                    quality={95}
                    sizes="120px"
                    src={item.imageUrl}
                    width={1254}
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-cobalt">
                    {item.sizeMl} ml | {item.sku}
                  </p>
                  <h2 className="mt-2 text-xl font-black text-white">{item.title}</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    {formatMoney(item.priceCents, item.currency)} each
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className="flex items-center rounded-full border border-white/15 bg-white/10 p-1">
                      <button
                        aria-label="Decrease quantity"
                        className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
                        onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                        type="button"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
                        onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                        type="button"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                    <button
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white"
                      onClick={() => removeFromCart(item.productId)}
                      type="button"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 sm:col-span-2 lg:col-span-1 lg:flex-col lg:items-end lg:justify-between">
                  <p className="text-sm font-semibold text-slate-500">Line total</p>
                  <p className="text-2xl font-black text-white">
                    {formatMoney(item.priceCents * item.quantity, item.currency)}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <aside className="glass-panel h-fit rounded-[2rem] p-6 lg:sticky lg:top-32">
            <h2 className="text-2xl font-black text-white">Order Summary</h2>
            {freeShippingRemaining > 0 ? (
              <div className="mt-5 rounded-2xl border border-cobalt/30 bg-cobalt/10 p-4">
                <p className="text-sm font-semibold text-white">
                  Add {formatMoney(freeShippingRemaining, currency)} for free shipping.
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-cobalt"
                    style={{ width: `${Math.min(100, (subtotal / 7000) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-2xl border border-cobalt/30 bg-cobalt/10 p-4 text-sm font-semibold text-white">
                Free shipping unlocked.
              </div>
            )}
            <div className="mt-6 grid gap-4 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tracked shipping from China</span>
                <span>{shipping === 0 ? "Free" : formatMoney(shipping, currency)}</span>
              </div>
              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between text-lg font-black text-white">
                  <span>Total</span>
                  <span>{formatMoney(total, currency)}</span>
                </div>
              </div>
            </div>
            <Link className="btn-primary mt-7 w-full" href="/checkout">
              Checkout
            </Link>
            <div className="mt-5 grid gap-2">
              {paymentBadges.map((badge) => (
                <p className="flex items-center gap-2 text-xs text-slate-400" key={badge}>
                  <BadgeCheck className="text-cobalt" size={15} />
                  {badge}
                </p>
              ))}
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
