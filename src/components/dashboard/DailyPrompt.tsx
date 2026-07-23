import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import type { DailySummary } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { ProgressRing } from '../ui/ProgressRing'

interface DailyPromptProps {
  summary: DailySummary
  employeeName: string
}

export function DailyPrompt({ summary, employeeName }: DailyPromptProps) {
  return (
    <GlassCard
      padding="lg"
      className="relative overflow-hidden border-db-blue/20 dark:border-blue-500/20"
      hover={false}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-db-blue/10 blur-3xl dark:bg-blue-500/10" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-db-gold/10 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-db-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-db-blue dark:bg-blue-500/20 dark:text-blue-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Daily Prompt
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl"
          >
            Good Morning {employeeName}!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-slate-600 dark:text-slate-400"
          >
            Before you begin your day:
          </motion.p>

          <ul className="mt-6 space-y-3">
            {summary.dailyPromptLines.map((line, i) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="flex gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-db-gold" />
                {line}
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 rounded-xl border border-slate-200/80 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Suggested action
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
              {summary.suggestedAction}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-6 text-sm font-medium text-db-blue dark:text-blue-300"
          >
            Have a productive day!
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-6 rounded-2xl border border-white/40 bg-white/40 p-6 dark:border-white/10 dark:bg-slate-900/40"
        >
          <ProgressRing value={summary.complianceScore} label="Compliance" sublabel="Smart compliance score" />
          <div className="grid w-full grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-slate-900/5 p-3 dark:bg-white/5">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{summary.pendingActionsCount}</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Pending</p>
            </div>
            <div className="rounded-xl bg-slate-900/5 p-3 dark:bg-white/5">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{summary.minutesSavedToday}m</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Time saved</p>
            </div>
          </div>
        </motion.div>
      </div>
    </GlassCard>
  )
}
