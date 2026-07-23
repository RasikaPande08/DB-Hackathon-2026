import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  daysRemaining: number
  label?: string
}

export function CountdownTimer({ daysRemaining, label = 'Days Remaining' }: CountdownTimerProps) {
  const [display, setDisplay] = useState(daysRemaining)

  useEffect(() => {
    setDisplay(daysRemaining)
  }, [daysRemaining])

  const urgent = display <= 3

  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <motion.div
        key={display}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-baseline gap-1.5"
      >
        <span
          className={`text-3xl font-bold tabular-nums ${
            urgent ? 'text-red-600 dark:text-red-400' : 'text-db-blue dark:text-blue-300'
          }`}
        >
          {display}
        </span>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {display === 1 ? 'Day' : 'Days'}
        </span>
      </motion.div>
    </div>
  )
}
