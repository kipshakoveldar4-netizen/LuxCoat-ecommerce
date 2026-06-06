import type { PaymentIntentInput, PaymentIntentResult } from "@/lib/payments/types";

export async function createTwoCheckoutOrder(
  input: PaymentIntentInput
): Promise<PaymentIntentResult> {
  if (!process.env.TWOCHECKOUT_MERCHANT_CODE || !process.env.TWOCHECKOUT_SECRET_KEY) {
    return {
      provider: "2checkout",
      providerOrderId: `2co_placeholder_${input.orderNumber}`,
      status: "configuration_required",
      message:
        "Add TWOCHECKOUT_MERCHANT_CODE and TWOCHECKOUT_SECRET_KEY to enable 2Checkout."
    };
  }

  // Production integration point:
  // 1. Sign the checkout payload with 2Checkout credentials.
  // 2. Build hosted checkout redirect URL.
  // 3. Persist provider order reference and verify webhooks server-side.
  return {
    provider: "2checkout",
    providerOrderId: `2co_ready_${input.orderNumber}`,
    status: "created"
  };
}
