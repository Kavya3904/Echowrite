
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const revalidate = 60; 
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // ⭐ Unwrap the promise (NEW in Next.js 15)
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: { author: true },
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="space-y-4">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-xs text-slate-400">
          {post.author.name} • {post.readingTime} min read
        </p>
      </header>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm leading-relaxed text-slate-100">
        {post.context}
      </div>
    </article>
  );
}
