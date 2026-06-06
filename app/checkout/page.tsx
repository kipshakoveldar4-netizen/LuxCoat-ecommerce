import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout",
  description: "LuxCoat checkout flow."
};

export default function CheckoutPage() {
  return <CheckoutFlow />;
}
