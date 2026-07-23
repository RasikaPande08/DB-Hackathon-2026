import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export interface ActionMenuItem {
  id: string
  label: string
  variant?: 'default' | 'primary' | 'danger'
  onSelect: () => void
}

interface ActionMenuProps {
  items: ActionMenuItem[]
  primaryLabel?: string
  onPrimary?: () => void
  align?: 'left' | 'right'
}

export function ActionMenu({ items, primaryLabel, onPrimary, align = 'right' }: ActionMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative flex flex-wrap items-center gap-2">
      {primaryLabel && onPrimary && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPrimary}
          className="rounded-xl bg-db-blue px-4 py-2 text-sm font-semibold text-white shadow-md shadow-db-blue/20 dark:bg-blue-600"
        >
          {primaryLabel}
        </motion.button>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 rounded-xl border border-slate-200/80 bg-white/60 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-db-blue/30 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
      >
        Actions
        <ChevronDown className={clsx('h-4 w-4 transition', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className={clsx(
              'absolute bottom-full z-20 mb-2 min-w-[220px] overflow-hidden rounded-xl border border-slate-200/80 bg-white/95 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95',
              align === 'right' ? 'right-0' : 'left-0',
            )}
          >
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  item.onSelect()
                  setOpen(false)
                }}
                className={clsx(
                  'flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-white/5',
                  item.variant === 'primary' && 'font-semibold text-db-blue dark:text-blue-300',
                  item.variant === 'danger' && 'text-red-600 dark:text-red-400',
                )}
              >
                <MoreHorizontal className="h-3.5 w-3.5 opacity-40" />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
