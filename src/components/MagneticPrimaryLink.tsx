import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

const spring = { stiffness: 150, damping: 18 }

type MagneticPrimaryLinkProps = {
  to: string
  children: React.ReactNode
  className?: string
}

export default function MagneticPrimaryLink({
  to,
  children,
  className = '',
}: MagneticPrimaryLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, spring)
  const springY = useSpring(y, spring)

  function handleMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.12)
    y.set((e.clientY - cy) * 0.12)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Link
        ref={ref}
        to={to}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`inline-flex items-center justify-center rounded-2xl bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-[0_12px_32px_-12px_rgba(15,80,60,0.45)] transition-transform active:scale-[0.98] dark:bg-brand-700 dark:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.4)] ${className}`}
      >
        {children}
      </Link>
    </motion.span>
  )
}
