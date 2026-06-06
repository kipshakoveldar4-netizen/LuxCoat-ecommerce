import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { createOrder, getOrders } from "@/lib/store";
import { checkoutSchema } from "@/lib/validation";

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const orders = await getOrders();
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = checkoutSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid checkout payload.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const order = await createOrder(parsed.data);
  return NextResponse.json({ order }, { status: 201 });
}
