import { ChevronRight, CreditCard, FileCheck2, Globe2, LockKeyhole, ShieldCheck, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/commerce/ProductCard";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import {
  applicationSteps,
  beforeAfterMetrics,
  certificates,
  faqs,
  guaranteeTiles,
  howItWorks,
  paymentBadges,
  product,
  reviews
} from "@/lib/content";

export function PremiumTrustStrip() {
  const trustItems = [
    {
      icon: Truck,
      title: "Tracked worldwide shipping",
      text: "Fulfillment from China for USA, UK, and Europe orders."
    },
    {
      icon: LockKeyhole,
      title: "Secure checkout prepared",
      text: "PayPal and 2Checkout placeholders are ready for live integration."
    },
    {
      icon: FileCheck2,
      title: "SDS and certificates area",
      text: "Compliance documents have a dedicated buyer trust page."
    },
    {
      icon: Globe2,
      title: "Multi-market storefront",
      text: "Currency selector and policy pages support international launch."
    }
  ];

  return (
    <section className="relative z-10 -mt-8 pb-4 sm:-mt-10">
      <div className="page-shell">
        <div className="glass-panel rounded-[2rem] p-4 shadow-2xl shadow-cobalt/10 sm:p-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4"
                  key={item.title}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cobalt/35 bg-cobalt/15 text-cobalt">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h2 className="text-sm font-black text-white">{item.title}</h2>
                      <p className="mt-1 text-xs leading-5 text-slate-400">{item.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BeforeAfterSection() {
  return (
    <section className="section">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="eyebrow">Before / After</p>
            <h2 className="section-title">A darker, sharper, more expensive-looking finish.</h2>
            <p className="section-copy">
              The comparison is framed like a detailing bay: dull paint on one side,
              wet-look reflection and stronger water behavior on the other.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-3">
              {beforeAfterMetrics.map((metric) => (
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4" key={metric.label}>
                  <p className="text-xl font-black text-white">{metric.value}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
            <Link className="btn-secondary mt-7" href="/before-after">
              Open Gallery
              <ChevronRight size={18} />
            </Link>
          </div>
          <BeforeAfterSlider />
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section className="section bg-black/25">
      <div className="page-shell">
        <p className="eyebrow">How It Works</p>
        <h2 className="section-title">A slick glass-like layer that intensifies gloss.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {howItWorks.map((item, index) => (
            <article className="glass-panel overflow-hidden rounded-[1.5rem] p-6" key={item.title}>
              <span className="text-sm font-black text-cobalt">0{index + 1}</span>
              <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ApplyStepsSection() {
  return (
    <section className="section">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow">3 Step Application</p>
            <h2 className="section-title">Hand-applied shine, without a machine polisher.</h2>
            <p className="section-copy">
              The process is intentionally simple for drivers who want a premium
              detailer-style finish at home.
            </p>
            <div className="mt-8 grid gap-4">
              {applicationSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div className="glass-panel rounded-[1.5rem] p-5" key={step.title}>
                    <div className="flex gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cobalt/35 bg-cobalt/15 text-cobalt">
                        <Icon size={22} />
                      </span>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-cobalt">
                          Step {index + 1}
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-white">{step.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{step.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/15 bg-black p-4 sm:min-h-[560px] sm:p-6">
            <Image
              alt="LuxCoat bottle on dark detailing surface"
              className="h-auto max-h-[520px] w-full max-w-[560px] object-contain"
              height={1254}
              quality={96}
              sizes="(max-width: 768px) 100vw, 50vw"
              src="/images/luxcoat-product.png"
              width={1254}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" />
            <div className="absolute bottom-6 left-4 right-4 rounded-3xl border border-white/15 bg-black/62 p-5 backdrop-blur-xl sm:left-6 sm:right-6">
              <p className="text-sm font-semibold text-slate-200">
                Best results: wash, dry, apply thin, buff clear, and keep dry for 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedProductSection() {
  return (
    <section className="section bg-black/25">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="eyebrow">Featured Product</p>
            <h2 className="section-title">One premium bottle. Months of glassy gloss.</h2>
            <p className="section-copy">
              The product card now carries the detail that helps a shopper decide:
              result duration, application time, payment confidence, shipping, and
              certificate readiness.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {paymentBadges.map((badge) => (
                <span className="premium-chip" key={badge}>{badge}</span>
              ))}
            </div>
          </div>
          <ProductCard product={product} />
        </div>
      </div>
    </section>
  );
}

export function ConfidenceSection() {
  return (
    <section className="section">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="eyebrow">Trust Layer</p>
            <h2 className="section-title">Built for review before real payment launch.</h2>
            <p className="section-copy">
              LuxCoat can now show the signals shoppers expect before checkout:
              guarantees, documents, safe payment language, and clear fulfillment.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {guaranteeTiles.map((item) => {
              const Icon = item.icon;
              return (
                <article className="glass-panel rounded-[1.5rem] p-5" key={item.title}>
                  <Icon className="text-cobalt" size={24} />
                  <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section className="section">
      <div className="page-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Customer Reviews</p>
            <h2 className="section-title">More confidence from more markets.</h2>
          </div>
          <div className="rounded-2xl border border-cobalt/30 bg-cobalt/10 px-5 py-4">
            <p className="text-sm font-bold text-white">4.9 average rating</p>
            <p className="mt-1 text-xs text-slate-400">USA, UK, and Europe review set</p>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <article className="glass-panel rounded-[1.6rem] p-6" key={review.name}>
              <div className="flex gap-1 text-cobalt">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star fill="currentColor" key={index} size={17} />
                ))}
              </div>
              <p className="mt-5 text-base leading-7 text-slate-200">"{review.text}"</p>
              <p className="mt-5 text-sm font-bold text-white">{review.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                {review.market}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="section bg-black/25">
      <div className="page-shell">
        <p className="eyebrow">FAQ</p>
        <h2 className="section-title">Clear answers before checkout.</h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {faqs.map((item) => (
            <details className="glass-panel rounded-[1.4rem] p-5" key={item.question}>
              <summary className="cursor-pointer list-none text-lg font-bold text-white">
                {item.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-400">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CertificatesSection() {
  return (
    <section className="section">
      <div className="page-shell">
        <div className="glass-panel overflow-hidden rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">Certificates / SDS</p>
              <h2 className="section-title">Documentation area ready for launch assets.</h2>
              <p className="section-copy">
                A dedicated trust page keeps SDS, compliance files, batch notes,
                and quality references visible instead of buried in the footer.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="premium-chip"><FileCheck2 size={14} /> SDS-ready</span>
                <span className="premium-chip"><ShieldCheck size={14} /> Compliance-ready</span>
                <span className="premium-chip"><CreditCard size={14} /> Payment-safe</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {certificates.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 transition hover:border-cobalt/50"
                    href={item.href}
                    key={item.title}
                  >
                    <Icon className="text-cobalt" size={26} />
                    <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
