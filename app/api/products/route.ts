import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { getProducts, updateProductInventory } from "@/lib/store";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json({ products });
}

export async function PATCH(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();

  if (typeof body.slug !== "string" || typeof body.inventoryQuantity !== "number") {
    return NextResponse.json({ error: "Invalid product update." }, { status: 400 });
  }

  const persisted = await updateProductInventory(body.slug, body.inventoryQuantity);
  return NextResponse.json({
    ok: true,
    persisted,
    message: persisted
      ? "Product inventory updated."
      : "DATABASE_URL is not configured, so this update is local-preview only."
  });
}
