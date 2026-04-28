import { ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import MagneticPrimaryLink from '../components/MagneticPrimaryLink'

const spring = { type: 'spring' as const, stiffness: 100, damping: 20 }

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
}

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-8 md:gap-24">
      <section className="grid min-h-[100dvh] grid-cols-1 items-center gap-10 pt-6 md:grid-cols-2 md:gap-12 md:pt-0 lg:gap-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 flex flex-col justify-center md:order-1"
        >
          <motion.p
            variants={item}
            className="font-mono text-xs uppercase tracking-widest text-brand-600 dark:text-brand-500"
          >
            Field notes from the table
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl lg:text-[3.25rem] lg:leading-[1.05]"
          >
            Restaurants I have tried, honestly
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-[65ch] text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            Short write-ups of meals worth remembering—noodles, seafood, whatever
            was on the table that week. No scores, just notes for future me (and
            anyone else who is hungry for a decent tip).
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticPrimaryLink to="/reviews">
              Browse reviews
              <ArrowRight className="ml-2 inline size-4" weight="bold" aria-hidden />
            </MagneticPrimaryLink>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={spring}
          className="order-1 relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border border-zinc-200/80 bg-zinc-100 shadow-[0_24px_60px_-20px_rgba(24,24,27,0.2)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] md:order-2"
        >
          <img
            src="https://picsum.photos/seed/tablenotes-hero/900/1100"
            width={900}
            height={1100}
            alt=""
            className="h-full w-full object-cover"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/30 via-transparent to-zinc-50/10 dark:from-zinc-950/50 dark:to-transparent"
            aria-hidden
          />
        </motion.div>
      </section>
    </div>
  )
}
