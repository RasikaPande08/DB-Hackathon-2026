import clsx from 'clsx'
import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

const paddingMap = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function GlassCard({
  children,
  className,
  hover = true,
  padding = 'md',
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={clsx(
        'glass-panel rounded-2xl shadow-lg shadow-slate-900/5 dark:shadow-black/30',
        paddingMap[padding],
        hover && 'transition-shadow hover:shadow-xl hover:shadow-db-blue/10 dark:hover:shadow-db-blue/5',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
