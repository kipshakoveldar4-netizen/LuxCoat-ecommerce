"use client";

import { Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { addToCart, productToCartItem } from "@/components/commerce/cart-store";
import type { Product } from "@/lib/types";

export function BuyNowButton({
  product,
  quantity
}: {
  product: Product;
  quantity: number;
}) {
  const router = useRouter();

  return (
    <button
      className="btn-secondary w-full"
      onClick={() => {
        addToCart(productToCartItem(product, quantity));
        router.push("/checkout");
      }}
      type="button"
    >
      <Zap size={18} />
      Buy Now
    </button>
  );
}
