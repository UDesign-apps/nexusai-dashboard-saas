import { useState } from 'react'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { Sun, Moon, Monitor, Bell, Shield, Palette, User } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { useTheme } from '@/store/ThemeStore'

type ColorTheme = 'indigo' | 'arctic' | 'forest' | 'sunrise' | 'lavender'

const colorThemes: { id: ColorTheme; name: string; hex: string }[] = [
  { id: 'indigo',   name: 'Indigo',   hex: '#6366f1' },
  { id: 'arctic',   name: 'Arctic',   hex: '#0ea5e9' },
  { id: 'forest',   name: 'Forest',   hex: '#10b981' },
  { id: 'sunrise',  name: 'Sunrise',  hex: '#f59e0b' },
  { id: 'lavender', name: 'Lavender', hex: '#a855f7' },
]

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 40, height: 22, borderRadius: 11,
        background: checked ? 'var(--color-primary-500)' : 'var(--bg-surface-3)',
        position: 'relative', cursor: 'pointer',
        transition: 'background var(--transition-normal)',
        border: '1px solid var(--border-color)',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: '50%', background: '#fff',
        position: 'absolute', top: 2,
        left: checked ? 20 : 2,
        transition: 'left var(--transition-normal)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </div>
  )
}

function SettingRow({ label, description, children }: {
  label: string; description?: string; children: React.ReactNode
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 0', borderBottom: '1px solid var(--border-color)',
      gap: 20,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{label}</div>
        {description && (
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>{description}</div>
        )}
      </div>
      {children}
    </div>
  )
}

const sections = [
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'profile',    label: 'Profile',    icon: User    },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security',   label: 'Security',   icon: Shield  },
]

