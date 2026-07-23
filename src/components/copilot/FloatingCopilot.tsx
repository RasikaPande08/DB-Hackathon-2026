import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { Bot, Mic, Send, Sparkles, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { askCopilot, buildWelcomeMessage, COPILOT_STARTER_PROMPTS } from '../../api/copilotEngine'
import type { CopilotMessage, DashboardData } from '../../types'

interface FloatingCopilotProps {
  data: DashboardData
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-db-blue/60 dark:bg-blue-400"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

function MessageBubble({ message }: { message: CopilotMessage }) {
  const isUser = message.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        isUser
          ? 'ml-auto bg-db-blue text-white'
          : 'bg-slate-100/90 text-slate-800 dark:bg-white/10 dark:text-slate-100'
      }`}
    >
      <p className="whitespace-pre-wrap">{message.content}</p>
    </motion.div>
  )
}

export function FloatingCopilot({ data }: FloatingCopilotProps) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState<CopilotMessage[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([buildWelcomeMessage(data)])
    }
  }, [open, messages.length, data])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || typing) return
      const userMsg: CopilotMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      }
      setMessages((m) => [...m, userMsg])
      setInput('')
      setTyping(true)
      const reply = await askCopilot(trimmed, data)
      setTyping(false)
      setMessages((m) => [...m, reply])
    },
    [data, typing],
  )

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-none"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(560px,75dvh)] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-white/30 bg-white/90 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/95"
          >
            <header className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-db text-white shadow-lg">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Ask DB AI</p>
                  <p className="text-xs text-slate-500">Employee Copilot • Confidential</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <MessageBubble message={msg} />
                  {msg.suggestions && msg.role === 'assistant' && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => void send(s)}
                          className="rounded-full border border-db-blue/20 bg-db-blue/5 px-3 py-1 text-xs text-db-blue dark:border-blue-500/30 dark:text-blue-300"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="rounded-2xl bg-slate-100/90 px-4 dark:bg-white/10">
                  <TypingIndicator />
                </div>
              )}
            </div>

            <div className="border-t border-slate-200/80 p-3 dark:border-white/10">
              <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
                {COPILOT_STARTER_PROMPTS.slice(0, 3).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => void send(p)}
                    className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] text-slate-600 dark:bg-white/10 dark:text-slate-400"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  void send(input)
                }}
                className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/80 p-2 dark:border-white/10 dark:bg-white/5"
              >
                <button
                  type="button"
                  className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"
                  aria-label="Voice assistant"
                  onClick={() => void send('Generate today\'s smart summary')}
                >
                  <Mic className="h-4 w-4" />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask DB AI anything…"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none dark:text-slate-100"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  className="rounded-xl bg-db-blue p-2 text-white disabled:opacity-40 dark:bg-blue-600"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full gradient-db px-5 py-3.5 text-sm font-semibold text-white shadow-2xl shadow-db-blue/40"
      >
        <Sparkles className="h-5 w-5" />
        Ask DB AI
      </motion.button>
    </>
  )
}
