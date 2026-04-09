import { useWindowWidth } from '@/hooks/useWindowWidth'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Download, CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { Card, Badge } from '@/components/ui/Card'
import { invoices, revenueMonthly } from '@/lib/mockData'
import { fmt } from '@/lib/utils'
import { useTheme } from '@/store/ThemeStore'

const statusIcon = {
  paid:    { icon: CheckCircle, color: 'var(--color-success-500)' },
  pending: { icon: Clock,       color: 'var(--color-warning-500)' },
  overdue: { icon: AlertCircle, color: 'var(--color-danger-500)'  },
}
const statusBadge: Record<string, 'success' | 'warning' | 'danger'> = {
  paid: 'success', pending: 'warning', overdue: 'danger',
}

export function BillingPage() {
  const width = useWindowWidth()
  const isMobile = width < 640
  const { isDark } = useTheme()
  const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'
  const axisColor = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)'

  const totalPaid    = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0)
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0)
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)', gap: 14 }}>
        {[
          { label: 'Collected this month', value: totalPaid,    color: 'var(--color-success-500)', icon: CheckCircle },
          { label: 'Awaiting payment',     value: totalPending, color: 'var(--color-warning-500)', icon: Clock       },
          { label: 'Overdue',              value: totalOverdue, color: 'var(--color-danger-500)',  icon: AlertCircle },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} style={{
              background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)', padding: '20px 22px',
              animation: `fadeIn 0.35s ease ${i * 60}ms both`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{s.label}</span>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 600, letterSpacing: '-0.02em', color: s.value > 0 ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
                {fmt(s.value, 'currency')}
              </div>
            </div>
          )
        })}
      </div>

      {/* Revenue chart */}
      <Card title="Revenue Over Time" subtitle="Monthly billed revenue" delay={80}>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={revenueMonthly} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="billGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(v: number) => [fmt(v, 'currency'), 'Revenue']}
              contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 8, fontSize: 12 }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} fill="url(#billGrad)" dot={false} activeDot={{ r: 4, fill: '#22c55e' }} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Invoices table */}
      <Card title="Invoices" subtitle={`${invoices.length} total`} padding="0" delay={120}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-2)' }}>
                {['Invoice', 'Customer', 'Amount', 'Date', 'Status', ''].map(h => (
                  <th key={h} style={{
                    padding: '10px 16px', fontSize: '0.7rem', fontWeight: 600,
                    color: 'var(--text-secondary)', textAlign: 'left',
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                    borderBottom: '1px solid var(--border-color)',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => {
                const { icon: SIcon, color } = statusIcon[inv.status as keyof typeof statusIcon]
                return (
                  <tr key={inv.id} style={{
                    borderBottom: '1px solid var(--border-color)',
                    transition: 'background var(--transition-fast)',
                    animation: `fadeIn 0.3s ease ${i * 50}ms both`,
                    cursor: 'pointer',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-surface-2)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '13px 16px', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      {inv.id}
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                      {inv.customer}
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      {fmt(inv.amount, 'currency')}
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                      {new Date(inv.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <SIcon size={13} style={{ color }} />
                        <Badge color={statusBadge[inv.status as keyof typeof statusBadge]}>
                          {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                        </Badge>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <button style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '5px 10px', borderRadius: 6,
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-surface-2)', cursor: 'pointer',
                        fontSize: '0.7rem', color: 'var(--text-secondary)',
                        transition: 'all var(--transition-fast)',
                      }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-primary-400)')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                      >
                        <Download size={11} /> PDF
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment method card */}
      <Card title="Payment Method" delay={180}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 56, height: 36, borderRadius: 8,
            background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--border-color)',
          }}>
            <CreditCard size={18} color="#6366f1" />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Visa ending in 4242</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Expires 08 / 27</div>
          </div>
          <Badge color="success" >Default</Badge>
          <button style={{
            marginLeft: 'auto', padding: '7px 14px',
            border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface-2)', cursor: 'pointer',
            fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
          }}>
            Update
          </button>
        </div>
      </Card>
    </div>
  )
}
