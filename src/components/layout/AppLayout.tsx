import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobile, sidebarOpen])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>

      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.55)',
            zIndex: 99,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      <Sidebar
        isOpen={isMobile ? sidebarOpen : true}
        isMobile={isMobile}
        onClose={() => setSidebarOpen(false)}
      />

      <div style={{
        flex: 1,
        marginLeft: isMobile ? 0 : 'var(--sidebar-width)',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        transition: 'margin-left var(--transition-normal)',
      }}>
        <Topbar
          onMenuToggle={() => setSidebarOpen(v => !v)}
          isMobile={isMobile}
        />
        <main style={{
          flex: 1,
          padding: isMobile ? '16px' : '28px',
          width: '100%',
          maxWidth: 1400,
          animation: 'fadeIn 0.3s ease both',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
