import { motion } from 'framer-motion'
import { AlarmClock } from 'lucide-react'
import type { DashboardData } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { PriorityBadge } from '../ui/PriorityBadge'

interface UpcomingDeadlinesProps {
  deadlines: DashboardData['upcomingDeadlines']
}

export function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  return (
    <GlassCard hover={false}>
      <div className="flex items-center gap-2">
        <AlarmClock className="h-5 w-5 text-db-blue dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Upcoming Deadlines</h3>
      </div>
      <ul className="mt-5 space-y-3">
        {deadlines.map((item, i) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/80 px-4 py-3 dark:border-white/10"
          >
            <div>
              <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
              <p className="text-xs text-slate-500">{item.dueDate}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-bold tabular-nums ${
                  item.daysLeft <= 3 ? 'text-red-600 dark:text-red-400' : 'text-db-blue dark:text-blue-300'
                }`}
              >
                {item.daysLeft}d
              </span>
              <PriorityBadge priority={item.priority} compact />
            </div>
          </motion.li>
        ))}
      </ul>
    </GlassCard>
  )
}
