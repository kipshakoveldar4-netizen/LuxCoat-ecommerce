import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, getAdminPassword, getAdminToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json();

  if (body.password !== getAdminPassword()) {
    return NextResponse.json({ error: "Invalid admin password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, getAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return response;
}
