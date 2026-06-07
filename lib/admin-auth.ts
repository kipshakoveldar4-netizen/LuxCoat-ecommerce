export const ADMIN_COOKIE_NAME = "luxcoat_admin";

export function getAdminToken() {
  return process.env.ADMIN_SESSION_TOKEN?.trim() ?? "";
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

export function isAdminConfigured() {
  return Boolean(getAdminPassword() && getAdminToken());
}

export async function hasAdminSession() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const adminToken = getAdminToken();
  return Boolean(adminToken && cookieStore.get(ADMIN_COOKIE_NAME)?.value === adminToken);
}
