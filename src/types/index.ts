export type Priority = 'high' | 'medium' | 'low'

export type UserRole = 'employee' | 'manager' | 'compliance_officer' | 'admin'

export type TrainingStatus = 'pending' | 'in_progress' | 'completed'

export type RiskLevel = 'critical' | 'elevated' | 'moderate' | 'low'

export interface Employee {
  id: string
  firstName: string
  lastName: string
  department: string
  role: string
  avatarInitials: string
  roles: UserRole[]
}

export interface Training {
  id: string
  title: string
  completionPercent: number
  dueDate: string
  status: TrainingStatus
  daysRemaining: number
  priority: Priority
  category: string
  estimatedCompletionMinutes: number
  expiresWithinHours?: number
}

export interface TradingDeclaration {
  id: string
  status: 'pending' | 'submitted' | 'overdue'
  priority: Priority
  transactionCount: number
  deadlineDaysRemaining: number
  pendingSinceDays: number
  complianceStatus: 'compliant' | 'action_required' | 'review'
  estimatedCompletionMinutes: number
}

export interface Transaction {
  id: string
  securityName: string
  ticker: string
  purchaseDate: string
  daysRemaining: number
  severity: Priority
  status: 'pending_closure' | 'closed' | 'under_review'
  quantity: number
  valueEur: number
  estimatedCompletionMinutes: number
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  priority: Priority
  timestamp: string
  read: boolean
  category: 'training' | 'trading' | 'compliance' | 'transaction' | 'system'
}

export interface AIInsight {
  id: string
  message: string
  type: 'action' | 'info' | 'success' | 'time_saved'
  priority: number
}

export interface DailySummary {
  greeting: string
  pendingActionsCount: number
  highPriorityCount: number
  mediumPriorityCount: number
  lowPriorityCount: number
  upcomingDeadlines: number
  complianceScore: number
  productivityScore: number
  minutesSavedToday: number
  suggestedAction: string
  briefingBullets: string[]
  dailyPromptLines: string[]
}

export interface PriorityTask {
  id: string
  title: string
  priority: Priority
  priorityScore: number
  daysRemaining: number
  estimatedMinutes: number
  riskLevel: RiskLevel
  category: string
  recommendedOrder: number
}

export interface ComplianceHealth {
  score: number
  starRating: number
  trainingStatus: string
  tradingDeclarationStatus: string
  complianceStatus: string
  upcomingDeadlinesCount: number
  breachesDetected: boolean
  breachMessage: string
}

export interface TimelineEvent {
  id: string
  dateLabel: string
  isoDate: string
  title: string
  description: string
  priority: Priority
  category: string
}

export interface TeamMemberSummary {
  id: string
  name: string
  pendingTrainings: number
  pendingDeclarations: number
  complianceScore: number
  alerts: number
}

export interface ManagerDashboardData {
  teamComplianceScore: number
  pendingTrainings: number
  pendingDeclarations: number
  upcomingDeadlines: number
  complianceAlerts: number
  members: TeamMemberSummary[]
}

export interface GamificationData {
  complianceStreakDays: number
  longestStreak: number
  badges: { id: string; label: string; earned: boolean; icon: string }[]
  weeklySummaryReady: boolean
}

export interface AnalyticsData {
  completedTrainings: { month: string; count: number }[]
  pendingDeclarations: { week: string; count: number }[]
  complianceTrend: { month: string; score: number }[]
  productivityTrend: { day: string; score: number }[]
  transactionsCompleted: { month: string; count: number }[]
  pendingTasksWeekly: { day: string; count: number }[]
  weeklyCompliance: { week: string; score: number }[]
  monthlyCompletions: { month: string; rate: number }[]
  aiRecommendationTrend: { week: string; accepted: number; dismissed: number }[]
}

export interface DashboardData {
  employee: Employee
  summary: DailySummary
  trainings: Training[]
  tradingDeclaration: TradingDeclaration
  transactions: Transaction[]
  notifications: NotificationItem[]
  insights: AIInsight[]
  analytics: AnalyticsData
  upcomingDeadlines: {
    id: string
    title: string
    dueDate: string
    daysLeft: number
    priority: Priority
  }[]
  priorityEngine: {
    recommendedOrder: string[]
    tasks: PriorityTask[]
  }
  complianceHealth: ComplianceHealth
  calendarTimeline: TimelineEvent[]
  managerDashboard?: ManagerDashboardData
  gamification: GamificationData
}

export type NavSection =
  | 'dashboard'
  | 'briefing'
  | 'training'
  | 'trading'
  | 'transactions'
  | 'compliance'
  | 'timeline'
  | 'insights'
  | 'notifications'
  | 'manager'
  | 'analytics'
  | 'profile'
  | 'settings'

export interface CopilotMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  suggestions?: string[]
}

export interface IntegrationPayload {
  title: string
  description: string
  dueAt?: string
  deepLink?: string
}

export interface ActionResult {
  success: boolean
  message: string
  integration?: 'outlook' | 'teams' | 'pdf' | 'portal'
}

export interface SearchResult {
  id: string
  title: string
  section: NavSection
  subtitle: string
}
