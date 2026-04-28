import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import type { Review } from '../data/reviews'

type ReviewCardProps = {
  review: Review
  index: number
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  const reverse = index % 2 === 1

  return (
    <article className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1.05fr_0.95fr] md:gap-10 lg:gap-12">
      <Link
        to={`/reviews/${review.slug}`}
        className={`group relative block aspect-[3/2] overflow-hidden rounded-[2rem] border border-zinc-200/90 bg-zinc-100 shadow-[0_20px_40px_-15px_rgba(24,24,27,0.12)] ring-0 transition-transform duration-300 will-change-transform [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-px active:translate-y-0 active:scale-[0.99] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.35)] ${
          reverse ? 'md:col-start-2 md:row-start-1' : ''
        }`}
        aria-label={`Open review: ${review.title}`}
      >
        <img
          src={review.coverImage}
          width={960}
          height={640}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
        <div
          className="pointer-events-none absolute inset-0 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          aria-hidden
        />
      </Link>

      <div
        className={`flex flex-col justify-center py-1 ${
          reverse ? 'md:col-start-1 md:row-start-1' : ''
        }`}
      >
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          <Link
            to={`/reviews/${review.slug}`}
            className="text-zinc-900 transition-colors hover:text-brand-600 dark:text-zinc-50 dark:hover:text-brand-500"
          >
            {review.title}
          </Link>
        </h2>
        <p className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-sm text-zinc-500 dark:text-zinc-500">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            {review.restaurant}
          </span>
          <time dateTime={review.date}>
            {new Date(review.date + 'T12:00:00').toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </p>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {review.excerpt}
        </p>
        <Link
          to={`/reviews/${review.slug}`}
          className="group/cta mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 active:scale-[0.98] dark:text-brand-500 dark:hover:text-brand-400"
        >
          Read write-up
          <ArrowRight
            className="size-4 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-0.5"
            weight="bold"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  )
}
