import type { CurrencyCode } from "@/lib/types";

export function formatMoney(cents: number, currency: CurrencyCode = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(cents / 100);
}

export function convertPrice(cents: number, currency: CurrencyCode) {
  const rates: Record<CurrencyCode, number> = {
    USD: 1,
    GBP: 0.79,
    EUR: 0.92
  };

  return Math.round(cents * rates[currency]);
}
