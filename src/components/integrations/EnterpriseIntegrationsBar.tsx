import { motion } from 'framer-motion'
import { Calendar, Download, FileText, MessageSquare, Share2 } from 'lucide-react'
import {
  addToOutlookCalendar,
  exportTodaysReport,
  notifyMicrosoftTeams,
  shareWeeklySummaryOnTeams,
  downloadPdfSummary,
} from '../../api/integrations'
import { useActions } from '../../context/ActionContext'

interface EnterpriseIntegrationsBarProps {
  contextTitle: string
  reminderDescription?: string
  compact?: boolean
}

export function EnterpriseIntegrationsBar({
  contextTitle,
  reminderDescription,
  compact,
}: EnterpriseIntegrationsBarProps) {
  const { runAction } = useActions()

  const buttons = [
    {
      id: 'outlook',
      label: compact ? 'Outlook' : 'Add to Outlook Calendar',
      icon: Calendar,
      action: () =>
        addToOutlookCalendar({
          title: contextTitle,
          description: reminderDescription ?? `${contextTitle} — scheduled via DB Smart Assistant`,
          dueAt: 'Tomorrow, 5:00 PM',
        }),
    },
    {
      id: 'teams',
      label: compact ? 'Teams' : 'Notify on Microsoft Teams',
      icon: MessageSquare,
      action: () =>
        notifyMicrosoftTeams({
          title: contextTitle,
          description: reminderDescription ?? `Reminder: ${contextTitle}`,
        }),
    },
    {
      id: 'export',
      label: compact ? 'Export' : "Export Today's Report",
      icon: FileText,
      action: () => exportTodaysReport(),
    },
    {
      id: 'pdf',
      label: compact ? 'PDF' : 'Download PDF Summary',
      icon: Download,
      action: () => downloadPdfSummary(contextTitle),
    },
    {
      id: 'share',
      label: compact ? 'Share' : 'Share Weekly Summary',
      icon: Share2,
      action: () => shareWeeklySummaryOnTeams(`Weekly summary for ${contextTitle}`),
    },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((btn, i) => {
        const Icon = btn.icon
        return (
          <motion.button
            key={btn.id}
            type="button"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -1 }}
            onClick={() => void runAction(btn.label, btn.action)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200/60 bg-white/50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-db-blue/40 hover:text-db-blue dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-blue-300"
          >
            <Icon className="h-3.5 w-3.5" />
            {btn.label}
          </motion.button>
        )
      })}
    </div>
  )
}
