import { NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '@/store/ThemeStore'
import {
  LayoutDashboard, BarChart2, Users, CreditCard,
  Settings, LogOut, Zap, ChevronRight, X
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard',  to: '/dashboard',  icon: LayoutDashboard },
  { label: 'Analytics',  to: '/analytics',  icon: BarChart2 },
  { label: 'Users',      to: '/users',       icon: Users },
  { label: 'Billing',    to: '/billing',     icon: CreditCard },
  { label: 'Settings',   to: '/settings',    icon: Settings },
]

interface SidebarProps {
  isOpen: boolean
  isMobile: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, isMobile, onClose }: SidebarProps) {
  const navigate = useNavigate()
  useTheme()

  const sidebarStyle: React.CSSProperties = {
    width: 'var(--sidebar-width)',
    minHeight: '100vh',
    background: 'var(--bg-sidebar)',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(255,255,255,0.05)',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
    transition: 'transform var(--transition-normal)',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
  }

  return (
    <aside style={sidebarStyle}>
      {/* Logo */}
      <div style={{
        padding: '20px 20px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 34, height: 34,
          background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-500))',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Zap size={16} color="#fff" strokeWidth={2.5} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>
            NexusAI
          </div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)', marginTop: 1 }}>
            v1.0.0
          </div>
        </div>
        {/* Close button — mobile only */}
        {isMobile && (
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.4)', padding: 4, borderRadius: 6,
              display: 'flex', transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{
          fontSize: '0.625rem', fontWeight: 600,
          color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em',
          textTransform: 'uppercase', padding: '8px 8px 6px',
        }}>
          Main
        </div>
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 10px', borderRadius: 'var(--radius-md)',
            color: isActive ? '#fff' : 'rgba(255,255,255,0.45)',
            background: isActive ? 'var(--bg-sidebar-active)' : 'transparent',
            textDecoration: 'none',
            fontSize: 'var(--text-sm)', fontWeight: isActive ? 500 : 400,
            transition: 'all var(--transition-fast)',
            borderLeft: isActive ? '2px solid var(--color-primary-500)' : '2px solid transparent',
          })}>
            {({ isActive }) => (
              <>
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} style={{ flexShrink: 0 }} />
                <span>{label}</span>
                {isActive && <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer user row */}
      <div style={{ padding: '14px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 10px', borderRadius: 'var(--radius-md)',
          cursor: 'pointer', transition: 'background var(--transition-fast)',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.7rem', fontWeight: 700, color: '#fff',
          }}>
            JD
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: '#fff', lineHeight: 1.3 }}>Jane Doe</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              admin@nexusai.com
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.25)', padding: 4, borderRadius: 6,
              display: 'flex', transition: 'color var(--transition-fast)',
            }}
            title="Sign out"
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}
