// src/app/blog/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { get } from "http";
export const revalidate = 60;
const getPosts = cache(async () => {
  return await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
});
export default async function BlogListPage() {
      const posts = await getPosts();
  console.log("Posts from DB:", posts);
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Blogs</h1>
        {posts.length === 0 ? (
          <p className="text-sm text-slate-500 mt-2">
            No posts found. Please check back later.
          </p>
        ) :         <p className="text-sm text-slate-500">
          Here are some cool blogs
        </p>}

      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-slate-800 bg-slate-200 p-4"
          >
            <h2 className="text-lg font-semibold">
              <Link href={`/blog/${post.slug}`}  className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-xs text-slate-500">{post.excerpt}</p>
            <div className="mt-2 text-[11px] text-slate-400">
              {post.readingTime} min read • Static data for now
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
