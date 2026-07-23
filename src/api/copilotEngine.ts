import type { CopilotMessage, DashboardData } from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function normalizeQuery(q: string) {
  return q.trim().toLowerCase()
}

export const COPILOT_STARTER_PROMPTS = [
  'Show my pending tasks',
  'Which action should I prioritize today?',
  'How many days are left for my mandatory training?',
  'Show all my pending declarations',
  'Do I have any compliance breaches?',
  "Generate today's smart summary",
  'Set reminders for all my pending tasks',
]

export function buildWelcomeMessage(data: DashboardData): CopilotMessage {
  const training = data.trainings.find((t) => t.status !== 'completed' && t.priority === 'high')
  const hoursNote = training?.expiresWithinHours
    ? ` as it expires within ${training.expiresWithinHours} hours`
    : training
      ? ` before ${training.dueDate}`
      : ''

  const content = `Good Morning ${data.employee.firstName}.

You have ${data.summary.pendingActionsCount} pending actions today.

${data.summary.highPriorityCount} High Priority Action${data.summary.highPriorityCount !== 1 ? 's' : ''}.
${data.summary.mediumPriorityCount} Medium Priority Action${data.summary.mediumPriorityCount !== 1 ? 's' : ''}.

We recommend completing your ${training?.title ?? 'highest-priority task'} first${hoursNote}.

Estimated completion time: ${training?.estimatedCompletionMinutes ?? 15} minutes.`

  return {
    id: 'welcome',
    role: 'assistant',
    content,
    timestamp: new Date(),
    suggestions: COPILOT_STARTER_PROMPTS.slice(0, 4),
  }
}

export async function askCopilot(query: string, data: DashboardData): Promise<CopilotMessage> {
  await delay(900 + Math.random() * 600)
  const q = normalizeQuery(query)

  let content = ''
  let suggestions: string[] | undefined

  if (q.includes('pending task') || q.includes('show my')) {
    const lines = data.priorityEngine.recommendedOrder.map((item, i) => `${i + 1}. ${item}`)
    content = `Here are your pending tasks in recommended order:\n\n${lines.join('\n')}\n\nTotal: ${data.summary.pendingActionsCount} actions.`
    suggestions = ['Which should I do first?', 'Add Outlook reminders', 'Export today\'s report']
  } else if (q.includes('priorit')) {
    const top = data.priorityEngine.tasks[0]
    content = top
      ? `Start with **${top.title}** (priority score ${top.priorityScore}/100, ~${top.estimatedMinutes} min, ${top.riskLevel} risk).`
      : 'No pending priorities — you are fully compliant today.'
    suggestions = ['Complete training now', 'Open trading declaration']
  } else if (q.includes('training') && (q.includes('day') || q.includes('left') || q.includes('mandatory'))) {
    const t = data.trainings.find((x) => x.status !== 'completed')
    content = t
      ? `${t.title}: **${t.daysRemaining} days** remaining (due ${t.dueDate}). ${t.completionPercent}% complete.`
      : 'All mandatory trainings are complete.'
  } else if (q.includes('declaration')) {
    const d = data.tradingDeclaration
    content = `ITRA status: **${d.status}**. ${d.transactionCount} transactions to declare. Deadline in **${d.deadlineDaysRemaining} days**.`
    suggestions = ['Declare now', 'View guidelines', 'Notify compliance']
  } else if (q.includes('compliance') && q.includes('breach')) {
    content = data.complianceHealth.breachesDetected
      ? `Alert: ${data.complianceHealth.breachMessage}`
      : `No compliance breaches detected. Health score: **${data.complianceHealth.score}%**.`
  } else if (q.includes('summary') || q.includes('briefing')) {
    content = `${data.summary.greeting}\n\n${data.summary.briefingBullets.map((b) => `• ${b}`).join('\n')}\n\nSuggested: ${data.summary.suggestedAction}`
    suggestions = ['Download PDF summary', 'Share on Teams']
  } else if (q.includes('reminder') && q.includes('all')) {
    content =
      'I will schedule smart reminders for:\n• Information Security Training\n• ITRA Trading Declaration\n• Open transaction closures\n\nConnect Outlook in Settings to sync automatically.'
    suggestions = ['Add to Outlook Calendar', 'Notify on Teams']
  } else {
    content = `I can help with trainings, ITRA declarations, transactions, and compliance. Your compliance score is **${data.complianceHealth.score}%** and productivity is **${data.summary.productivityScore}%** today.`
    suggestions = COPILOT_STARTER_PROMPTS.slice(0, 3)
  }

  return {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content: content.replace(/\*\*/g, ''),
    timestamp: new Date(),
    suggestions,
  }
}
