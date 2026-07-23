import { motion } from 'framer-motion'
import { FileSignature } from 'lucide-react'
import type { TradingDeclaration } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { PriorityBadge } from '../ui/PriorityBadge'
import { SectionHeader } from './TrainingTracker'

interface TradingDeclarationModuleProps {
  declaration: TradingDeclaration
}

export function TradingDeclarationModule({ declaration }: TradingDeclarationModuleProps) {
  return (
    <section id="trading" className="scroll-mt-24">
      <SectionHeader
        icon={FileSignature}
        title="Trading Declaration"
        subtitle="ITRA — personal account dealing compliance"
      />
      <GlassCard className="mt-6 max-w-2xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Trading Declaration Pending
            </h3>
            <p className="mt-1 text-sm text-slate-500">Synced from ITRA • Ref {declaration.id}</p>
          </div>
          <PriorityBadge priority={declaration.priority} />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Metric label="Status" value="Action Required" highlight />
          <Metric label="Transactions" value={String(declaration.transactionCount)} />
          <Metric
            label="Deadline"
            value={`${declaration.deadlineDaysRemaining} Days Remaining`}
            urgent={declaration.deadlineDaysRemaining <= 3}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-900 dark:text-amber-100"
        >
          Declaration pending since {declaration.pendingSinceDays} days. Submit before the deadline to
          remain compliant.
        </motion.div>

        <button
          type="button"
          className="mt-6 w-full rounded-xl bg-db-blue py-3 text-sm font-semibold text-white transition hover:bg-db-blue-light sm:w-auto sm:px-8 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Declare Now
        </button>
      </GlassCard>
    </section>
  )
}

function Metric({
  label,
  value,
  highlight,
  urgent,
}: {
  label: string
  value: string
  highlight?: boolean
  urgent?: boolean
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p
        className={`mt-1 text-lg font-semibold ${
          urgent
            ? 'text-red-600 dark:text-red-400'
            : highlight
              ? 'text-db-blue dark:text-blue-300'
              : 'text-slate-900 dark:text-white'
        }`}
      >
        {value}
      </p>
    </div>
  )
}
