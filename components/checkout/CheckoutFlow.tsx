"use client";

import {
  AlertCircle,
  BadgeCheck,
  Check,
  CreditCard,
  LockKeyhole,
  MapPin,
  PackageCheck,
  User
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { clearCart, readCart } from "@/components/commerce/cart-store";
import { paymentBadges } from "@/lib/content";
import { formatMoney } from "@/lib/money";
import type { CartItem, Order } from "@/lib/types";

const steps = [
  "Cart",
  "Customer",
  "Shipping",
  "Payment",
  "Confirmation"
];

export function CheckoutFlow() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState(0);
  const [paymentProvider, setPaymentProvider] = useState<"paypal" | "2checkout" | "manual">("paypal");
  const [order, setOrder] = useState<Order | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "United States",
    line1: "",
    line2: "",
    city: "",
    region: "",
    postalCode: ""
  });

  useEffect(() => {
    setItems(readCart());
  }, []);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.priceCents * item.quantity, 0),
    [items]
  );
  const shipping = subtotal >= 7000 || subtotal === 0 ? 0 : 695;
  const total = subtotal + shipping;
  const currency = items[0]?.currency ?? "USD";

  function validateStep(nextStep: number) {
    if (step === 0 && items.length === 0) {
      setFormError("Add a product to cart before checkout.");
      return;
    }

    if (step === 1) {
      const validCustomer =
        form.firstName.trim() &&
        form.lastName.trim() &&
        form.email.includes("@") &&
        form.country.trim();
      if (!validCustomer) {
        setFormError("Enter customer name, email, and destination market.");
        return;
      }
    }

    if (step === 2) {
      const validAddress =
        form.line1.trim() &&
        form.city.trim() &&
        form.region.trim() &&
        form.postalCode.trim();
      if (!validAddress) {
        setFormError("Complete the shipping address before payment.");
        return;
      }
    }

    setFormError("");
    setStep(nextStep);
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!items.length) {
      setFormError("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          country: form.country
        },
        shippingAddress: {
          line1: form.line1,
          line2: form.line2,
          city: form.city,
          region: form.region,
          postalCode: form.postalCode,
          country: form.country
        },
        items,
        paymentProvider
      })
    });

    const payload = await response.json();
    setSubmitting(false);

    if (!response.ok || !payload.order) {
      setFormError("Order could not be created. Check the checkout details.");
      return;
    }

    setOrder(payload.order);
    clearCart();
    setStep(4);
  }

  function updateField(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <section className="page-shell section">
      <p className="eyebrow">Checkout</p>
      <h1 className="section-title">Secure checkout flow prepared for launch.</h1>
      <p className="section-copy">
        Real payment capture is still disabled, but the customer, shipping, order,
        and provider handoff structure is ready for PayPal and 2Checkout.
      </p>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="grid min-w-[720px] grid-cols-5 gap-3 md:min-w-0">
          {steps.map((label, index) => (
            <div
              className={`rounded-2xl border px-4 py-3 text-xs font-bold uppercase leading-5 tracking-[0.12em] ${
                index <= step
                  ? "border-cobalt/50 bg-cobalt/15 text-white"
                  : "border-white/10 bg-white/[0.04] text-slate-500"
              }`}
              key={label}
            >
              <span className="mr-2 text-cobalt">{index + 1}</span>
              {label}
            </div>
          ))}
        </div>
      </div>

      {formError ? (
        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-100">
          <AlertCircle size={18} />
          {formError}
        </div>
      ) : null}

      {items.length === 0 && !order ? (
        <div className="glass-panel mt-10 rounded-[2rem] p-8 text-center">
          <h2 className="text-2xl font-black text-white">Your cart is empty.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
            Add LuxCoat Liquid Glass to start the checkout review flow.
          </p>
          <Link className="btn-primary mt-6" href="/shop">
            Return to Shop
          </Link>
        </div>
      ) : (
        <form className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]" onSubmit={submitOrder}>
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            {step === 0 ? (
              <CheckoutCart items={items} onNext={() => validateStep(1)} />
            ) : null}

            {step === 1 ? (
              <div>
                <StepHeader icon={User} title="Customer information" />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <input className="field" placeholder="First name" required value={form.firstName} onChange={(event) => updateField("firstName", event.target.value)} />
                  <input className="field" placeholder="Last name" required value={form.lastName} onChange={(event) => updateField("lastName", event.target.value)} />
                  <input className="field" placeholder="Email" required type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
                  <input className="field" placeholder="Phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
                  <select className="field sm:col-span-2" value={form.country} onChange={(event) => updateField("country", event.target.value)}>
                    <option className="bg-midnight">United States</option>
                    <option className="bg-midnight">United Kingdom</option>
                    <option className="bg-midnight">Germany</option>
                    <option className="bg-midnight">France</option>
                    <option className="bg-midnight">Netherlands</option>
                    <option className="bg-midnight">Italy</option>
                    <option className="bg-midnight">Spain</option>
                  </select>
                </div>
                <StepActions back={() => setStep(0)} next={() => validateStep(2)} />
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <StepHeader icon={MapPin} title="Shipping address" />
                <div className="mt-6 grid gap-4">
                  <input className="field" placeholder="Address line 1" required value={form.line1} onChange={(event) => updateField("line1", event.target.value)} />
                  <input className="field" placeholder="Address line 2" value={form.line2} onChange={(event) => updateField("line2", event.target.value)} />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <input className="field" placeholder="City" required value={form.city} onChange={(event) => updateField("city", event.target.value)} />
                    <input className="field" placeholder="State / Region" required value={form.region} onChange={(event) => updateField("region", event.target.value)} />
                    <input className="field" placeholder="Postal code" required value={form.postalCode} onChange={(event) => updateField("postalCode", event.target.value)} />
                  </div>
                </div>
                <StepActions back={() => setStep(1)} next={() => validateStep(3)} />
              </div>
            ) : null}

            {step === 3 ? (
              <div>
                <StepHeader icon={CreditCard} title="Payment placeholder" />
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {[
                    { id: "paypal", label: "PayPal", text: "Provider handoff prepared." },
                    { id: "2checkout", label: "2Checkout", text: "Hosted payment route prepared." },
                    { id: "manual", label: "Manual test", text: "For local review only." }
                  ].map((option) => (
                    <label
                      className={`cursor-pointer rounded-2xl border p-5 transition ${
                        paymentProvider === option.id
                          ? "border-cobalt bg-cobalt/15 shadow-glow"
                          : "border-white/10 bg-white/[0.04] hover:border-white/25"
                      }`}
                      key={option.id}
                    >
                      <input
                        className="sr-only"
                        checked={paymentProvider === option.id}
                        name="paymentProvider"
                        onChange={() => setPaymentProvider(option.id as typeof paymentProvider)}
                        type="radio"
                        value={option.id}
                      />
                      <span className="text-sm font-bold text-white">{option.label}</span>
                      <span className="mt-2 block text-xs leading-5 text-slate-400">
                        {option.text}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-4">
                  <div className="flex items-center gap-3 text-sm font-semibold text-white">
                    <LockKeyhole className="text-cobalt" size={18} />
                    No real payment is captured in this review build.
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {paymentBadges.map((badge) => (
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-slate-300" key={badge}>
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button className="btn-secondary" onClick={() => setStep(2)} type="button">
                    Back
                  </button>
                  <button className="btn-primary" disabled={submitting} type="submit">
                    {submitting ? "Creating Order..." : "Place Order"}
                  </button>
                </div>
              </div>
            ) : null}

            {step === 4 && order ? (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cobalt text-white shadow-glow">
                  <Check size={30} />
                </div>
                <h2 className="mt-6 text-3xl font-black text-white">Order confirmed.</h2>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Order {order.orderNumber} has been created locally. Payment capture
                  can be enabled once provider credentials are added.
                </p>
                <Link className="btn-primary mt-7" href="/">
                  Back to Home
                </Link>
              </div>
            ) : null}
          </div>

          <aside className="glass-panel h-fit rounded-[2rem] p-6 lg:sticky lg:top-32">
            <h2 className="text-2xl font-black text-white">Order Summary</h2>
            <div className="mt-6 grid gap-4">
              {items.map((item) => (
                <div className="flex gap-3" key={item.productId}>
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-black/40">
                    <Image alt={item.title} className="object-cover" fill sizes="64px" src={item.imageUrl} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs text-slate-400">Qty {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-white">
                    {formatMoney(item.priceCents * item.quantity, item.currency)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal, currency)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Tracked shipping</span>
                <span>{shipping === 0 ? "Free" : formatMoney(shipping, currency)}</span>
              </div>
              <div className="flex justify-between text-lg font-black text-white">
                <span>Total</span>
                <span>{formatMoney(total, currency)}</span>
              </div>
            </div>
            <div className="mt-6 grid gap-2 border-t border-white/10 pt-5 text-xs text-slate-400">
              <p className="flex items-center gap-2"><BadgeCheck className="text-cobalt" size={15} /> SDS-ready product documentation</p>
              <p className="flex items-center gap-2"><BadgeCheck className="text-cobalt" size={15} /> PayPal and 2Checkout integration points</p>
              <p className="flex items-center gap-2"><BadgeCheck className="text-cobalt" size={15} /> Ships from China with tracking</p>
            </div>
          </aside>
        </form>
      )}
    </section>
  );
}

function CheckoutCart({
  items,
  onNext
}: {
  items: CartItem[];
  onNext: () => void;
}) {
  return (
    <div>
      <StepHeader icon={PackageCheck} title="Cart review" />
      <div className="mt-6 grid gap-4">
        {items.map((item) => (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={item.productId}>
            <p className="font-bold text-white">{item.title}</p>
            <p className="mt-1 text-sm text-slate-400">
              {item.quantity} x {formatMoney(item.priceCents, item.currency)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link className="btn-secondary" href="/cart">
          Edit Cart
        </Link>
        <button className="btn-primary" onClick={onNext} type="button">
          Continue
        </button>
      </div>
    </div>
  );
}

function StepHeader({
  icon: Icon,
  title
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cobalt/40 bg-cobalt/15 text-cobalt">
        <Icon size={22} />
      </span>
      <h2 className="text-2xl font-black text-white">{title}</h2>
    </div>
  );
}

function StepActions({
  back,
  next
}: {
  back: () => void;
  next: () => void;
}) {
  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
      <button className="btn-secondary" onClick={back} type="button">
        Back
      </button>
      <button className="btn-primary" onClick={next} type="button">
        Continue
      </button>
    </div>
  );
}
