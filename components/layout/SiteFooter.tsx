import Link from "next/link";
import { navItems } from "@/lib/content";

const policyLinks = [
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/certificates-sds", label: "Certificates / SDS" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/50">
      <div className="page-shell grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link className="flex items-center gap-3" href="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cobalt/60 bg-cobalt/15 text-sm font-black text-white">
              LC
            </span>
            <span className="text-xl font-black text-white">LuxCoat</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            Premium automotive liquid glass coating for deep gloss, fast hand
            application, and durable protection. Shipping from China to the USA,
            UK, and Europe.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Storefront
          </h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">
            {navItems.map((item) => (
              <Link className="transition hover:text-white" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            Policies
          </h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">
            {policyLinks.map((item) => (
              <Link className="transition hover:text-white" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} LuxCoat. Built for review, payment integration, and production hosting.
      </div>
    </footer>
  );
}
