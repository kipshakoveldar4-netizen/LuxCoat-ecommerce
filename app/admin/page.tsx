import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { hasAdminSession } from "@/lib/admin-auth";
import { getOrders, getProducts } from "@/lib/store";

export const metadata: Metadata = {
  title: "Admin Dashboard"
};

export default async function AdminPage() {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }

  const [orders, products] = await Promise.all([getOrders(), getProducts()]);

  return (
    <section className="page-shell section">
      <p className="eyebrow">Admin</p>
      <h1 className="section-title">LuxCoat operations dashboard.</h1>
      <AdminDashboard orders={orders} products={products} />
    </section>
  );
}
