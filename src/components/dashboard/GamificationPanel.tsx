import { motion } from 'framer-motion'
import { Award, Flame } from 'lucide-react'
import type { GamificationData } from '../../types'
import { GlassCard } from '../ui/GlassCard'

interface GamificationPanelProps {
  data: GamificationData
}

export function GamificationPanel({ data }: GamificationPanelProps) {
  return (
    <GlassCard hover={false}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Compliance Streaks</h3>
          <p className="text-sm text-slate-500">Gamified adherence — enterprise-safe recognition</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-orange-700 dark:text-orange-300">
          <Flame className="h-5 w-5" />
          <span className="font-bold">{data.complianceStreakDays} day streak</span>
          <span className="text-xs opacity-70">(best {data.longestStreak})</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {data.badges.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-xl border p-4 text-center ${
              badge.earned
                ? 'border-db-gold/40 bg-db-gold/10'
                : 'border-slate-200/60 opacity-50 grayscale dark:border-white/10'
            }`}
          >
            <Award className="mx-auto h-6 w-6 text-db-gold" />
            <p className="mt-2 text-xs font-medium text-slate-800 dark:text-slate-200">{badge.label}</p>
          </motion.div>
        ))}
      </div>

      {data.weeklySummaryReady && (
        <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
          Your weekly summary report is ready to share on Teams.
        </p>
      )}
    </GlassCard>
  )
}
