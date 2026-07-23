import { motion } from 'framer-motion'
import { CalendarClock, ShieldCheck } from 'lucide-react'
import type { DailySummary } from '../../types'
import { GlassCard } from '../ui/GlassCard'

interface DailyBriefingProps {
  summary: DailySummary
}

export function DailyBriefing({ summary }: DailyBriefingProps) {
  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-db opacity-[0.03] dark:opacity-[0.08]" />
      <div className="relative">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-semibold text-slate-900 dark:text-white"
        >
          {summary.greeting}
        </motion.h2>
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <CalendarClock className="h-4 w-4" />
          Today&apos;s Summary
        </p>

        <ul className="mt-6 space-y-3">
          {summary.briefingBullets.map((bullet, i) => (
            <motion.li
              key={bullet}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-900/[0.03] dark:hover:bg-white/[0.03]"
            >
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-db-blue dark:text-blue-400" />
              <span className="text-sm text-slate-700 dark:text-slate-300">{bullet}</span>
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex flex-wrap gap-3 border-t border-slate-200/80 pt-6 dark:border-white/10"
        >
          <StatPill label="High priority" value={summary.highPriorityCount} tone="danger" />
          <StatPill label="Medium" value={summary.mediumPriorityCount} tone="warn" />
          <StatPill label="Upcoming deadlines" value={summary.upcomingDeadlines} tone="neutral" />
          <StatPill label="Productivity" value={`${summary.productivityScore}%`} tone="success" />
        </motion.div>
      </div>
    </GlassCard>
  )
}

function StatPill({
  label,
  value,
  tone,
}: {
  label: string
  value: number | string
  tone: 'danger' | 'warn' | 'neutral' | 'success'
}) {
  const tones = {
    danger: 'bg-red-500/10 text-red-700 dark:text-red-300',
    warn: 'bg-amber-500/10 text-amber-800 dark:text-amber-300',
    neutral: 'bg-slate-500/10 text-slate-700 dark:text-slate-300',
    success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  }
  return (
    <div className={`rounded-full px-4 py-2 text-sm ${tones[tone]}`}>
      <span className="font-semibold">{value}</span>
      <span className="ml-2 opacity-80">{label}</span>
    </div>
  )
}
