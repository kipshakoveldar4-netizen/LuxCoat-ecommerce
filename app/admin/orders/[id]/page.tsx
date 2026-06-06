import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { hasAdminSession } from "@/lib/admin-auth";
import { formatMoney } from "@/lib/money";
import { getOrderById } from "@/lib/store";

export const metadata: Metadata = {
  title: "Order Details"
};

type OrderDetailProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminOrderDetailPage({ params }: OrderDetailProps) {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <section className="page-shell section">
      <Link className="text-sm font-bold text-cobalt hover:text-blue-300" href="/admin">
        Back to Admin
      </Link>
      <p className="eyebrow mt-8">Order Details</p>
      <h1 className="section-title">{order.orderNumber}</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <article className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-2xl font-black text-white">Customer</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <p>{order.customer.firstName} {order.customer.lastName}</p>
            <p>{order.customer.email}</p>
            <p>{order.customer.phone ?? "No phone provided"}</p>
            <p>{order.customer.country}</p>
          </div>
        </article>
        <article className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-2xl font-black text-white">Shipping Address</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <p>{order.shippingAddress.line1}</p>
            {order.shippingAddress.line2 ? <p>{order.shippingAddress.line2}</p> : null}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.region} {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </article>
      </div>
      <article className="glass-panel mt-8 rounded-[2rem] p-6">
        <h2 className="text-2xl font-black text-white">Order Summary</h2>
        <div className="mt-5 grid gap-3 text-sm text-slate-300">
          <div className="flex justify-between">
            <span>Status</span>
            <span className="font-bold text-white">{order.status}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment provider</span>
            <span className="font-bold text-white">{order.paymentProvider}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment status</span>
            <span className="font-bold text-white">{order.paymentStatus}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatMoney(order.subtotalCents, order.currency)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatMoney(order.shippingCents, order.currency)}</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-4 text-lg font-black text-white">
            <span>Total</span>
            <span>{formatMoney(order.totalCents, order.currency)}</span>
          </div>
        </div>
      </article>
    </section>
  );
}
