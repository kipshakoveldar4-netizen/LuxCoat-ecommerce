import type { Metadata } from "next";
import { CartPageClient } from "@/components/checkout/CartPageClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your LuxCoat cart."
};

export default function CartPage() {
  return <CartPageClient />;
}
