import { Zap, TrendingUp, AlertTriangle, Info } from 'lucide-react'
import { aiInsights } from '@/lib/mockData'

const typeConfig = {
  opportunity: { icon: TrendingUp,    color: '#22c55e', bg: '#f0fdf4', label: 'Opportunity' },
  warning:     { icon: AlertTriangle, color: '#f59e0b', bg: '#fffbeb', label: 'Warning'     },
  forecast:    { icon: Zap,           color: '#6366f1', bg: '#eef2ff', label: 'Forecast'    },
  info:        { icon: Info,          color: '#3b82f6', bg: '#eff6ff', label: 'Insight'     },
} as const

export function AiInsightPanel() {
  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      animation: 'fadeIn 0.4s ease 0.2s both',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(168,85,247,0.04))',
      }}>
        <div style={{
          width: 28, height: 28,
          background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))',
          borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Zap size={13} color="#fff" strokeWidth={2.5} />
        </div>
        <div>
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>AI Insights</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Auto-generated · Updated 5 min ago</div>
        </div>
        <div style={{
          marginLeft: 'auto', fontSize: '0.65rem', fontWeight: 600,
          background: 'var(--color-primary-500)', color: '#fff',
          padding: '2px 8px', borderRadius: 'var(--radius-full)',
          letterSpacing: '0.05em',
        }}>
          LIVE
        </div>
      </div>

      {/* Insights */}
      <div style={{ padding: '8px 0' }}>
        {aiInsights.map((insight, i) => {
          const cfg = typeConfig[insight.type as keyof typeof typeConfig]
          const Icon = cfg.icon
          return (
            <div
              key={insight.id}
              style={{
                display: 'flex', gap: 14, padding: '13px 20px',
                borderBottom: i < aiInsights.length - 1 ? '1px solid var(--border-color)' : 'none',
                cursor: 'pointer', transition: 'background var(--transition-fast)',
                animation: `fadeIn 0.3s ease ${0.1 * (i + 1)}s both`,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-surface-2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{
                width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                background: cfg.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={14} color={cfg.color} strokeWidth={2.5} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{insight.title}</span>
                  <span style={{
                    fontSize: '0.6rem', fontWeight: 600, color: cfg.color,
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>{cfg.label}</span>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {insight.body}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
