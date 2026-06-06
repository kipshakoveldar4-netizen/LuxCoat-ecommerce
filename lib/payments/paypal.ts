import type { PaymentIntentInput, PaymentIntentResult } from "@/lib/payments/types";

export async function createPayPalOrder(
  input: PaymentIntentInput
): Promise<PaymentIntentResult> {
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    return {
      provider: "paypal",
      providerOrderId: `paypal_placeholder_${input.orderNumber}`,
      status: "configuration_required",
      message:
        "Add PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET to enable live PayPal order creation."
    };
  }

  // Production integration point:
  // 1. Request OAuth token from PayPal.
  // 2. Create an order using amount, items, shipping, and return/cancel URLs.
  // 3. Store provider order id against the local order before redirecting.
  return {
    provider: "paypal",
    providerOrderId: `paypal_ready_${input.orderNumber}`,
    status: "created"
  };
}
