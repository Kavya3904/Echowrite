import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
console.log("Dashboard session:", session);
  if (!session || !session.user) {
    // Not logged in → send to login
    redirect("/login");
  }

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-slate-300">
        Welcome, {session.user.name}! This will be your admin area where you
        can create, edit and delete posts.
      </p>
    </section>
  );
}
