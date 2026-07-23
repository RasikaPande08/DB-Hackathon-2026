import { motion } from 'framer-motion'
import { Bot, CheckCircle2, Clock, Info } from 'lucide-react'
import type { AIInsight } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { SectionHeader } from './TrainingTracker'

interface AIInsightsProps {
  insights: AIInsight[]
}

const iconMap = {
  action: Bot,
  info: Info,
  success: CheckCircle2,
  time_saved: Clock,
}

const styleMap = {
  action: 'border-l-db-blue bg-db-blue/5 dark:bg-blue-500/10',
  info: 'border-l-slate-400 bg-slate-500/5',
  success: 'border-l-emerald-500 bg-emerald-500/5',
  time_saved: 'border-l-db-gold bg-db-gold/10',
}

export function AIInsights({ insights }: AIInsightsProps) {
  const sorted = [...insights].sort((a, b) => a.priority - b.priority)

  return (
    <section id="insights" className="scroll-mt-24">
      <SectionHeader
        icon={Bot}
        title="AI Smart Insights"
        subtitle="Things requiring your attention — intelligently prioritized"
      />
      <GlassCard className="mt-6" hover={false}>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Things requiring your attention
        </h3>
        <ul className="mt-4 space-y-3">
          {sorted.map((insight, i) => {
            const Icon = iconMap[insight.type]
            return (
              <motion.li
                key={insight.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`flex items-start gap-3 rounded-r-xl border-l-4 py-3 pl-4 pr-3 ${styleMap[insight.type]}`}
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 dark:text-slate-300" />
                <span className="text-sm text-slate-800 dark:text-slate-200">{insight.message}</span>
              </motion.li>
            )
          })}
        </ul>
      </GlassCard>
    </section>
  )
}
