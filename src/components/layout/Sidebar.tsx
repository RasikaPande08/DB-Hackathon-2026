import clsx from 'clsx'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Bell,
  Bot,
  FileSignature,
  LayoutDashboard,
  Settings,
  Sparkles,
  TrendingUp,
  User,
  BookOpen,
  Shield,
} from 'lucide-react'
import type { NavSection } from '../../types'

const navItems: { id: NavSection; label: string; icon: typeof LayoutDashboard; href: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '#top' },
  { id: 'briefing', label: 'Daily Briefing', icon: Sparkles, href: '#briefing' },
  { id: 'training', label: 'Training Tracker', icon: BookOpen, href: '#training' },
  { id: 'trading', label: 'Trading Declarations', icon: FileSignature, href: '#trading' },
  { id: 'transactions', label: 'Transactions', icon: TrendingUp, href: '#transactions' },
  { id: 'compliance', label: 'Compliance', icon: Shield, href: '#compliance' },
  { id: 'profile', label: 'Profile', icon: User, href: '#profile' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '#settings' },
]

interface SidebarProps {
  activeSection: NavSection
  onNavigate: (section: NavSection) => void
  mobileOpen: boolean
  onCloseMobile: () => void
  employeeName: string
  department: string
}

export function Sidebar({
  activeSection,
  onNavigate,
  mobileOpen,
  onCloseMobile,
  employeeName,
  department,
}: SidebarProps) {
  const content = (
    <>
      <div className="flex items-center gap-3 px-2 py-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-db text-sm font-bold text-white shadow-lg">
          DB
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Smart Assistant</p>
          <p className="text-[10px] uppercase tracking-wider text-slate-500">Deutsche Bank</p>
        </div>
      </div>

      <nav className="mt-8 flex-1 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = activeSection === item.id
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                onNavigate(item.id)
                onCloseMobile()
              }}
              className={clsx(
                'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                active
                  ? 'bg-db-blue text-white shadow-md shadow-db-blue/25 dark:bg-blue-600'
                  : 'text-slate-600 hover:bg-slate-900/5 dark:text-slate-400 dark:hover:bg-white/5',
              )}
            >
              <Icon className={clsx('h-4 w-4', active ? 'text-white' : 'text-slate-400 group-hover:text-db-blue')} />
              {item.label}
            </a>
          )
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-db-blue/10 text-sm font-semibold text-db-blue dark:bg-blue-500/20 dark:text-blue-300">
            {employeeName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{employeeName}</p>
            <p className="truncate text-xs text-slate-500">{department}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
          <BarChart3 className="h-3.5 w-3.5" />
          Smart priority prediction active
        </div>
      </div>
    </>
  )

  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white/80 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 lg:flex">
        {content}
      </aside>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200/80 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-slate-900 lg:hidden"
      >
        {content}
      </motion.aside>
    </>
  )
}
