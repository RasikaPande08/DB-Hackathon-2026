import clsx from 'clsx'
import type { Priority } from '../../types'

const priorityStyles: Record<Priority, string> = {
  high: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30',
  medium: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
  low: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
}

const priorityLabels: Record<Priority, string> = {
  high: 'High Priority',
  medium: 'Medium Priority',
  low: 'Low Priority',
}

interface PriorityBadgeProps {
  priority: Priority
  className?: string
  compact?: boolean
}

export function PriorityBadge({ priority, className, compact }: PriorityBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide',
        priorityStyles[priority],
        className,
      )}
    >
      {compact ? priority.charAt(0).toUpperCase() + priority.slice(1) : priorityLabels[priority]}
    </span>
  )
}
