import type { CartItem, CustomerInput, ShippingAddress } from "@/lib/types";

export type PaymentIntentInput = {
  orderNumber: string;
  amountCents: number;
  currency: string;
  customer: CustomerInput;
  shippingAddress: ShippingAddress;
  items: CartItem[];
};

export type PaymentIntentResult = {
  provider: "paypal" | "2checkout";
  providerOrderId: string;
  approvalUrl?: string;
  status: "created" | "configuration_required";
  message?: string;
};
