import type { ReactNode, CSSProperties } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
  style?: CSSProperties
  padding?: string
  delay?: number
}

export function Card({ title, subtitle, action, children, style, padding = '20px', delay = 0 }: CardProps) {
  return (
    <div style={{
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden',
      animation: `fadeIn 0.4s ease ${delay}ms both`,
      ...style,
    }}>
      {(title || action) && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: `16px ${padding} 0`,
          marginBottom: 16,
        }}>
          <div>
            {title && (
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, letterSpacing: '-0.01em' }}>
                {title}
              </div>
            )}
            {subtitle && (
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>
                {subtitle}
              </div>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div style={{ padding }}>{children}</div>
    </div>
  )
}

export function Badge({ children, color = 'default' }: { children: ReactNode; color?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' }) {
  const colors = {
    default: { bg: 'var(--bg-surface-3)', text: 'var(--text-secondary)' },
    success: { bg: 'var(--color-success-50)', text: 'var(--color-success-600)' },
    warning: { bg: 'var(--color-warning-50)', text: 'var(--color-warning-600)' },
    danger:  { bg: 'var(--color-danger-50)',  text: 'var(--color-danger-600)'  },
    info:    { bg: 'var(--color-info-50)',     text: 'var(--color-info-600)'    },
    primary: { bg: 'var(--color-primary-50)',  text: 'var(--color-primary-600)' },
  }
  const c = colors[color]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.02em',
      padding: '2px 8px', borderRadius: 'var(--radius-full)',
      background: c.bg, color: c.text,
    }}>
      {children}
    </span>
  )
}

export function Divider() {
  return <div style={{ height: 1, background: 'var(--border-color)', margin: '0 -20px' }} />
}
