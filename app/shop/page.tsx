import type { Metadata } from "next";
import { ProductCard } from "@/components/commerce/ProductCard";
import { getProducts } from "@/lib/store";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop LuxCoat Liquid Glass automotive coating."
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <section className="page-shell section">
      <p className="eyebrow">Shop LuxCoat</p>
      <h1 className="section-title">Premium coating essentials.</h1>
      <p className="section-copy">
        Start with LuxCoat Liquid Glass 237 ml, prepared for USA, UK, and Europe
        checkout flows with tracked shipping from China.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
        <article className="glass-panel rounded-[2rem] p-8">
          <p className="eyebrow">Coming Soon</p>
          <h2 className="mt-4 text-3xl font-black text-white">Applicator Kit</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Microfiber applicators, buffing towels, and prep accessories can be
            added as additional products through the admin dashboard.
          </p>
        </article>
      </div>
    </section>
  );
}
