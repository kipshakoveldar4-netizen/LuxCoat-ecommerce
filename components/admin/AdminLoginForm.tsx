"use client";

import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function AdminLoginForm({ nextPath }: { nextPath?: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    if (!response.ok) {
      setError("Invalid password.");
      return;
    }

    router.push(nextPath ?? "/admin");
    router.refresh();
  }

  return (
    <form className="glass-panel w-full max-w-md rounded-[2rem] p-8" onSubmit={login}>
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cobalt/40 bg-cobalt/15 text-cobalt">
        <LockKeyhole size={26} />
      </div>
      <h1 className="mt-6 text-3xl font-black text-white">LuxCoat Admin</h1>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Protected dashboard for orders, inventory, customer data, and product editing.
        Local preview password is admin123 unless ADMIN_PASSWORD is set.
      </p>
      <input
        className="field mt-6"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Admin password"
        required
        type="password"
        value={password}
      />
      <button className="btn-primary mt-5 w-full" type="submit">
        Sign In
      </button>
      {error ? <p className="mt-4 text-sm font-semibold text-red-300">{error}</p> : null}
    </form>
  );
}
