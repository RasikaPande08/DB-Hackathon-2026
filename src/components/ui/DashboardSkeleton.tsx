export function DashboardSkeleton() {
  return (
    <div className="flex min-h-dvh animate-pulse">
      <aside className="hidden w-64 border-r border-slate-200/80 bg-white/80 p-5 lg:block dark:border-white/10 dark:bg-slate-900/80">
        <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="mt-4 h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-8 space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-9 rounded-xl bg-slate-100 dark:bg-slate-800" />
          ))}
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <div className="h-16 border-b border-slate-200/80 bg-white/70 dark:border-white/10 dark:bg-slate-900/70" />
        <main className="space-y-8 p-8">
          <div className="h-64 rounded-2xl bg-slate-200/80 dark:bg-slate-800" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="h-48 rounded-2xl bg-slate-200/80 lg:col-span-2 dark:bg-slate-800" />
            <div className="h-48 rounded-2xl bg-slate-200/80 dark:bg-slate-800" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-slate-200/80 dark:bg-slate-800" />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
