import { Menu, Moon, Sun, Search } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

interface HeaderProps {
  onMenuClick: () => void
  pendingCount: number
}

export function Header({ onMenuClick, pendingCount }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-white/10"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden sm:block">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Employee Hub</p>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">DB Smart Assistant</h1>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search actions, trainings, declarations…"
              className="w-full rounded-xl border border-slate-200/80 bg-slate-50/80 py-2 pl-10 pr-4 text-sm outline-none ring-db-blue/30 transition focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            />
          </div>

          <span className="hidden rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-400 sm:inline">
            {pendingCount} pending
          </span>

          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-xl border border-slate-200/80 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}
