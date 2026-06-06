"use client";

import type { CartItem, Product } from "@/lib/types";

const CART_KEY = "luxcoat_cart";

export function productToCartItem(product: Product, quantity = 1): CartItem {
  return {
    productId: product.id,
    slug: product.slug,
    sku: product.sku,
    title: product.title,
    sizeMl: product.sizeMl,
    priceCents: product.priceCents,
    currency: product.currency,
    imageUrl: product.imageUrl,
    quantity
  };
}

export function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(CART_KEY);
  if (!raw) {
    return [];
  }

  try {
    const items = JSON.parse(raw);
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("luxcoat-cart"));
}

export function addToCart(item: CartItem) {
  const current = readCart();
  const existing = current.find((cartItem) => cartItem.productId === item.productId);

  if (existing) {
    existing.quantity += item.quantity;
    writeCart(current);
    return;
  }

  writeCart([...current, item]);
}

export function removeFromCart(productId: string) {
  writeCart(readCart().filter((item) => item.productId !== productId));
}

export function updateCartQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  writeCart(
    readCart().map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    )
  );
}

export function clearCart() {
  writeCart([]);
}
