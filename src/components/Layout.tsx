import { ForkKnife, Newspaper } from '@phosphor-icons/react'
import { Link, useLocation } from 'react-router-dom'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const onReviews = location.pathname.startsWith('/reviews')

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-zinc-50/75 shadow-[inset_0_-1px_0_rgba(255,255,255,0.55)] backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/75 dark:shadow-[inset_0_-1px_0_rgba(255,255,255,0.06)]">
        <div className="border-b border-white/10 dark:border-white/5">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="font-sans text-lg font-semibold tracking-tight text-zinc-900 transition-colors hover:text-brand-600 dark:text-zinc-100 dark:hover:text-brand-500"
            >
              Table notes
            </Link>
            <nav
              className="flex items-center gap-1"
              aria-label="Main"
            >
              <Link
                to="/reviews"
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  onReviews
                    ? 'bg-zinc-200/80 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                    : 'text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100'
                }`}
              >
                <Newspaper
                  className="size-4 shrink-0"
                  weight="regular"
                  aria-hidden
                />
                Reviews
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
            <ForkKnife className="size-4 text-brand-600/90 dark:text-brand-500/90" weight="regular" aria-hidden />
            Personal food reviews. Opinions are my own.
          </p>
        </div>
      </footer>
    </div>
  )
}
