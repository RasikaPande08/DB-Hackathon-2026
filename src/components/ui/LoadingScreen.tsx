import { motion } from 'framer-motion'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface-light dark:bg-surface-dark">
      <motion.div
        className="relative flex h-20 w-20 items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl gradient-db opacity-90"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ borderRadius: '24%' }}
        />
        <motion.div
          className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-white dark:bg-slate-900 text-sm font-bold text-db-blue"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          DB
        </motion.div>
      </motion.div>
      <motion.p
        className="mt-8 text-sm font-medium text-slate-600 dark:text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Preparing your daily briefing…
      </motion.p>
      <motion.div
        className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full gradient-db"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  )
}
