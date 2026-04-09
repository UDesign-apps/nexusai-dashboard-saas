import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { DollarSign, Users, TrendingDown, Zap } from 'lucide-react'
import { KpiCard } from '@/components/ui/KpiCard'
import { Card } from '@/components/ui/Card'
import { AiInsightPanel } from '@/components/ai/AiInsightPanel'
import { ActivityFeed } from '@/components/ui/ActivityFeed'
import { kpiData, revenueWeekly, revenueMonthly, planDistribution, topPages } from '@/lib/mockData'
import { fmt } from '@/lib/utils'
import { useTheme } from '@/store/ThemeStore'
import { useWindowWidth } from '@/hooks/useWindowWidth'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)', padding: '10px 14px',
      boxShadow: 'var(--shadow-lg)', fontSize: 'var(--text-xs)',
    }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color, display: 'flex', gap: 8, justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary)' }}>{p.name}</span>
          <span style={{ fontWeight: 600 }}>
            {typeof p.value === 'number' && p.value > 1000 ? fmt(p.value, 'currency') : p.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function DashboardPage() {
  const { isDark } = useTheme()
  const width = useWindowWidth()
  const isMobile = width < 640
  const isTablet = width < 1024

  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'
  const axisColor = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 14 : 22 }}>

      {/* KPI row — 2 cols on mobile, 4 on desktop */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: isMobile ? 10 : 16,
      }}>
        <KpiCard title="Revenue"    {...kpiData.revenue}   icon={<DollarSign size={16}/>} accentColor="#6366f1" delay={0}   />
        <KpiCard title="Users"      {...kpiData.users}     icon={<Users size={16}/>}       accentColor="#a855f7" delay={60}  />
        <KpiCard title="MRR"        {...kpiData.mrr}       icon={<Zap size={16}/>}         accentColor="#06b6d4" delay={120} />
        <KpiCard title="Churn"      {...kpiData.churnRate} icon={<TrendingDown size={16}/>} accentColor="#f59e0b" delay={180} />
      </div>

      {/* Charts row — stacked on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isTablet ? '1fr' : '1fr 320px',
        gap: isMobile ? 14 : 16,
      }}>
        <Card title="Revenue" subtitle="Monthly actual vs target" delay={100}>
          <ResponsiveContainer width="100%" height={isMobile ? 180 : 240}>
            <AreaChart data={revenueMonthly} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} width={40} />
              <Tooltip content={<CustomTooltip />} />
              {!isMobile && <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />}
              <Area type="monotone" dataKey="target"  name="Target"  stroke="#a855f7" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#targetGrad)" dot={false} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2}   fill="url(#revGrad)" dot={false} activeDot={{ r: 4, fill: '#6366f1' }} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Plans" subtitle="By subscriber count" delay={150}>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={planDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={62}
                paddingAngle={3} dataKey="value" strokeWidth={0}>
                {planDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`, '']} contentStyle={{
                background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 11,
              }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 8 }}>
            {planDistribution.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color, flexShrink: 0 }} />
                <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{p.name}</span>
                <span style={{ fontWeight: 600 }}>{p.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly bar + AI insights — stacked on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 14 : 16,
      }}>
        <Card title="This Week" subtitle="Daily revenue & signups" delay={200}>
          <ResponsiveContainer width="100%" height={isMobile ? 160 : 200}>
            <BarChart data={revenueWeekly} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={4}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false}
                tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} width={36} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" name="Revenue" fill="#6366f1" radius={[4,4,0,0]} maxBarSize={28} fillOpacity={0.9} />
              <Bar dataKey="users"   name="Signups" fill="#a855f7" radius={[4,4,0,0]} maxBarSize={28} fillOpacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <AiInsightPanel />
      </div>

      {/* Activity + Top pages — stacked on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 14 : 16,
      }}>
        <Card title="Activity" subtitle="Recent account events" delay={250}>
          <ActivityFeed />
        </Card>
        <Card title="Top Pages" subtitle="By pageviews this month" delay={280}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {topPages.map((p, i) => {
              const pct = Math.round((p.views / topPages[0].views) * 100)
              return (
                <div key={i} style={{
                  padding: '10px 0',
                  borderBottom: i < topPages.length - 1 ? '1px solid var(--border-color)' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{
                      fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
                      color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap', maxWidth: '60%',
                    }}>
                      {p.page}
                    </span>
                    <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                      {!isMobile && (
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                          {p.bounce} bounce
                        </span>
                      )}
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                        {p.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div style={{ height: 3, background: 'var(--bg-surface-3)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: `linear-gradient(90deg, var(--color-primary-500), var(--color-accent-500))`,
                      borderRadius: 2,
                    }} />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

    </div>
  )
}
