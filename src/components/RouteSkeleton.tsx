export default function RouteSkeleton() {
  return (
    <div
      className="animate-pulse space-y-6 py-4"
      aria-hidden
    >
      <div className="h-10 max-w-md rounded-xl bg-zinc-200/90 dark:bg-zinc-800/90" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="aspect-[4/5] rounded-[2rem] bg-zinc-200/80 dark:bg-zinc-800/80" />
        <div className="flex flex-col justify-center gap-4">
          <div className="h-4 w-24 rounded bg-zinc-200/70 dark:bg-zinc-800/70" />
          <div className="h-24 w-full rounded-xl bg-zinc-200/80 dark:bg-zinc-800/80" />
          <div className="h-4 w-full max-w-sm rounded bg-zinc-200/60 dark:bg-zinc-800/60" />
        </div>
      </div>
    </div>
  )
}
