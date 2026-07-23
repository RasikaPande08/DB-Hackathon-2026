import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import type { Transaction } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { PriorityBadge } from '../ui/PriorityBadge'
import { SectionHeader } from './TrainingTracker'

interface TransactionMonitoringProps {
  transactions: Transaction[]
}

export function TransactionMonitoring({ transactions }: TransactionMonitoringProps) {
  return (
    <section id="transactions" className="scroll-mt-24">
      <SectionHeader
        icon={TrendingUp}
        title="Transaction Monitoring"
        subtitle="Positions requiring closure or review"
      />
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {transactions.map((tx, index) => (
          <TransactionCard key={tx.id} transaction={tx} index={index} />
        ))}
      </div>
    </section>
  )
}

function TransactionCard({ transaction, index }: { transaction: Transaction; index: number }) {
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleViewDetails = () => {
    setIsRedirecting(true)
    window.setTimeout(() => {
      window.open('https://www.db.com/', '_blank', 'noopener,noreferrer')
      setIsRedirecting(false)
    }, 350)
  }

  return (
    <GlassCard transition={{ delay: index * 0.07 }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono text-slate-500">{transaction.ticker}</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
            {transaction.securityName}
          </h3>
        </div>
        <PriorityBadge priority={transaction.severity} compact />
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <Row label="Purchase Date" value={transaction.purchaseDate} />
        <Row label="Quantity" value={`${transaction.quantity} units`} />
        <Row label="Value (EUR)" value={transaction.valueEur.toLocaleString('de-DE')} />
        <Row
          label="LOCK-In Days Remaining"
          value={`${transaction.daysRemaining} days`}
          highlight={transaction.daysRemaining <= 5}
        />

      </div>

      <motion.button
        type="button"
        disabled={isRedirecting}
        onClick={handleViewDetails}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white/60 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition-all duration-300 hover:border-db-blue/40 hover:text-db-blue hover:shadow-md disabled:cursor-wait disabled:opacity-70 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:text-blue-300"
      >
        {isRedirecting ? 'Opening…' : 'View Details'}
        <ArrowUpRight className="h-4 w-4" />
      </motion.button>
    </GlassCard>
  )
}

function Row({
  label,
  value,
  highlight,
  capitalize: cap,
}: {
  label: string
  value: string
  highlight?: boolean
  capitalize?: boolean
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2 last:border-0 dark:border-white/5">
      <span className="text-slate-500">{label}</span>
      <span
        className={`font-medium ${highlight ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-slate-200'} ${cap ? 'capitalize' : ''}`}
      >
        {value}
      </span>
    </div>
  )
}
