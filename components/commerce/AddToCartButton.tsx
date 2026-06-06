"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { addToCart, productToCartItem } from "@/components/commerce/cart-store";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  quantity = 1,
  className = "btn-primary"
}: {
  product: Product;
  quantity?: number;
  className?: string;
}) {
  const [added, setAdded] = useState(false);

  return (
    <button
      className={className}
      onClick={() => {
        addToCart(productToCartItem(product, quantity));
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
      type="button"
    >
      <ShoppingCart size={18} />
      {added ? "Added" : "Add to Cart"}
    </button>
  );
}
