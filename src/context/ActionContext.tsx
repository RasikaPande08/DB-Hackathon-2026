import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ActionResult } from '../types'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'

interface ToastItem extends ActionResult {
  id: string
}

interface ActionContextValue {
  runAction: (label: string, fn: () => Promise<ActionResult>) => Promise<void>
  pushToast: (result: ActionResult) => void
}

const ActionContext = createContext<ActionContextValue | null>(null)

export function ActionProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const pushToast = useCallback((result: ActionResult) => {
    const id = `toast-${Date.now()}`
    setToasts((prev) => [...prev, { ...result, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  const runAction = useCallback(
    async (_label: string, fn: () => Promise<ActionResult>) => {
      try {
        const result = await fn()
        pushToast(result)
      } catch {
        pushToast({ success: false, message: 'Action failed. Please try again.' })
      }
    },
    [pushToast],
  )

  const value = useMemo(() => ({ runAction, pushToast }), [runAction, pushToast])

  return (
    <ActionContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-24 right-6 z-[60] flex max-w-sm flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24 }}
              className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95"
            >
              <CheckCircle2
                className={`mt-0.5 h-5 w-5 shrink-0 ${toast.success ? 'text-emerald-500' : 'text-red-500'}`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {toast.integration ? toast.integration.toUpperCase() : 'Action'}
                </p>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">{toast.message}</p>
              </div>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-600"
                onClick={() => setToasts((p) => p.filter((t) => t.id !== toast.id))}
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ActionContext.Provider>
  )
}

export function useActions() {
  const ctx = useContext(ActionContext)
  if (!ctx) throw new Error('useActions must be used within ActionProvider')
  return ctx
}
