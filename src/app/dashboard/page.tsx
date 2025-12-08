export default function DashboardPage() {
  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-sm text-slate-300">
        This will be your admin area where you can create, edit, and delete
        posts. We’ll protect this route with authentication later.
      </p>
    </section>
  );
}