export function SettingsPage() {
  const width = useWindowWidth()
  const isMobile = width < 640
  const { mode, setMode, colorTheme, setColorTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('appearance')
  const [notifs, setNotifs] = useState({ email: true, push: false, weekly: true, alerts: true })
  const [name, setName] = useState('Jane Doe')
  const [email, setEmail] = useState('admin@nexusai.com')

  const inputStyle: React.CSSProperties = {
    padding: '8px 12px', border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-2)',
    color: 'var(--text-primary)', fontSize: 'var(--text-sm)', outline: 'none',
    width: 240, transition: 'border-color var(--transition-fast)',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: 16, animation: 'fadeIn 0.35s ease' }}>

      {/* Sidebar nav */}
      <div style={{
        background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)', padding: 8, height: 'fit-content',
        boxShadow: 'var(--shadow-sm)',
      }}>
        {sections.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveSection(id)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 12px', borderRadius: 'var(--radius-md)',
            background: activeSection === id ? 'var(--color-primary-50)' : 'transparent',
            color: activeSection === id ? 'var(--color-primary-600)' : 'var(--text-secondary)',
            border: 'none', cursor: 'pointer', fontSize: 'var(--text-sm)',
            fontWeight: activeSection === id ? 600 : 400,
            textAlign: 'left', transition: 'all var(--transition-fast)',
          }}>
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {activeSection === 'appearance' && (
          <Card title="Appearance" subtitle="Customize the look of your dashboard">
            {/* Theme mode */}
            <div style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
                Mode
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {([
                  { id: 'light',  label: 'Light',  icon: Sun     },
                  { id: 'dark',   label: 'Dark',   icon: Moon    },
                  { id: 'system', label: 'System', icon: Monitor },
                ] as const).map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setMode(id)} style={{
                    flex: 1, padding: '12px 8px', borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${mode === id ? 'var(--color-primary-500)' : 'var(--border-color)'}`,
                    background: mode === id ? 'rgba(99,102,241,0.06)' : 'var(--bg-surface-2)',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 6,
                    color: mode === id ? 'var(--color-primary-600)' : 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)',
                    fontSize: 'var(--text-xs)', fontWeight: mode === id ? 600 : 400,
                  }}>
                    <Icon size={18} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: 'var(--border-color)', margin: '20px 0' }} />

            {/* Color theme */}
            <div>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>
                Color theme
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {colorThemes.map(({ id, name, hex }) => (
                  <button key={id} onClick={() => setColorTheme(id)} style={{
                    flex: 1, padding: '12px 6px', borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${colorTheme === id ? hex : 'var(--border-color)'}`,
                    background: colorTheme === id ? `${hex}10` : 'var(--bg-surface-2)',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 8, transition: 'all var(--transition-fast)',
                  }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: hex,
                      outline: colorTheme === id ? `2px solid ${hex}` : 'none', outlineOffset: 2 }} />
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: colorTheme === id ? 600 : 400 }}>{name}</span>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}

        {activeSection === 'profile' && (
          <Card title="Profile" subtitle="Your account details">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <SettingRow label="Full name">
                <input value={name} onChange={e => setName(e.target.value)} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary-400)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-color)')} />
              </SettingRow>
              <SettingRow label="Email address">
                <input value={email} onChange={e => setEmail(e.target.value)} style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary-400)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-color)')} />
              </SettingRow>
              <SettingRow label="Timezone" description="Used for scheduling and reports">
                <select style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option>UTC−05:00 Eastern Time</option>
                  <option>UTC+00:00 London</option>
                  <option>UTC+01:00 Paris</option>
                  <option>UTC+05:30 Mumbai</option>
                </select>
              </SettingRow>
              <div style={{ paddingTop: 16 }}>
                <button style={{
                  padding: '8px 20px', borderRadius: 'var(--radius-md)',
                  background: 'var(--color-primary-500)', color: '#fff',
                  border: 'none', cursor: 'pointer', fontSize: 'var(--text-sm)', fontWeight: 500,
                  transition: 'opacity var(--transition-fast)',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Save changes
                </button>
              </div>
            </div>
          </Card>
        )}

        {activeSection === 'notifications' && (
          <Card title="Notifications" subtitle="Choose what you want to be notified about">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <SettingRow label="Email notifications" description="Receive updates via email">
                <Toggle checked={notifs.email} onChange={v => setNotifs(n => ({ ...n, email: v }))} />
              </SettingRow>
              <SettingRow label="Push notifications" description="Browser push alerts">
                <Toggle checked={notifs.push} onChange={v => setNotifs(n => ({ ...n, push: v }))} />
              </SettingRow>
              <SettingRow label="Weekly digest" description="Summary of the week every Monday">
                <Toggle checked={notifs.weekly} onChange={v => setNotifs(n => ({ ...n, weekly: v }))} />
              </SettingRow>
              <SettingRow label="Revenue alerts" description="Notify when revenue changes ±10%">
                <Toggle checked={notifs.alerts} onChange={v => setNotifs(n => ({ ...n, alerts: v }))} />
              </SettingRow>
            </div>
          </Card>
        )}

        {activeSection === 'security' && (
          <Card title="Security" subtitle="Manage your account security">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <SettingRow label="Two-factor authentication" description="Add an extra layer of security">
                <button style={{
                  padding: '6px 14px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-primary-400)', color: 'var(--color-primary-600)',
                  background: 'rgba(99,102,241,0.06)', cursor: 'pointer', fontSize: 'var(--text-sm)',
                }}>Enable 2FA</button>
              </SettingRow>
              <SettingRow label="Change password" description="Last changed 3 months ago">
                <button style={{
                  padding: '6px 14px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)', color: 'var(--text-secondary)',
                  background: 'var(--bg-surface-2)', cursor: 'pointer', fontSize: 'var(--text-sm)',
                }}>Update</button>
              </SettingRow>
              <SettingRow label="Active sessions" description="2 sessions currently active">
                <button style={{
                  padding: '6px 14px', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-danger-400)', color: 'var(--color-danger-600)',
                  background: 'var(--color-danger-50)', cursor: 'pointer', fontSize: 'var(--text-sm)',
                }}>Revoke all</button>
              </SettingRow>
            </div>
          </Card>
        )}

      </div>
    </div>
  )
}
