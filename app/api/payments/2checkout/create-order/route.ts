import { NextResponse } from "next/server";
import { createTwoCheckoutOrder } from "@/lib/payments/twocheckout";

export async function POST(request: Request) {
  const body = await request.json();
  const result = await createTwoCheckoutOrder(body);
  return NextResponse.json(result, {
    status: result.status === "configuration_required" ? 202 : 201
  });
}
