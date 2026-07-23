import type { DashboardData } from '../types'

export const mockDashboardResponse: DashboardData = {
  employee: {
    id: 'EMP-28491',
    firstName: 'Rasika',
    lastName: 'Mehta',
    department: 'Global Markets',
    role: 'Senior Analyst',
    avatarInitials: 'RM',
  },
  summary: {
    greeting: 'Good Morning Rasika',
    pendingActionsCount: 4,
    highPriorityCount: 1,
    mediumPriorityCount: 2,
    lowPriorityCount: 1,
    upcomingDeadlines: 1,
    complianceScore: 94,
    productivityScore: 87,
    minutesSavedToday: 25,
    suggestedAction:
      'Please complete your Information Security Training before 25 July and declare your pending trade within the next 48 hours.',
    briefingBullets: [
      'You have 3 pending actions.',
      '1 mandatory training expires in 5 days.',
      'Your trading declaration is pending.',
      'One personal transaction must be closed within 7 days.',
      'No high priority compliance alerts.',
    ],
    dailyPromptLines: [
      'Complete Information Security Training before 25 July.',
      'Trading declaration pending since 3 days.',
      'Your transaction for XYZ security should be closed within 5 days.',
      'No compliance breaches detected.',
      'You have successfully completed all mandatory declarations.',
    ],
  },
  trainings: [
    {
      id: 'tr-001',
      title: 'Information Security Training',
      completionPercent: 80,
      dueDate: '25 July 2026',
      status: 'in_progress',
      daysRemaining: 3,
      priority: 'high',
      category: 'Mandatory',
    },
    {
      id: 'tr-002',
      title: 'Anti-Money Laundering Refresher',
      completionPercent: 45,
      dueDate: '2 August 2026',
      status: 'in_progress',
      daysRemaining: 11,
      priority: 'medium',
      category: 'Compliance',
    },
    {
      id: 'tr-003',
      title: 'Code of Conduct 2026',
      completionPercent: 100,
      dueDate: 'Completed',
      status: 'completed',
      daysRemaining: 0,
      priority: 'low',
      category: 'Mandatory',
    },
  ],
  tradingDeclaration: {
    id: 'itra-8842',
    status: 'pending',
    priority: 'high',
    transactionCount: 3,
    deadlineDaysRemaining: 2,
    pendingSinceDays: 3,
    complianceStatus: 'action_required',
  },
  transactions: [
    {
      id: 'tx-001',
      securityName: 'Apple Inc Shares',
      ticker: 'AAPL',
      purchaseDate: '12 July 2026',
      daysRemaining: 5,
      severity: 'high',
      status: 'pending_closure',
      quantity: 50,
      valueEur: 12450,
    },
    {
      id: 'tx-002',
      securityName: 'Microsoft Corporation',
      ticker: 'MSFT',
      purchaseDate: '18 July 2026',
      daysRemaining: 12,
      severity: 'medium',
      status: 'pending_closure',
      quantity: 20,
      valueEur: 8920,
    },
    {
      id: 'tx-003',
      securityName: 'Deutsche Bank AG',
      ticker: 'DBK',
      purchaseDate: '5 July 2026',
      daysRemaining: 2,
      severity: 'high',
      status: 'under_review',
      quantity: 100,
      valueEur: 1520,
    },
  ],
  notifications: [
    {
      id: 'n-1',
      title: 'Trading declaration pending',
      message: 'Your quarterly ITRA declaration is overdue. Submit within 2 days.',
      priority: 'high',
      timestamp: '2 hours ago',
      read: false,
      category: 'trading',
    },
    {
      id: 'n-2',
      title: 'Training completion pending',
      message: 'Information Security Training is 80% complete. Due in 3 days.',
      priority: 'medium',
      timestamp: '5 hours ago',
      read: false,
      category: 'training',
    },
    {
      id: 'n-3',
      title: 'Transaction closure reminder',
      message: 'Apple Inc position requires closure within 5 days.',
      priority: 'medium',
      timestamp: 'Yesterday',
      read: true,
      category: 'transaction',
    },
    {
      id: 'n-4',
      title: 'Compliance status clear',
      message: 'No action required for compliance this week.',
      priority: 'low',
      timestamp: '2 days ago',
      read: true,
      category: 'compliance',
    },
  ],
  insights: [
    {
      id: 'i-1',
      message: 'Complete Information Security Training.',
      type: 'action',
      priority: 1,
    },
    {
      id: 'i-2',
      message: 'Declare your pending trade immediately.',
      type: 'action',
      priority: 2,
    },
    {
      id: 'i-3',
      message: 'No action required for Compliance.',
      type: 'info',
      priority: 3,
    },
    {
      id: 'i-4',
      message: 'You have saved 25 minutes today by receiving smart recommendations.',
      type: 'time_saved',
      priority: 4,
    },
  ],
  analytics: {
    completedTrainings: [
      { month: 'Jan', count: 2 },
      { month: 'Feb', count: 1 },
      { month: 'Mar', count: 3 },
      { month: 'Apr', count: 2 },
      { month: 'May', count: 4 },
      { month: 'Jun', count: 3 },
    ],
    pendingDeclarations: [
      { week: 'W1', count: 1 },
      { week: 'W2', count: 0 },
      { week: 'W3', count: 2 },
      { week: 'W4', count: 1 },
    ],
    complianceTrend: [
      { month: 'Jan', score: 88 },
      { month: 'Feb', score: 90 },
      { month: 'Mar', score: 91 },
      { month: 'Apr', score: 92 },
      { month: 'May', score: 93 },
      { month: 'Jun', score: 94 },
    ],
    productivityTrend: [
      { day: 'Mon', score: 72 },
      { day: 'Tue', score: 78 },
      { day: 'Wed', score: 85 },
      { day: 'Thu', score: 82 },
      { day: 'Fri', score: 87 },
    ],
    transactionsCompleted: [
      { month: 'Jan', count: 4 },
      { month: 'Feb', count: 2 },
      { month: 'Mar', count: 5 },
      { month: 'Apr', count: 3 },
      { month: 'May', count: 6 },
      { month: 'Jun', count: 4 },
    ],
  },
  upcomingDeadlines: [
    {
      id: 'd-1',
      title: 'Information Security Training',
      dueDate: '25 Jul 2026',
      daysLeft: 3,
      priority: 'high',
    },
    {
      id: 'd-2',
      title: 'ITRA Trading Declaration',
      dueDate: '24 Jul 2026',
      daysLeft: 2,
      priority: 'high',
    },
    {
      id: 'd-3',
      title: 'Close AAPL Position',
      dueDate: '27 Jul 2026',
      daysLeft: 5,
      priority: 'medium',
    },
  ],
}

/** Simulated network delay for mock API */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchDashboardData(): Promise<DashboardData> {
  await delay(1200)
  return structuredClone(mockDashboardResponse)
}

export async function fetchTrainings() {
  await delay(600)
  return structuredClone(mockDashboardResponse.trainings)
}

export async function fetchTradingDeclaration() {
  await delay(500)
  return structuredClone(mockDashboardResponse.tradingDeclaration)
}

export async function fetchTransactions() {
  await delay(550)
  return structuredClone(mockDashboardResponse.transactions)
}

export async function fetchNotifications() {
  await delay(400)
  return structuredClone(mockDashboardResponse.notifications)
}
