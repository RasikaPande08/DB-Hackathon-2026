import { useCallback, useEffect, useState } from 'react'
import type { DashboardData, NavSection } from './types'
import { AIInsights } from './components/dashboard/AIInsights'
import { AnalyticsSection } from './components/dashboard/AnalyticsSection'
import { DailyBriefing } from './components/dashboard/DailyBriefing'
import { DailyPrompt } from './components/dashboard/DailyPrompt'
import { NotificationCenter } from './components/dashboard/NotificationCenter'
import { TradingDeclarationModule } from './components/dashboard/TradingDeclarationModule'
import { TrainingTracker } from './components/dashboard/TrainingTracker'
import { TransactionMonitoring } from './components/dashboard/TransactionMonitoring'
import { UpcomingDeadlines } from './components/dashboard/UpcomingDeadlines'
import { Header } from './components/layout/Header'
import { Sidebar } from './components/layout/Sidebar'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { useDashboardData } from './hooks/useDashboardData'

const sectionAnchors: Record<NavSection, string> = {
  dashboard: 'top',
  briefing: 'briefing',
  training: 'training',
  trading: 'trading',
  transactions: 'transactions',
  compliance: 'compliance',
  insights: 'insights',
  notifications: 'notifications',
  profile: 'profile',
  settings: 'settings',
}

export function AppShell() {
  const { data, loading, error, refetch } = useDashboardData()
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavigate = useCallback((section: NavSection) => {
    setActiveSection(section)
    const id = sectionAnchors[section]
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const ids = Object.values(sectionAnchors)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) {
          const match = (Object.entries(sectionAnchors) as [NavSection, string][]).find(
            ([, anchor]) => anchor === visible.target.id,
          )
          if (match) setActiveSection(match[0])
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [data])

  if (loading) return <LoadingScreen />

  if (error || !data) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-slate-600 dark:text-slate-400">{error ?? 'Something went wrong.'}</p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-xl bg-db-blue px-6 py-2 text-sm font-medium text-white"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <DashboardLayout
      data={data}
      activeSection={activeSection}
      onNavigate={handleNavigate}
      mobileOpen={mobileOpen}
      onMenuClick={() => setMobileOpen(true)}
      onCloseMobile={() => setMobileOpen(false)}
    />
  )
}

function DashboardLayout({
  data,
  activeSection,
  onNavigate,
  mobileOpen,
  onMenuClick,
  onCloseMobile,
}: {
  data: DashboardData
  activeSection: NavSection
  onNavigate: (s: NavSection) => void
  mobileOpen: boolean
  onMenuClick: () => void
  onCloseMobile: () => void
}) {
  const fullName = `${data.employee.firstName} ${data.employee.lastName}`

  return (
    <div id="top" className="flex min-h-dvh">
      <Sidebar
        activeSection={activeSection}
        onNavigate={onNavigate}
        mobileOpen={mobileOpen}
        onCloseMobile={onCloseMobile}
        employeeName={fullName}
        department={data.employee.department}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={onMenuClick} pendingCount={data.summary.pendingActionsCount} />
        <main className="flex-1 overflow-x-hidden px-4 py-8 md:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-10">
            <DailyPrompt summary={data.summary} employeeName={data.employee.firstName} />

            <div id="briefing" className="scroll-mt-24 grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <DailyBriefing summary={data.summary} />
              </div>
              <UpcomingDeadlines deadlines={data.upcomingDeadlines} />
            </div>

            <AIInsights insights={data.insights} />
            <TrainingTracker trainings={data.trainings} />
            <TradingDeclarationModule declaration={data.tradingDeclaration} />
            <TransactionMonitoring transactions={data.transactions} />
            <AnalyticsSection
              analytics={data.analytics}
              complianceScore={data.summary.complianceScore}
              productivityScore={data.summary.productivityScore}
            />
            <NotificationCenter notifications={data.notifications} />

            <section id="profile" className="scroll-mt-24 grid gap-6 md:grid-cols-2">
              <ProfilePanel data={data} />
              <SettingsPanel />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

function ProfilePanel({ data }: { data: DashboardData }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Profile</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-500">Name</dt>
          <dd className="font-medium">
            {data.employee.firstName} {data.employee.lastName}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Employee ID</dt>
          <dd className="font-mono text-xs">{data.employee.id}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Role</dt>
          <dd>{data.employee.role}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Department</dt>
          <dd>{data.employee.department}</dd>
        </div>
      </dl>
    </div>
  )
}

function SettingsPanel() {
  return (
    <div id="settings" className="scroll-mt-24 rounded-2xl border border-slate-200/80 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Settings</h2>
      <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
        <li className="flex items-center justify-between rounded-lg border border-slate-200/60 px-3 py-2 dark:border-white/10">
          Email reminders
          <span className="text-emerald-600 dark:text-emerald-400">On</span>
        </li>
        <li className="flex items-center justify-between rounded-lg border border-slate-200/60 px-3 py-2 dark:border-white/10">
          Push notifications
          <span className="text-emerald-600 dark:text-emerald-400">On</span>
        </li>
        <li className="flex items-center justify-between rounded-lg border border-slate-200/60 px-3 py-2 dark:border-white/10">
          AI daily summary
          <span className="text-emerald-600 dark:text-emerald-400">Enabled</span>
        </li>
      </ul>
    </div>
  )
}
