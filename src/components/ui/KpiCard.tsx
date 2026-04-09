import { TrendingUp, TrendingDown } from 'lucide-react'
import { fmt, pctChange } from '@/lib/utils'
import type { ReactNode } from 'react'

interface KpiCardProps {
  title: string
  value: number
  prev: number
  format: 'currency' | 'number' | 'percent'
  icon: ReactNode
  accentColor?: string
  delay?: number
}

export function KpiCard({ title, value, prev, format, icon, accentColor = 'var(--color-primary-500)', delay = 0 }: KpiCardProps) {
  const change = pctChange(value, prev)
  const positive = change >= 0

  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 22px',
      display: 'flex', flexDirection: 'column', gap: 14,
      position: 'relative', overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      animation: `fadeIn 0.4s ease ${delay}ms both`,
      transition: 'box-shadow var(--transition-fast), transform var(--transition-fast)',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
      }} />

      {/* Icon + title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 500 }}>
          {title}
        </span>
        <span style={{
          width: 34, height: 34, borderRadius: 'var(--radius-md)',
          background: `${accentColor}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accentColor, flexShrink: 0,
        }}>
          {icon}
        </span>
      </div>

      {/* Value */}
      <div>
        <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>
          {fmt(value, format)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8 }}>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 3,
            fontSize: 'var(--text-xs)', fontWeight: 600,
            color: positive ? 'var(--color-success-500)' : 'var(--color-danger-500)',
            background: positive ? 'var(--color-success-50)' : 'var(--color-danger-50)',
            padding: '2px 7px', borderRadius: 'var(--radius-full)',
          }}>
            {positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {positive ? '+' : ''}{change}%
          </span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>vs last month</span>
        </div>
      </div>
    </div>
  )
}
