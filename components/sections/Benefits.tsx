import { benefits, trustBadges } from "@/lib/content";

export function Benefits() {
  return (
    <section className="section">
      <div className="page-shell">
        <p className="eyebrow">Paint Protection</p>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h2 className="section-title">Liquid glass shine without the workshop wait.</h2>
            <p className="section-copy">
              LuxCoat is built for drivers who want a fast premium finish at home,
              backed by clear shipping and checkout flows for global markets.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-2xl">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4 shadow-chrome" key={badge.label}>
                  <Icon className="text-cobalt" size={20} />
                  <p className="mt-3 text-xs font-bold uppercase leading-5 tracking-[0.12em] text-slate-300">
                    {badge.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article className="glass-panel overflow-hidden rounded-[1.6rem] p-6" key={benefit.title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cobalt/40 bg-cobalt/15 text-cobalt">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{benefit.text}</p>
                <div className="lux-divider mt-6" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
