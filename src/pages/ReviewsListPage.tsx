import { useMemo, useState } from 'react'
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
  const cuisines = useMemo(
    () => Array.from(new Set(reviews.map((review) => review.cuisine))).sort(),
    [],
  )
  const locations = useMemo(
    () => Array.from(new Set(reviews.map((review) => review.location))).sort(),
    [],
  )
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const filteredReviews = useMemo(() => {
    if (selectedCuisines.length === 0 && selectedLocation === null) return reviews
    const selected = new Set(selectedCuisines)
    return reviews.filter((review) => {
      const cuisineMatch =
        selectedCuisines.length === 0 || selected.has(review.cuisine)
      const locationMatch =
        selectedLocation === null || review.location === selectedLocation
      return cuisineMatch && locationMatch
    })
  }, [selectedCuisines, selectedLocation])

  function toggleCuisine(cuisine: string) {
    setSelectedCuisines((current) =>
      current.includes(cuisine)
        ? current.filter((value) => value !== cuisine)
        : [...current, cuisine],
    )
  }

  function clearFilters() {
    setSelectedCuisines([])
    setSelectedLocation(null)
  }

  function toggleLocation(location: string) {
    setSelectedLocation((current) => (current === location ? null : location))
  }

  return (
    <div className="space-y-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
          All reviews
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Newest first.
        </p>
      </header>

      {cuisines.length > 0 ? (
        <section
          className="space-y-4 rounded-3xl border border-zinc-200/90 bg-zinc-100/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
          aria-label="Review filters"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Cuisine
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {cuisines.map((cuisine) => {
              const active = selectedCuisines.includes(cuisine)
              return (
                <button
                  key={cuisine}
                  type="button"
                  onClick={() => toggleCuisine(cuisine)}
                  aria-pressed={active}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium capitalize transition-colors active:scale-[0.98] ${
                    active
                      ? 'border-brand-600 bg-brand-600 text-white dark:border-brand-500 dark:bg-brand-500 dark:text-zinc-950'
                      : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600'
                  }`}
                >
                  {cuisine}
                </button>
              )
            })}
          </div>
          {locations.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Location
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {locations.map((location) => {
                  const active = selectedLocation === location
                  return (
                    <button
                      key={location}
                      type="button"
                      onClick={() => toggleLocation(location)}
                      aria-pressed={active}
                      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors active:scale-[0.98] ${
                        active
                          ? 'border-sky-600 bg-sky-600 text-white dark:border-sky-500 dark:bg-sky-500 dark:text-zinc-950'
                          : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600'
                      }`}
                    >
                      {location}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}
          {selectedCuisines.length > 0 ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 active:scale-[0.98] dark:text-brand-500 dark:hover:text-brand-400"
            >
              Clear filters
            </button>
          ) : selectedLocation !== null ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 active:scale-[0.98] dark:text-brand-500 dark:hover:text-brand-400"
            >
              Clear filters
            </button>
          ) : null}
        </section>
      ) : null}

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
      ) : filteredReviews.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-zinc-300 bg-zinc-100/50 px-8 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            No reviews match the selected filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 active:scale-[0.98] dark:text-brand-500 dark:hover:text-brand-400"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <motion.ul
          className="flex flex-col gap-16 md:gap-20"
          variants={listContainer}
          initial="hidden"
          animate="show"
        >
          {filteredReviews.map((review, i) => (
            <motion.li key={review.slug} variants={listItem} layout>
              <ReviewCard review={review} index={i} />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  )
}
