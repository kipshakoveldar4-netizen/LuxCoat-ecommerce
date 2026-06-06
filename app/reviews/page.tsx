import type { Metadata } from "next";
import { Star } from "lucide-react";
import { reviews } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Customer reviews for LuxCoat Liquid Glass."
};

export default function ReviewsPage() {
  return (
    <section className="page-shell section">
      <p className="eyebrow">Reviews</p>
      <h1 className="section-title">Premium results across target markets.</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.map((review) => (
          <article className="glass-panel rounded-[1.6rem] p-6" key={review.name}>
            <div className="flex gap-1 text-cobalt">
              {Array.from({ length: review.rating }).map((_, index) => (
                <Star fill="currentColor" key={index} size={17} />
              ))}
            </div>
            <p className="mt-5 text-base leading-7 text-slate-200">“{review.text}”</p>
            <p className="mt-5 text-sm font-bold text-white">{review.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">
              {review.market}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
