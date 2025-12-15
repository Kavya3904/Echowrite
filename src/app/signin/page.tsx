"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to register");
      return;
    }

    // After sign up → go to login
    router.push("/login");
  }

  return (
    <section className="max-w-sm space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <p className="text-sm text-slate-300">
          Create an account to start writing and managing blog posts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1 text-sm">
          <label className="block text-slate-200" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="w-full rounded-md border border-slate-700 bg-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1 text-sm">
          <label className="block text-slate-200" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="w-full rounded-md border border-slate-700 bg-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div className="space-y-1 text-sm">
          <label className="block text-slate-200" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="w-full rounded-md border border-slate-700 bg-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        {error && (
          <p className="text-xs text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </section>
  );
}
