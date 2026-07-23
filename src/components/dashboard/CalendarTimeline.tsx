import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import type { TimelineEvent } from '../../types'
import { scheduleOutlookReminder } from '../../api/integrations'
import { useActions } from '../../context/ActionContext'
import { GlassCard } from '../ui/GlassCard'
import { PriorityBadge } from '../ui/PriorityBadge'
import { SectionHeader } from './TrainingTracker'
import { EnterpriseIntegrationsBar } from '../integrations/EnterpriseIntegrationsBar'

interface CalendarTimelineProps {
  events: TimelineEvent[]
}

export function CalendarTimeline({ events }: CalendarTimelineProps) {
  const { runAction } = useActions()

  return (
    <section id="timeline" className="scroll-mt-24">
      <SectionHeader
        icon={CalendarDays}
        title="Smart Calendar Timeline"
        subtitle="Deadlines synced across ITRA, LMS, and personal dealing"
      />
      <GlassCard className="mt-6" hover={false}>
        <div className="relative ml-3 border-l-2 border-db-blue/30 pl-8 dark:border-blue-500/30">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative pb-10 last:pb-0"
            >
              <span className="absolute -left-[41px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-db-blue bg-white dark:bg-slate-900">
                <span className="h-2 w-2 rounded-full bg-db-blue dark:bg-blue-400" />
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-db-blue dark:text-blue-300">
                {event.dateLabel}
              </p>
              <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{event.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{event.description}</p>
              <div className="mt-2">
                <PriorityBadge priority={event.priority} compact />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-200/80 pt-6 dark:border-white/10">
          {['View Calendar', 'Export Schedule', 'Add Reminders', 'Sync Deadlines'].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() =>
                void runAction(label, () =>
                  scheduleOutlookReminder({
                    title: 'DB Smart Assistant',
                    description: `${label} initiated for all timeline events.`,
                  }),
                )
              }
              className="rounded-xl bg-slate-900/5 px-4 py-2 text-sm font-medium hover:bg-db-blue/10 hover:text-db-blue dark:bg-white/5 dark:hover:text-blue-300"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <EnterpriseIntegrationsBar
            contextTitle="Smart Calendar Timeline"
            reminderDescription="Information Security Training expires tomorrow at 5 PM."
          />
        </div>
      </GlassCard>
    </section>
  )
}
