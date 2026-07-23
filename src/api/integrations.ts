import type { ActionResult, IntegrationPayload } from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** Mock Outlook Calendar — replace with Microsoft Graph API */
export async function addToOutlookCalendar(payload: IntegrationPayload): Promise<ActionResult> {
  await delay(800)
  const eventTitle = payload.dueAt
    ? `${payload.title} — due ${payload.dueAt}`
    : payload.title
  console.info('[Outlook Graph Mock]', { subject: eventTitle, body: payload.description })
  return {
    success: true,
    message: `Calendar event created: "${eventTitle}"`,
    integration: 'outlook',
  }
}

export async function scheduleOutlookReminder(payload: IntegrationPayload): Promise<ActionResult> {
  await delay(600)
  return {
    success: true,
    message: payload.description || `Reminder scheduled for ${payload.title}`,
    integration: 'outlook',
  }
}

/** Mock Microsoft Teams — replace with Teams webhook / Graph */
export async function notifyMicrosoftTeams(payload: IntegrationPayload): Promise<ActionResult> {
  await delay(700)
  console.info('[Teams Mock]', payload)
  return {
    success: true,
    message: `Teams notification sent: ${payload.title}`,
    integration: 'teams',
  }
}

export async function shareWeeklySummaryOnTeams(summaryText: string): Promise<ActionResult> {
  await delay(900)
  console.info('[Teams Weekly Summary]', summaryText.slice(0, 120))
  return {
    success: true,
    message: 'Weekly summary shared to your Teams channel.',
    integration: 'teams',
  }
}

/** Mock PDF export — replace with report service */
export async function downloadPdfSummary(reportName: string): Promise<ActionResult> {
  await delay(1000)
  const blob = new Blob(
    [`DB Smart Assistant — ${reportName}\nGenerated: ${new Date().toISOString()}\n\nConfidential — Internal Use Only`],
    { type: 'application/pdf' },
  )
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${reportName.replace(/\s+/g, '-').toLowerCase()}.pdf`
  a.click()
  URL.revokeObjectURL(url)
  return {
    success: true,
    message: `${reportName} downloaded.`,
    integration: 'pdf',
  }
}

export async function exportTodaysReport(): Promise<ActionResult> {
  return downloadPdfSummary('Daily Action Report')
}

export function buildTrainingReminderPayload(trainingTitle: string): IntegrationPayload {
  return {
    title: trainingTitle,
    description: `${trainingTitle} expires tomorrow at 5 PM.`,
    dueAt: 'Tomorrow, 5:00 PM',
    deepLink: 'https://lms.internal.db/training',
  }
}
