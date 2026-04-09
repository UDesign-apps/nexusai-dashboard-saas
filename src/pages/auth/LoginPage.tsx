import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Eye, EyeOff, ArrowRight, Github } from 'lucide-react'

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@nexusai.com')
  const [password, setPassword] = useState('password')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true); setError('')
    setTimeout(() => { setLoading(false); navigate('/dashboard') }, 900)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    background: 'var(--bg-surface-2)',
    color: 'var(--text-primary)',
    fontSize: 'var(--text-base)', outline: 'none',
    transition: 'border-color 150ms ease',
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', background: 'var(--bg-page)',
    }}>
      {/* Left panel — branding */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '48px',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: -120, right: -120,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: -80,
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
          <div style={{
            width: 40, height: 40,
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={20} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>NexusAI</div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}>v1.0.0</div>
          </div>
        </div>

        {/* Tagline */}
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '2rem', fontWeight: 600, color: '#fff', lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: 16 }}>
            The dashboard<br />
            that thinks<br />
            <span style={{ background: 'linear-gradient(90deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              with you.
            </span>
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 340 }}>
            AI-powered analytics, 40+ pages, 6 themes, and a full Figma design system — everything your SaaS needs to look production-ready from day one.
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 32, position: 'relative' }}>
          {[
            { value: '40+', label: 'Pages' },
            { value: '6',   label: 'Themes' },
            { value: '18',  label: 'Charts' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{s.value}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.35)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        width: 480, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '48px 48px', background: 'var(--bg-surface)',
        borderLeft: '1px solid var(--border-color)',
      }}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 6 }}>
              Sign in
            </h1>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              Enter your credentials to access the dashboard
            </p>
          </div>

          {/* OAuth buttons */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <button style={{
              flex: 1, padding: '10px', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)', background: 'var(--bg-surface-2)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
              transition: 'border-color var(--transition-fast)',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-color-2)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              <Github size={16} /> GitHub
            </button>
            <button style={{
              flex: 1, padding: '10px', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)', background: 'var(--bg-surface-2)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontSize: 'var(--text-sm)', color: 'var(--text-secondary)',
              transition: 'border-color var(--transition-fast)',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-color-2)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-color)' }} />
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Email
              </label>
              <input
                type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary-400)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
              />
            </div>
            <div>
              <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: 42 }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary-400)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: 0, display: 'flex',
                }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-danger-500)', padding: '8px 12px', background: 'var(--color-danger-50)', borderRadius: 'var(--radius-md)' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              padding: '12px', borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-accent-600))',
              color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 'var(--text-base)', fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: loading ? 0.7 : 1,
              transition: 'opacity var(--transition-fast)',
              marginTop: 4,
            }}>
              {loading ? (
                <div style={{
                  width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff', borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite',
                }} />
              ) : (
                <><span>Sign in</span><ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p style={{ marginTop: 24, fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textAlign: 'center' }}>
            Demo credentials are pre-filled. Just click Sign in.
          </p>
        </div>
      </div>
    </div>
  )
}
