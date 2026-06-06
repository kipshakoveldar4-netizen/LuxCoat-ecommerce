import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-shell section min-h-[60vh]">
      <p className="eyebrow">404</p>
      <h1 className="section-title">This page is off the detailing bay.</h1>
      <p className="section-copy">
        The page you requested does not exist. Head back to the LuxCoat storefront.
      </p>
      <Link className="btn-primary mt-8" href="/">
        Return Home
      </Link>
    </section>
  );
}
