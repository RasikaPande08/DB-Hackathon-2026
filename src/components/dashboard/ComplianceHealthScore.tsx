import { motion } from 'framer-motion'
import { Shield, Star } from 'lucide-react'
import type { ComplianceHealth } from '../../types'
import { downloadPdfSummary } from '../../api/integrations'
import { useActions } from '../../context/ActionContext'
import { GlassCard } from '../ui/GlassCard'
import { ProgressRing } from '../ui/ProgressRing'
import { SectionHeader } from './TrainingTracker'

interface ComplianceHealthScoreProps {
  health: ComplianceHealth
}

export function ComplianceHealthScore({ health }: ComplianceHealthScoreProps) {
  const { runAction } = useActions()

  return (
    <section id="compliance-health" className="scroll-mt-24">
      <SectionHeader
        icon={Shield}
        title="Compliance Health Score"
        subtitle="Real-time posture across training, ETRA, and regulatory obligations"
      />
      <GlassCard className="mt-6 overflow-hidden" hover={false}>
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex flex-col items-center">
            <ProgressRing value={health.score} size={140} label="Score" />
            <div className="mt-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < health.starRating
                      ? 'fill-db-gold text-db-gold'
                      : 'text-slate-300 dark:text-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <HealthRow label="Training Status" value={health.trainingStatus} />
            <HealthRow label="Trading Declaration" value={health.tradingDeclarationStatus} />
            <HealthRow label="Compliance Status" value={health.complianceStatus} />
            <HealthRow label="Upcoming Deadlines" value={String(health.upcomingDeadlinesCount)} />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="sm:col-span-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200"
            >
              {health.breachesDetected ? health.breachMessage : 'No Compliance Breaches Detected.'}
            </motion.p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-200/80 pt-6 dark:border-white/10">
          {[
            { label: 'View Detailed Report', fn: () => downloadPdfSummary('Compliance Health Report') },
            { label: 'Export Report', fn: () => downloadPdfSummary('Compliance Export') },
            { label: 'Track Progress', fn: () => Promise.resolve({ success: true, message: 'Progress tracker opened.' }) },
            { label: 'Download Summary', fn: () => downloadPdfSummary('Compliance Summary') },
          ].map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={() => void runAction(btn.label, btn.fn)}
              className="rounded-xl border border-slate-200/80 px-4 py-2 text-sm font-medium transition hover:border-db-blue/40 hover:text-db-blue dark:border-white/10 dark:hover:text-blue-300"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </GlassCard>
    </section>
  )
}

function HealthRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-900/[0.03] p-4 dark:bg-white/[0.03]">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  )
}
