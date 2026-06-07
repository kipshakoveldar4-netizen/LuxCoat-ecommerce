import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  FileCheck2,
  ShieldCheck,
  Star,
  Truck
} from "lucide-react";
import { ProductPurchasePanel } from "@/components/commerce/ProductPurchasePanel";
import {
  applicationSteps,
  faqs,
  guaranteeTiles,
  productHighlights,
  reviews
} from "@/lib/content";
import { getProductBySlug } from "@/lib/store";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [product.imageUrl]
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return (
    <section className="page-shell section">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="glass-panel relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] p-3 sm:p-5">
            <Image
              alt={product.title}
              className="h-full w-full object-contain"
              height={1254}
              priority
              quality={96}
              sizes="(max-width: 768px) 100vw, 50vw"
              src={product.imageUrl}
              width={1254}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              <span className="premium-chip">Bestseller</span>
              <span className="premium-chip">237 ml</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
            {product.gallery.map((image, index) => (
              <div
                className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-1.5"
                key={`${image}-${index}`}
              >
                <Image
                  alt={`${product.title} gallery ${index + 1}`}
                  className="h-full w-full object-contain"
                  height={1254}
                  quality={95}
                  sizes="(max-width: 768px) 33vw, 180px"
                  src={image}
                  width={1254}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">Automotive liquid glass coating</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
            {product.title}, {product.sizeMl} ml
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">{product.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex gap-1 text-cobalt">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star fill="currentColor" key={index} size={17} />
              ))}
            </div>
            <p className="text-sm font-semibold text-white">4.9 average rating</p>
            <span className="hidden h-1 w-1 rounded-full bg-slate-500 sm:block" />
            <p className="text-sm font-semibold text-slate-300">USA, UK & Europe ready</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {productHighlights.map((item) => (
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4" key={item.label}>
                <p className="text-lg font-black text-white">{item.value}</p>
                <p className="mt-1 text-[11px] font-bold uppercase leading-5 tracking-[0.12em] text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <ProductPurchasePanel product={product} />
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {[
          {
            icon: ShieldCheck,
            title: "Gloss & UV Protection",
            text: "Adds a slick reflective layer that helps protect against UV damage."
          },
          {
            icon: Clock3,
            title: "Fast Hand Application",
            text: "Apply by microfiber applicator and buff clear in around 15 minutes."
          },
          {
            icon: Truck,
            title: "Global Shipping",
            text: "Ships from China to the USA, UK, and Europe with tracking."
          }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article className="glass-panel rounded-[1.5rem] p-6" key={item.title}>
              <Icon className="text-cobalt" size={26} />
              <h2 className="mt-4 text-xl font-bold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <section>
          <p className="eyebrow">Application</p>
          <h2 className="section-title">3 simple steps.</h2>
          <div className="mt-8 grid gap-4">
            {applicationSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div className="glass-panel rounded-[1.4rem] p-5" key={step.title}>
                  <div className="flex gap-4">
                    <Icon className="shrink-0 text-cobalt" size={24} />
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
        </section>
        <section>
          <p className="eyebrow">Benefits</p>
          <h2 className="section-title">Built for visible results.</h2>
          <div className="mt-8 grid gap-3">
            {product.benefits.map((benefit) => (
              <div className="flex items-center gap-3 text-sm text-slate-300" key={benefit}>
                <CheckCircle2 className="shrink-0 text-cobalt" size={18} />
                {benefit}
              </div>
            ))}
          </div>
          <Link className="btn-secondary mt-8" href="/certificates-sds">
            <FileCheck2 size={18} />
            View Certificates / SDS
          </Link>
        </section>
      </div>

      <section className="mt-16">
        <p className="eyebrow">Buyer Confidence</p>
        <h2 className="section-title">Trust signals before payment goes live.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {guaranteeTiles.map((item) => {
            const Icon = item.icon;
            return (
              <article className="glass-panel rounded-[1.5rem] p-6" key={item.title}>
                <Icon className="text-cobalt" size={24} />
                <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-16">
        <p className="eyebrow">Reviews</p>
        <h2 className="section-title">What detail-focused drivers say.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.slice(0, 6).map((review) => (
            <article className="glass-panel rounded-[1.5rem] p-6" key={review.name}>
              <div className="flex gap-1 text-cobalt">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star fill="currentColor" key={index} size={16} />
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-300">"{review.text}"</p>
              <p className="mt-5 text-sm font-bold text-white">{review.name}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
                {review.market}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="eyebrow">FAQ</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {faqs.map((item) => (
            <details className="glass-panel rounded-[1.4rem] p-5" key={item.question}>
              <summary className="cursor-pointer list-none text-base font-bold text-white">
                {item.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-400">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </section>
  );
}
