import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login"
};

type AdminLoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const { next } = await searchParams;

  return (
    <section className="page-shell section flex min-h-[70vh] items-center justify-center">
      <AdminLoginForm nextPath={next} />
    </section>
  );
}
