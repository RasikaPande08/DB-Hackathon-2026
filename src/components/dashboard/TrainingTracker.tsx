import { motion } from 'framer-motion'
import { BookOpen, Bell } from 'lucide-react'
import type { Training } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { PriorityBadge } from '../ui/PriorityBadge'
import { CountdownTimer } from '../ui/CountdownTimer'

interface TrainingTrackerProps {
  trainings: Training[]
}

export function TrainingTracker({ trainings }: TrainingTrackerProps) {
  return (
    <section id="training" className="scroll-mt-24">
      <SectionHeader
        icon={BookOpen}
        title="Training Tracker"
        subtitle="Mandatory and compliance learning progress"
      />
      <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {trainings.map((training, index) => (
          <TrainingCard key={training.id} training={training} index={index} />
        ))}
      </div>
    </section>
  )
}

function TrainingCard({ training, index }: { training: Training; index: number }) {
  const isComplete = training.status === 'completed'

  return (
    <GlassCard transition={{ delay: index * 0.08 }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{training.category}</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{training.title}</h3>
        </div>
        <PriorityBadge priority={training.priority} compact />
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Completion</span>
          <span className="font-semibold text-slate-800 dark:text-slate-200">{training.completionPercent}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <motion.div
            className="h-full rounded-full gradient-db"
            initial={{ width: 0 }}
            whileInView={{ width: `${training.completionPercent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-xs text-slate-500">Due Date</p>
          <p className="font-medium text-slate-800 dark:text-slate-200">{training.dueDate}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Status</p>
          <p className="font-medium capitalize text-slate-800 dark:text-slate-200">
            {training.status.replace('_', ' ')}
          </p>
        </div>
      </div>

      {!isComplete && (
        <div className="mt-4">
          <CountdownTimer daysRemaining={training.daysRemaining} />
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-db-blue dark:hover:text-blue-300"
        >
          <Bell className="h-3.5 w-3.5" />
          Remind me
        </button>
        <button
          type="button"
          disabled={isComplete}
          className="rounded-xl bg-db-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-db-blue-light disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          {isComplete ? 'Completed' : 'Complete Now'}
        </button>
      </div>
    </GlassCard>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof BookOpen
  title: string
  subtitle: string
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-db-blue dark:text-blue-400" />
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>
      </div>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
    </div>
  )
}

export { SectionHeader }
