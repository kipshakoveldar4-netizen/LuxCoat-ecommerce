"use client";

import { Menu, ShoppingCart, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, site } from "@/lib/content";

const currencyOptions = ["USD", "GBP", "EUR"];

export function SiteHeader() {
  const [cartCount, setCartCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    function refreshCart() {
      const raw = window.localStorage.getItem("luxcoat_cart");
      const items = raw ? JSON.parse(raw) : [];
      setCartCount(
        Array.isArray(items)
          ? items.reduce((total, item) => total + Number(item.quantity ?? 0), 0)
          : 0
      );
    }

    refreshCart();
    window.addEventListener("luxcoat-cart", refreshCart);
    window.addEventListener("storage", refreshCart);
    return () => {
      window.removeEventListener("luxcoat-cart", refreshCart);
      window.removeEventListener("storage", refreshCart);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("luxcoat_currency", currency);
    window.dispatchEvent(new Event("luxcoat-currency"));
  }, [currency]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-midnight/82 backdrop-blur-xl">
      <div className="border-b border-white/10 bg-cobalt/12 px-4 py-2 text-center text-xs font-semibold text-white">
        {site.announcement}
      </div>
      <div className="page-shell flex h-20 items-center justify-between gap-4">
        <Link aria-label="LuxCoat home" className="flex items-center gap-3" href="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cobalt/60 bg-cobalt/15 text-sm font-black text-white shadow-glow">
            LC
          </span>
          <span className="text-xl font-black tracking-wide text-white">LuxCoat</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 lg:flex">
          {navItems.map((item) => (
            <Link className="transition hover:text-white" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <select
            aria-label="Country and currency"
            className="hidden rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white outline-none sm:block"
            onChange={(event) => setCurrency(event.target.value)}
            value={currency}
          >
            {currencyOptions.map((option) => (
              <option className="bg-midnight" key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Link
            className="hidden rounded-full border border-cobalt/40 bg-cobalt/15 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-cobalt/25 xl:inline-flex"
            href="/product/luxcoat-liquid-glass-237ml"
          >
            Shop Now
          </Link>
          <Link
            aria-label={`Cart with ${cartCount} items`}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-cobalt"
            href="/cart"
          >
            <ShoppingCart size={19} />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-cobalt px-1.5 text-center text-[11px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white lg:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-midnight px-4 py-5 lg:hidden">
          <div className="mb-4 rounded-2xl border border-cobalt/30 bg-cobalt/10 p-4">
            <div className="flex items-center gap-2 text-cobalt">
              <Sparkles size={17} />
              <p className="text-xs font-bold uppercase tracking-[0.16em]">
                Premium Liquid Glass
              </p>
            </div>
            <select
              aria-label="Mobile country and currency"
              className="mt-3 w-full rounded-2xl border border-white/15 bg-black/30 px-3 py-3 text-sm font-semibold text-white outline-none"
              onChange={(event) => setCurrency(event.target.value)}
              value={currency}
            >
              {currencyOptions.map((option) => (
                <option className="bg-midnight" key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <nav className="grid gap-3 text-sm font-semibold text-slate-200">
            {navItems.map((item) => (
              <Link
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="btn-primary mt-2"
              href="/product/luxcoat-liquid-glass-237ml"
              onClick={() => setOpen(false)}
            >
              Shop LuxCoat
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
