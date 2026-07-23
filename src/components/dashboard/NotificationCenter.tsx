import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import type { NotificationItem, Priority } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { SectionHeader } from './TrainingTracker'

interface NotificationCenterProps {
  notifications: NotificationItem[]
}

export function NotificationCenter({ notifications }: NotificationCenterProps) {
  const groups: Record<Priority, NotificationItem[]> = {
    high: [],
    medium: [],
    low: [],
  }
  for (const n of notifications) {
    groups[n.priority].push(n)
  }

  const order: Priority[] = ['high', 'medium', 'low']
  const titles: Record<Priority, string> = {
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority',
  }

  return (
    <section id="notifications" className="scroll-mt-24">
      <SectionHeader
        icon={Bell}
        title="Notification Center"
        subtitle="Proactive alerts from ITRA, Compliance, and Training systems"
      />
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {order.map((priority, colIndex) => (
          <GlassCard key={priority} transition={{ delay: colIndex * 0.1 }} hover={false}>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{titles[priority]}</h3>
            <div className="mt-4 space-y-3">
              {groups[priority].length === 0 ? (
                <p className="text-sm text-slate-500">No notifications</p>
              ) : (
                groups[priority].map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`rounded-xl border p-3 text-sm ${
                      item.read
                        ? 'border-slate-200/60 bg-slate-50/50 dark:border-white/5 dark:bg-white/[0.02]'
                        : 'border-db-blue/20 bg-db-blue/5 dark:border-blue-500/20 dark:bg-blue-500/10'
                    }`}
                  >
                    <p className="font-medium text-slate-900 dark:text-white">{item.title}</p>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">{item.message}</p>
                    <p className="mt-2 text-xs text-slate-400">{item.timestamp}</p>
                  </motion.div>
                ))
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
