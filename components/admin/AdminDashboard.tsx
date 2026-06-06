"use client";

import { Clock3, Edit3, Package, Save, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatMoney } from "@/lib/money";
import type { Order, OrderStatus, Product } from "@/lib/types";

const statuses: OrderStatus[] = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "refunded",
  "cancelled"
];

export function AdminDashboard({
  orders,
  products
}: {
  orders: Order[];
  products: Product[];
}) {
  const [inventory, setInventory] = useState(products[0]?.inventoryQuantity ?? 0);
  const [statusMessage, setStatusMessage] = useState("");

  async function saveInventory(slug: string) {
    const response = await fetch("/api/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, inventoryQuantity: inventory })
    });
    const payload = await response.json();
    setStatusMessage(payload.message ?? "Inventory updated.");
  }

  async function updateStatus(id: string, status: OrderStatus) {
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const payload = await response.json();
    setStatusMessage(payload.message ?? "Order status updated.");
  }

  const totalRevenue = orders.reduce((total, order) => total + order.totalCents, 0);

  return (
    <div className="mt-10 grid gap-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Metric icon={Package} label="Orders" value={orders.length.toString()} />
        <Metric icon={Users} label="Customers" value={new Set(orders.map((order) => order.customer.email)).size.toString()} />
        <Metric icon={Edit3} label="Revenue" value={formatMoney(totalRevenue, "USD")} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass-panel rounded-[1.5rem] p-5">
          <ShieldCheck className="text-cobalt" size={24} />
          <h2 className="mt-4 text-lg font-bold text-white">Protected admin preview</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Dashboard access is guarded by the admin cookie. Real payment capture
            remains disabled until provider credentials and webhooks are configured.
          </p>
        </div>
        <div className="glass-panel rounded-[1.5rem] p-5">
          <Clock3 className="text-cobalt" size={24} />
          <h2 className="mt-4 text-lg font-bold text-white">Fulfillment workflow</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Orders can move from pending to shipped, delivered, refunded, or
            cancelled while inventory stays editable for launch preparation.
          </p>
        </div>
      </div>

      {statusMessage ? (
        <div className="rounded-2xl border border-cobalt/40 bg-cobalt/10 px-5 py-4 text-sm font-semibold text-cobalt">
          {statusMessage}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="glass-panel overflow-hidden rounded-[2rem]">
          <div className="border-b border-white/10 p-6">
            <h2 className="text-2xl font-black text-white">Orders</h2>
            <p className="mt-2 text-sm text-slate-400">
              Review orders, customer data, payment status, and fulfillment progress.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-white/10 text-xs uppercase tracking-[0.14em] text-slate-500">
                <tr>
                  <th className="px-6 py-4">Order</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr className="border-b border-white/5" key={order.id}>
                    <td className="px-6 py-5 font-bold text-white">{order.orderNumber}</td>
                    <td className="px-6 py-5 text-slate-300">
                      <span className="block font-semibold text-white">
                        {order.customer.firstName} {order.customer.lastName}
                      </span>
                      <span className="text-xs text-slate-500">{order.customer.email}</span>
                    </td>
                    <td className="px-6 py-5 text-white">{formatMoney(order.totalCents, order.currency)}</td>
                    <td className="px-6 py-5">
                      <select
                        className="rounded-full border border-cobalt/30 bg-cobalt/10 px-3 py-2 text-xs font-bold text-white outline-none"
                        defaultValue={order.status}
                        onChange={(event) => updateStatus(order.id, event.target.value as OrderStatus)}
                      >
                        {statuses.map((status) => (
                          <option className="bg-midnight" key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-5">
                      <Link className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-bold text-cobalt hover:border-cobalt/60 hover:text-blue-300" href={`/admin/orders/${order.id}`}>
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="glass-panel rounded-[2rem] p-6">
          <h2 className="text-2xl font-black text-white">Product Editing</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Edit product metadata, pricing, and inventory here. This local panel
            writes inventory to PostgreSQL when DATABASE_URL is configured.
          </p>
          {products.map((product) => (
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5" key={product.id}>
              <label className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Product title
              </label>
              <input className="field mt-2" readOnly value={product.title} />
              <label className="mt-4 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Price
              </label>
              <input className="field mt-2" readOnly value={formatMoney(product.priceCents, product.currency)} />
              <label className="mt-4 block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Inventory quantity
              </label>
              <input
                className="field mt-2"
                min="0"
                onChange={(event) => setInventory(Number(event.target.value))}
                type="number"
                value={inventory}
              />
              <button className="btn-primary mt-5 w-full" onClick={() => saveInventory(product.slug)} type="button">
                <Save size={18} />
                Save Product
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value
}: {
  icon: typeof Package;
  label: string;
  value: string;
}) {
  return (
    <article className="glass-panel rounded-[1.5rem] p-6">
      <Icon className="text-cobalt" size={25} />
      <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
    </article>
  );
}
