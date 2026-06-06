import { NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/payments/paypal";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await createPayPalOrder(body);
  return NextResponse.json(result, {
    status: result.status === "configuration_required" ? 202 : 201
  });
}
