import { motion } from 'framer-motion'
import ReviewCard from '../components/ReviewCard'
import { reviews } from '../data/reviews'

const listSpring = { type: 'spring' as const, stiffness: 100, damping: 20 }

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
}

const listItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: listSpring },
}

export default function ReviewsListPage() {
  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          All reviews
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Newest first. Each post lives under{' '}
          <code className="rounded-md bg-zinc-200/80 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-200">
            {'content/reviews/<slug>/index.md'}
          </code>
          .
        </p>
      </header>

      {reviews.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-zinc-100/50 px-8 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Nothing published yet. Add a folder with{' '}
            <code className="font-mono text-sm text-zinc-800 dark:text-zinc-200">
              {'content/reviews/<slug>/index.md'}
            </code>{' '}
            to populate this list.
          </p>
        </div>
      ) : (
        <motion.ul
          className="flex flex-col gap-16 md:gap-20"
          variants={listContainer}
          initial="hidden"
          animate="show"
        >
          {reviews.map((review, i) => (
            <motion.li key={review.slug} variants={listItem} layout>
              <ReviewCard review={review} index={i} />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  )
}
