import { ArrowLeft, CalendarDots, Storefront } from '@phosphor-icons/react'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import { getReviewBySlug } from '../data/reviews'

/** Drop the first inline image so the hero is not repeated in the article. */
function stripFirstLeadingImage(md: string): string {
  return md.replace(/^\s*!\[[^\]]*\]\([^)]+\)\s*\n?/m, '')
}

export default function ReviewDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const review = slug ? getReviewBySlug(slug) : undefined

  if (!review) {
    return (
      <div className="mx-auto max-w-lg py-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Review not found
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          There is no write-up for that link.
        </p>
        <Link
          to="/reviews"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 active:scale-[0.98] dark:text-brand-500"
        >
          <ArrowLeft className="size-4" weight="bold" aria-hidden />
          Back to all reviews
        </Link>
      </div>
    )
  }

  const articleMarkdown = stripFirstLeadingImage(review.bodyMarkdown)

  return (
    <article className="pb-8">
      <p className="mb-8">
        <Link
          to="/reviews"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 active:scale-[0.98] dark:text-brand-500"
        >
          <ArrowLeft className="size-4" weight="bold" aria-hidden />
          All reviews
        </Link>
      </p>

      <div className="overflow-hidden rounded-[2.5rem] border border-zinc-200/90 bg-zinc-100 shadow-[0_20px_50px_-20px_rgba(24,24,27,0.15)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)]">
        <div className="relative aspect-[21/9] max-h-[min(40vh,420px)] w-full md:aspect-[2.2/1]">
          <img
            src={review.coverImage}
            width={1200}
            height={720}
            alt=""
            className="h-full w-full object-cover"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            aria-hidden
          />
        </div>
      </div>

      <header className="mx-auto mt-12 max-w-[65ch]">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          {review.title}
        </h1>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <p className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <Storefront
              className="size-5 text-brand-600/90 dark:text-brand-500/90"
              weight="regular"
              aria-hidden
            />
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {review.restaurant}
            </span>
          </p>
          <p className="flex items-center gap-2 font-mono text-sm text-zinc-500">
            <CalendarDots className="size-5" weight="regular" aria-hidden />
            <time dateTime={review.date}>
              {new Date(review.date + 'T12:00:00').toLocaleDateString(
                undefined,
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                },
              )}
            </time>
          </p>
        </div>
      </header>

      <div
        className="mx-auto mt-10 max-w-[65ch] text-zinc-600 dark:text-zinc-400 [&>h2]:mb-3 [&>h2]:mt-10 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-zinc-900 [&>h2]:first:mt-0 dark:[&>h2]:text-zinc-100 [&>ol]:list-decimal [&>ol]:pl-6 [&>p:first-of-type]:text-lg [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:text-zinc-700 dark:[&>p:first-of-type]:text-zinc-300 [&>p]:mt-6 [&>p]:text-base [&>p]:leading-relaxed [&>p]:first:mt-0 [&>ul]:list-disc [&>ul]:pl-6"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          urlTransform={(u) => u}
          components={{
            a: (props) => (
              <a
                {...props}
                className="font-medium text-brand-600 underline decoration-brand-600/30 underline-offset-2 transition-colors hover:text-brand-700 dark:text-brand-500 dark:decoration-brand-500/30 dark:hover:text-brand-400"
                target={props.href?.startsWith('http') ? '_blank' : undefined}
                rel={
                  props.href?.startsWith('http') ? 'noreferrer noopener' : undefined
                }
              />
            ),
            img: ({ node, ...props }) => {
              void node
              return (
                <img
                  {...props}
                  className="my-8 w-full max-w-full rounded-2xl border border-zinc-200/80 object-cover shadow-sm dark:border-zinc-700/80"
                  loading="lazy"
                  decoding="async"
                  alt={props.alt ?? ''}
                />
              )
            },
            p: ({ node, ...props }) => {
              void node
              return <p {...props} />
            },
            li: (props) => <li className="mt-1.5" {...props} />,
            pre: ({ children, ...props }) => (
              <pre
                className="my-6 overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-950 p-4 text-sm text-zinc-100 dark:border-zinc-700"
                {...props}
              >
                {children}
              </pre>
            ),
            strong: (props) => (
              <strong
                className="font-semibold text-zinc-800 dark:text-zinc-200"
                {...props}
              />
            ),
            code: ({ className, children, ...props }) =>
              className ? (
                <code className={className} {...props}>
                  {children}
                </code>
              ) : (
                <code
                  className="rounded bg-zinc-200/80 px-1.5 py-0.5 font-mono text-[0.9em] text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200"
                  {...props}
                >
                  {children}
                </code>
              ),
            table: (props) => (
              <div className="my-6 overflow-x-auto">
                <table
                  className="w-full min-w-[20rem] border-collapse text-left text-sm"
                  {...props}
                />
              </div>
            ),
            th: (props) => (
              <th
                className="border border-zinc-200 bg-zinc-100 px-3 py-2 font-semibold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-100"
                {...props}
              />
            ),
            td: (props) => (
              <td
                className="border border-zinc-200 px-3 py-2 dark:border-zinc-700"
                {...props}
              />
            ),
          }}
        >
          {articleMarkdown}
        </ReactMarkdown>
      </div>
    </article>
  )
}
