import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts'
import { Card } from '@/components/ui/Card'
import { useTheme } from '@/store/ThemeStore'
import { useWindowWidth } from '@/hooks/useWindowWidth'

const userGrowth = [
  { month: 'Jan', new: 210, churned: 45, net: 165 },
  { month: 'Feb', new: 280, churned: 52, net: 228 },
  { month: 'Mar', new: 245, churned: 61, net: 184 },
  { month: 'Apr', new: 390, churned: 48, net: 342 },
  { month: 'May', new: 365, churned: 55, net: 310 },
  { month: 'Jun', new: 420, churned: 42, net: 378 },
  { month: 'Jul', new: 480, churned: 38, net: 442 },
  { month: 'Aug', new: 510, churned: 35, net: 475 },
]

const channelData = [
  { channel: 'Organic', users: 1420, revenue: 32400 },
  { channel: 'Paid',    users: 890,  revenue: 21800 },
  { channel: 'Referral',users: 640,  revenue: 15600 },
  { channel: 'Direct',  users: 520,  revenue: 10200 },
  { channel: 'Email',   users: 380,  revenue: 4230  },
]

const radarData = [
  { metric: 'Retention',    score: 88 },
  { metric: 'Engagement',   score: 72 },
  { metric: 'Conversion',   score: 65 },
  { metric: 'Satisfaction', score: 91 },
  { metric: 'Growth',       score: 79 },
  { metric: 'Activation',   score: 84 },
]

const heatmapData = (() => {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  const hours = Array.from({ length: 12 }, (_, i) => `${i + 8}`)
  return days.flatMap(day =>
    hours.map(hour => ({ day, hour, value: Math.floor(Math.random() * 100) }))
  )
})()

function Heatmap({ isMobile }: { isMobile: boolean }) {
  const days  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  const hours = isMobile
    ? Array.from({ length: 6 }, (_, i) => `${i * 2 + 8}`)
    : Array.from({ length: 12 }, (_, i) => `${i + 8}`)

  const byKey = Object.fromEntries(heatmapData.map(d => [`${d.day}-${d.hour}`, d.value]))

  return (
    <div style={{ overflowX: 'auto' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `${isMobile ? 28 : 40}px repeat(${hours.length}, 1fr)`,
        gap: isMobile ? 2 : 3,
        minWidth: isMobile ? 280 : 500,
      }}>
        <div />
        {hours.map(h => (
          <div key={h} style={{ fontSize: '0.6rem', color: 'var(--text-tertiary)', textAlign: 'center', paddingBottom: 3 }}>
            {h}
          </div>
        ))}
        {days.map(day => (
          <>
            <div key={day} style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', fontWeight: 500 }}>
              {isMobile ? day.slice(0, 1) : day}
            </div>
            {hours.map(hour => {
              const v = byKey[`${day}-${hour}`] ?? 0
              return (
                <div key={hour} title={`${v} events`} style={{
                  height: isMobile ? 14 : 18,
                  borderRadius: 3,
                  background: `rgba(99,102,241,${(v / 100) * 0.85 + 0.05})`,
                  cursor: 'default',
                  transition: 'transform 0.1s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.3)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
              )
            })}
          </>
        ))}
      </div>
    </div>
  )
}

export function AnalyticsPage() {
  const { isDark } = useTheme()
  const width = useWindowWidth()
  const isMobile = width < 640
  const isTablet = width < 1024

  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'
  const axisColor = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)'
  const tooltipStyle = {
    background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 11,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 14 : 20 }}>

      {/* Summary stats — 2 cols mobile, 4 desktop */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: isMobile ? 10 : 14,
      }}>
        {[
          { label: 'Avg session', value: '4m 32s', change: '+12%', up: true },
          { label: 'Pages / visit', value: '6.4',   change: '+5%',  up: true },
          { label: 'Bounce rate',  value: '24.1%',  change: '-8%',  up: true },
          { label: 'Conversion',   value: '3.8%',   change: '+0.4%',up: true },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)', padding: isMobile ? '14px 14px' : '18px 20px',
            animation: `fadeIn 0.35s ease ${i * 60}ms both`,
          }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: isMobile ? 'var(--text-xl)' : 'var(--text-2xl)', fontWeight: 600, letterSpacing: '-0.02em' }}>
              {s.value}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success-500)', marginTop: 5, fontWeight: 600 }}>
              {s.change} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* User growth */}
      <Card title="User Growth" subtitle="New vs churned vs net, monthly" delay={80}>
        <ResponsiveContainer width="100%" height={isMobile ? 160 : 240}>
          <LineChart data={userGrowth} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="new"     name="New"     stroke="#6366f1" strokeWidth={2}   dot={false} activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="churned" name="Churned" stroke="#ef4444" strokeWidth={1.5} dot={false} strokeDasharray="4 4" />
            <Line type="monotone" dataKey="net"     name="Net"     stroke="#22c55e" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Channel + Radar — stacked on tablet/mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isTablet ? '1fr' : '1fr 320px',
        gap: isMobile ? 14 : 16,
      }}>
        <Card title="Acquisition Channels" subtitle="Users and revenue by source" delay={120}>
          <ResponsiveContainer width="100%" height={isMobile ? 180 : 220}>
            <BarChart data={channelData} layout="vertical" margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="channel" type="category" tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false} width={55} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="users"   name="Users"   fill="#6366f1" radius={[0,4,4,0]} maxBarSize={16} />
              <Bar dataKey="revenue" name="Revenue" fill="#a855f7" radius={[0,4,4,0]} maxBarSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {!isMobile && (
          <Card title="Health Score" subtitle="Across 6 key metrics" delay={140}>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={gridColor} />
                <PolarAngleAxis dataKey="metric" tick={{ fill: axisColor, fontSize: 10 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: axisColor, fontSize: 9 }} />
                <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>

      {/* Heatmap */}
      <Card title="Activity Heatmap" subtitle="User events by day & hour (last 30 days)" delay={200}>
        <Heatmap isMobile={isMobile} />
      </Card>

    </div>
  )
}
