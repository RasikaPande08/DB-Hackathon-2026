import { motion } from 'framer-motion'
import { BrainCircuit } from 'lucide-react'
import type { DashboardData } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { PriorityBadge } from '../ui/PriorityBadge'
import { SectionHeader } from './TrainingTracker'

interface PriorityEnginePanelProps {
  engine: DashboardData['priorityEngine']
}

const riskColors = {
  critical: 'text-red-600 dark:text-red-400',
  elevated: 'text-orange-600 dark:text-orange-400',
  moderate: 'text-amber-600 dark:text-amber-400',
  low: 'text-emerald-600 dark:text-emerald-400',
}

export function PriorityEnginePanel({ engine }: PriorityEnginePanelProps) {
  const grouped = {
    high: engine.tasks.filter((t) => t.priority === 'high'),
    medium: engine.tasks.filter((t) => t.priority === 'medium'),
    low: engine.tasks.filter((t) => t.priority === 'low'),
  }

  return (
    <section className="scroll-mt-24">
      <SectionHeader
        icon={BrainCircuit}
        title="AI Priority Engine"
        subtitle="Smart ranking by risk, deadline proximity, and regulatory impact"
      />
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <GlassCard className="xl:col-span-1" hover={false}>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Recommended Order</h3>
          <ol className="mt-4 space-y-3">
            {engine.recommendedOrder.map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-3 text-sm"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-db-blue text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-slate-800 dark:text-slate-200">{step}</span>
              </motion.li>
            ))}
          </ol>
        </GlassCard>

        {(['high', 'medium', 'low'] as const).map((level) => (
          <GlassCard key={level} hover={false}>
            <h3 className="text-sm font-semibold capitalize text-slate-900 dark:text-white">{level} Priority</h3>
            <ul className="mt-4 space-y-4">
              {grouped[level].map((task) => (
                <li
                  key={task.id}
                  className="rounded-xl border border-slate-200/80 p-3 dark:border-white/10"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{task.title}</p>
                    <PriorityBadge priority={task.priority} compact />
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-500">
                    <span>Score: {task.priorityScore}/100</span>
                    <span>{task.daysRemaining}d left</span>
                    <span>~{task.estimatedMinutes} min</span>
                    <span className={`capitalize ${riskColors[task.riskLevel]}`}>{task.riskLevel} risk</span>
                  </div>
                </li>
              ))}
              {grouped[level].length === 0 && (
                <p className="text-sm text-slate-500">No items in this band.</p>
              )}
            </ul>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
