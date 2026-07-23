import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import type { ManagerDashboardData } from '../../types'
import { notifyMicrosoftTeams, downloadPdfSummary } from '../../api/integrations'
import { useActions } from '../../context/ActionContext'
import { GlassCard } from '../ui/GlassCard'
import { ProgressRing } from '../ui/ProgressRing'
import { SectionHeader } from './TrainingTracker'

interface ManagerDashboardProps {
  data: ManagerDashboardData
}

export function ManagerDashboard({ data }: ManagerDashboardProps) {
  const { runAction } = useActions()

  return (
    <section id="manager" className="scroll-mt-24">
      <SectionHeader
        icon={Users}
        title="Manager Dashboard"
        subtitle="Team compliance visibility — role-based access (Manager)"
      />
      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <GlassCard hover={false} className="flex flex-col items-center justify-center">
          <ProgressRing value={data.teamComplianceScore} label="Team" sublabel="Compliance score" />
        </GlassCard>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Pending Trainings" value={data.pendingTrainings} />
          <MetricCard label="Pending Declarations" value={data.pendingDeclarations} />
          <MetricCard label="Upcoming Deadlines" value={data.upcomingDeadlines} />
          <MetricCard label="Compliance Alerts" value={data.complianceAlerts} highlight />
        </div>
      </div>

      <GlassCard className="mt-6 overflow-x-auto" hover={false}>
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200/80 text-xs uppercase tracking-wider text-slate-500 dark:border-white/10">
              <th className="pb-3 pr-4">Employee</th>
              <th className="pb-3 pr-4">Trainings</th>
              <th className="pb-3 pr-4">Declarations</th>
              <th className="pb-3 pr-4">Score</th>
              <th className="pb-3">Alerts</th>
            </tr>
          </thead>
          <tbody>
            {data.members.map((m, i) => (
              <motion.tr
                key={m.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-slate-100 last:border-0 dark:border-white/5"
              >
                <td className="py-3 pr-4 font-medium text-slate-900 dark:text-white">{m.name}</td>
                <td className="py-3 pr-4">{m.pendingTrainings}</td>
                <td className="py-3 pr-4">{m.pendingDeclarations}</td>
                <td className="py-3 pr-4">{m.complianceScore}%</td>
                <td className="py-3">{m.alerts}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { label: 'Notify Employees', fn: () => notifyMicrosoftTeams({ title: 'Team reminder', description: 'Please complete pending actions.' }) },
          { label: 'View Team Report', fn: () => downloadPdfSummary('Team Compliance Report') },
          { label: 'Generate Weekly Summary', fn: () => downloadPdfSummary('Weekly Team Summary') },
          { label: 'Send Reminder Emails', fn: () => Promise.resolve({ success: true, message: 'Reminder emails queued via Outlook.' }) },
          { label: 'Export Reports', fn: () => downloadPdfSummary('Manager Export Pack') },
        ].map((b) => (
          <button
            key={b.label}
            type="button"
            onClick={() => void runAction(b.label, b.fn)}
            className="rounded-xl bg-db-blue/10 px-4 py-2 text-sm font-semibold text-db-blue dark:bg-blue-500/20 dark:text-blue-300"
          >
            {b.label}
          </button>
        ))}
      </div>
    </section>
  )
}

function MetricCard({
  label,
  value,
  highlight,
}: {
  label: string
  value: number
  highlight?: boolean
}) {
  return (
    <GlassCard padding="sm" hover={false}>
      <p className="text-xs text-slate-500">{label}</p>
      <p
        className={`mt-1 text-2xl font-bold ${highlight ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}
      >
        {value}
      </p>
    </GlassCard>
  )
}
