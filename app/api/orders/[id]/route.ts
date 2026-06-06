import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { getOrderById, updateOrderStatus } from "@/lib/store";
import { orderStatusSchema } from "@/lib/validation";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const order = await getOrderById(id);

  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json({ order });
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const json = await request.json();
  const parsed = orderStatusSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order status." }, { status: 400 });
  }

  const persisted = await updateOrderStatus(id, parsed.data.status);
  return NextResponse.json({
    ok: true,
    persisted,
    message: persisted
      ? "Order status updated."
      : "DATABASE_URL is not configured, so this update is local-preview only."
  });
}
