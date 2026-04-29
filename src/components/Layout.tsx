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
      <header className="sticky top-0 z-20 border-b border-sky-200/85 bg-sky-50/90 shadow-[inset_0_-1px_0_rgba(255,255,255,0.65)] backdrop-blur-md dark:border-sky-900/50 dark:bg-sky-950/80 dark:shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)]">
        <div className="border-b border-sky-100/70 dark:border-sky-900/40">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="font-sans text-lg font-semibold tracking-tight text-sky-950 transition-colors hover:text-brand-600 dark:text-sky-100 dark:hover:text-brand-400"
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
                    ? 'bg-sky-200/90 text-sky-950 dark:bg-sky-900/85 dark:text-sky-100'
                    : 'text-sky-950/85 hover:bg-sky-200/65 hover:text-sky-950 dark:text-sky-200/85 dark:hover:bg-sky-900/65 dark:hover:text-sky-50'
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
