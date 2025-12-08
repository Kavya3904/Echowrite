// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
          EchoWrite
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">Blog site</h1>
        <p className="max-w-2xl text-sm text-slate-500">
          Welcome to Echo Write! Discover articles, insights, and stories
          crafted with care.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/blog"
          className="rounded-lg border border-emerald-500 px-4 py-2 text-sm font-medium hover:bg-emerald-500 hover:text-slate-950"
        >
          View Blog
        </Link>
        <Link
          href="/dashboard"
          className="rounded-lg border border-slate-500 px-4 py-2 text-sm font-medium hover:bg-slate-500 hover:text-white"
        >
          Go to Dashboard
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <FeatureCard
          title="Next.js App Router"
          description="Learn layouts, server components, route handlers, and more."
        />
        <FeatureCard
          title="Full-Stack"
          description="Prisma + PostgreSQL, Auth, protected dashboard & CRUD."
        />
        <FeatureCard
          title="Production Ready"
          description="SEO, performance, clean code, and Vercel deployment."
        />
      </div>
      <div className="text-center p-2">
        <Link href="/blog" className="text-slate-400 hover:text-slate-700 cursor-pointer">
          See more...
        </Link>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-[#664C36] bg-slate-200 p-4 text-sm">
      <h2 className="mb-1 text-sm font-semibold">{title}</h2>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  );
}
