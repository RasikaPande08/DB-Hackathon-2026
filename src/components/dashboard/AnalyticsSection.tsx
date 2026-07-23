import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { BarChart3 } from 'lucide-react'
import type { ReactNode } from 'react'
import type { AnalyticsData } from '../../types'
import { GlassCard } from '../ui/GlassCard'
import { SectionHeader } from './TrainingTracker'

interface AnalyticsSectionProps {
  analytics: AnalyticsData
  complianceScore: number
  productivityScore: number
}

const tooltipStyle = {
  borderRadius: 12,
  border: '1px solid rgba(148,163,184,0.2)',
  background: 'rgba(255,255,255,0.95)',
}

export function AnalyticsSection({
  analytics,
  complianceScore,
  productivityScore,
}: AnalyticsSectionProps) {
  return (
    <section id="compliance" className="scroll-mt-24">
      <SectionHeader
        icon={BarChart3}
        title="Analytics"
        subtitle="Compliance, productivity, and completion trends"
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Completed Trainings" delay={0}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={analytics.completedTrainings}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="#0018a8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Pending Declarations (Weekly)" delay={0.05}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={analytics.pendingDeclarations}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#c4a962"
                strokeWidth={2}
                dot={{ fill: '#c4a962' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={`Compliance Score — ${complianceScore}%`} delay={0.1}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={analytics.complianceTrend}>
              <defs>
                <linearGradient id="complianceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0018a8" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#0018a8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#0018a8"
                fill="url(#complianceGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={`Daily Productivity — ${productivityScore}%`} delay={0.15}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={analytics.productivityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="score" fill="#1e40af" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Transactions Completed" delay={0.2} className="mt-6">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={analytics.transactionsCompleted}>
            <defs>
              <linearGradient id="txGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c4a962" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#c4a962" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="count" stroke="#a8925a" fill="url(#txGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </section>
  )
}

function ChartCard({
  title,
  children,
  delay,
  className,
}: {
  title: string
  children: ReactNode
  delay: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={className}
    >
      <GlassCard hover={false}>
        <h3 className="mb-4 text-sm font-semibold text-slate-800 dark:text-slate-200">{title}</h3>
        {children}
      </GlassCard>
    </motion.div>
  )
}
