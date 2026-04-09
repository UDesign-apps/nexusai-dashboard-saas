import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, Sun, Moon, Search, Menu } from 'lucide-react'
import { useTheme } from '@/store/ThemeStore'

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard',  subtitle: 'Welcome back, Jane'              },
  '/analytics': { title: 'Analytics',  subtitle: 'Data for the last 30 days'       },
  '/users':     { title: 'Users',      subtitle: 'Manage accounts & subscriptions' },
  '/billing':   { title: 'Billing',    subtitle: 'Invoices & revenue'              },
  '/settings':  { title: 'Settings',   subtitle: 'Account & preferences'           },
}

const colorThemes = [
  { id: 'indigo',   hex: '#6366f1' },
  { id: 'arctic',   hex: '#0ea5e9' },
  { id: 'forest',   hex: '#10b981' },
  { id: 'sunrise',  hex: '#f59e0b' },
  { id: 'lavender', hex: '#a855f7' },
] as const

interface TopbarProps {
  onMenuToggle: () => void
  isMobile: boolean
}

export function Topbar({ onMenuToggle, isMobile }: TopbarProps) {
  const { pathname } = useLocation()
  const { setMode, isDark, colorTheme, setColorTheme } = useTheme()
  const [showNotifs, setShowNotifs] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const info = pageTitles[pathname] ?? { title: 'NexusAI', subtitle: '' }

  const iconBtn: React.CSSProperties = {
    width: 34, height: 34, borderRadius: 'var(--radius-md)',
    background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: 'var(--text-secondary)',
    transition: 'all var(--transition-fast)', flexShrink: 0,
  }

  return (
    <header style={{
      height: 'var(--topbar-height)',
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex', alignItems: 'center',
      padding: isMobile ? '0 14px' : '0 24px',
      gap: isMobile ? 8 : 12,
      position: 'sticky', top: 0, zIndex: 50,
      transition: 'background var(--transition-normal)',
    }}>

      {/* Hamburger — mobile only */}
      {isMobile && (
        <button
          onClick={onMenuToggle}
          style={{ ...iconBtn, flexShrink: 0 }}
          aria-label="Open navigation"
        >
          <Menu size={16} />
        </button>
      )}

      {/* Page title */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: isMobile ? 'var(--text-base)' : 'var(--text-md)',
          fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.01em',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {info.title}
        </div>
        {!isMobile && (
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 1 }}>
            {info.subtitle}
          </div>
        )}
      </div>

      {/* Search — hidden on small mobile */}
      {!isMobile && (
        showSearch ? (
          <input
            autoFocus
            placeholder="Search anything..."
            onBlur={() => setShowSearch(false)}
            style={{
              padding: '6px 14px',
              border: '1px solid var(--color-primary-400)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              background: 'var(--bg-surface-2)',
              color: 'var(--text-primary)',
              width: 220, outline: 'none',
            }}
          />
        ) : (
          <button onClick={() => setShowSearch(true)} style={iconBtn} aria-label="Search">
            <Search size={15} />
          </button>
        )
      )}

      {/* Color theme dots — hide on very small screens via isMobile */}
      {!isMobile && (
        <div style={{ display: 'flex', gap: 5 }}>
          {colorThemes.map(({ id, hex }) => (
            <button
              key={id}
              onClick={() => setColorTheme(id)}
              title={id}
              aria-label={`Switch to ${id} theme`}
              style={{
                width: 13, height: 13, borderRadius: '50%',
                background: hex, border: 'none', cursor: 'pointer', padding: 0,
                outline: colorTheme === id ? `2px solid ${hex}` : 'none',
                outlineOffset: 2,
                transform: colorTheme === id ? 'scale(1.25)' : 'scale(1)',
                transition: 'transform var(--transition-fast)',
              }}
            />
          ))}
        </div>
      )}

      {/* Dark mode toggle */}
      <button
        onClick={() => setMode(isDark ? 'light' : 'dark')}
        style={iconBtn}
        aria-label="Toggle dark mode"
      >
        {isDark ? <Sun size={15} /> : <Moon size={15} />}
      </button>

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowNotifs(v => !v)}
          style={{ ...iconBtn, position: 'relative' }}
          aria-label="Notifications"
        >
          <Bell size={15} />
          <span style={{
            position: 'absolute', top: 5, right: 5,
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--color-danger-500)',
            border: '1.5px solid var(--bg-surface)',
          }} />
        </button>

        {showNotifs && (
          <div style={{
            position: 'absolute', top: '100%', right: 0, marginTop: 8,
            width: isMobile ? 280 : 300,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden', zIndex: 200,
            animation: 'fadeIn 0.2s ease',
          }}>
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid var(--border-color)',
              fontSize: 'var(--text-sm)', fontWeight: 600,
            }}>
              Notifications
            </div>
            {[
              { text: 'DriftWave Co paused their subscription', time: '3h ago', dot: '#f59e0b' },
              { text: 'New Enterprise signup: Aria Systems',    time: '5h ago', dot: '#22c55e' },
              { text: 'Invoice INV-0087 is 7 days overdue',     time: '1d ago', dot: '#ef4444' },
            ].map((n, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12, padding: '11px 16px',
                borderBottom: '1px solid var(--border-color)',
                alignItems: 'flex-start', cursor: 'pointer',
                transition: 'background var(--transition-fast)',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-surface-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: n.dot, marginTop: 5, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 'var(--text-sm)' }}>{n.text}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
