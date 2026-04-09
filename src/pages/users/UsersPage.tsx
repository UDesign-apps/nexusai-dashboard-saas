import { useState } from 'react'
import { Search, UserPlus, MoreHorizontal, Mail, ChevronUp, ChevronDown } from 'lucide-react'
import { Card, Badge } from '@/components/ui/Card'
import { users } from '@/lib/mockData'
import { fmt, avatarColor } from '@/lib/utils'
import { useWindowWidth } from '@/hooks/useWindowWidth'

type SortKey = 'name' | 'plan' | 'mrr' | 'status' | 'joined'
type SortDir = 'asc' | 'desc'

const planOrder: Record<string, number> = { Enterprise: 3, Pro: 2, Starter: 1 }
const statusBadge: Record<string, 'success' | 'warning' | 'danger' | 'default' | 'info'> = {
  active: 'success', trial: 'info', paused: 'warning', churned: 'danger',
}

export function UsersPage() {
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState<string>('All')
  const [sortKey, setSortKey] = useState<SortKey>('mrr')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const width = useWindowWidth()
  const isMobile = width < 640

  const filtered = users
    .filter(u =>
      (planFilter === 'All' || u.plan === planFilter) &&
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
       u.email.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      let cmp = 0
      if (sortKey === 'name')   cmp = a.name.localeCompare(b.name)
      if (sortKey === 'plan')   cmp = (planOrder[a.plan] ?? 0) - (planOrder[b.plan] ?? 0)
      if (sortKey === 'mrr')    cmp = a.mrr - b.mrr
      if (sortKey === 'status') cmp = a.status.localeCompare(b.status)
      if (sortKey === 'joined') cmp = a.joined.localeCompare(b.joined)
      return sortDir === 'asc' ? cmp : -cmp
    })

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronUp size={11} style={{ opacity: 0.2 }} />
    return sortDir === 'asc' ? <ChevronUp size={11} /> : <ChevronDown size={11} />
  }

  const thStyle: React.CSSProperties = {
    padding: '9px 12px', fontSize: '0.68rem', fontWeight: 600,
    color: 'var(--text-secondary)', textAlign: 'left',
    textTransform: 'uppercase', letterSpacing: '0.06em',
    cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
  }

  // Mobile card view
  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={13} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
            style={{ width: '100%', padding: '9px 12px 9px 32px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-2)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)', outline: 'none' }} />
        </div>

        {/* Plan filter pills */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['All', 'Enterprise', 'Pro', 'Starter'].map(p => (
            <button key={p} onClick={() => setPlanFilter(p)} style={{
              padding: '5px 12px', borderRadius: 'var(--radius-full)',
              background: planFilter === p ? 'var(--color-primary-500)' : 'var(--bg-surface-2)',
              color: planFilter === p ? '#fff' : 'var(--text-secondary)',
              border: '1px solid', borderColor: planFilter === p ? 'var(--color-primary-500)' : 'var(--border-color)',
              cursor: 'pointer', fontSize: '0.75rem', transition: 'all var(--transition-fast)',
            }}>{p}</button>
          ))}
        </div>

        {/* Cards */}
        {filtered.map((user, i) => (
          <div key={user.id} style={{
            background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)', padding: '14px 16px',
            animation: `fadeIn 0.3s ease ${i * 40}ms both`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: avatarColor(user.avatar),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.72rem', fontWeight: 700, color: '#fff',
              }}>{user.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{user.name}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
              </div>
              <Badge color={statusBadge[user.status] ?? 'default'}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              <span>Plan: <strong style={{ color: 'var(--text-primary)' }}>{user.plan}</strong></span>
              <span>MRR: <strong style={{ color: 'var(--text-primary)' }}>{fmt(user.mrr, 'currency')}/mo</strong></span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Desktop table view
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { label: 'Total users', value: users.length },
          { label: 'Active',      value: users.filter(u => u.status === 'active').length },
          { label: 'On trial',    value: users.filter(u => u.status === 'trial').length  },
          { label: 'Churned',     value: users.filter(u => u.status === 'churned').length },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)', padding: '16px 18px',
            animation: `fadeIn 0.35s ease ${i * 60}ms both`,
          }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{s.label}</div>
            <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 600, marginTop: 4 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <Card title="All Users" subtitle={`${filtered.length} accounts`} delay={80} padding="0"
        action={
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
            borderRadius: 'var(--radius-md)', background: 'var(--color-primary-500)',
            color: '#fff', border: 'none', cursor: 'pointer', fontSize: 'var(--text-sm)', fontWeight: 500,
          }}>
            <UserPlus size={14} /> Add user
          </button>
        }
      >
        <div style={{ display: 'flex', gap: 10, padding: '14px 18px 12px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or email..."
              style={{ width: '100%', padding: '7px 12px 7px 30px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface-2)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)', outline: 'none' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary-400)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-color)')} />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['All', 'Enterprise', 'Pro', 'Starter'].map(p => (
              <button key={p} onClick={() => setPlanFilter(p)} style={{
                padding: '6px 12px', borderRadius: 'var(--radius-md)',
                background: planFilter === p ? 'var(--color-primary-500)' : 'var(--bg-surface-2)',
                color: planFilter === p ? '#fff' : 'var(--text-secondary)',
                border: '1px solid', borderColor: planFilter === p ? 'var(--color-primary-500)' : 'var(--border-color)',
                cursor: 'pointer', fontSize: 'var(--text-sm)', transition: 'all var(--transition-fast)',
              }}>{p}</button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface-2)' }}>
                <th style={thStyle} onClick={() => toggleSort('name')}><span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>User <SortIcon col="name" /></span></th>
                <th style={thStyle} onClick={() => toggleSort('plan')}><span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Plan <SortIcon col="plan" /></span></th>
                <th style={thStyle} onClick={() => toggleSort('mrr')}><span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>MRR <SortIcon col="mrr" /></span></th>
                <th style={thStyle} onClick={() => toggleSort('status')}><span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Status <SortIcon col="status" /></span></th>
                <th style={thStyle} onClick={() => toggleSort('joined')}><span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>Joined <SortIcon col="joined" /></span></th>
                <th style={{ ...thStyle, cursor: 'default' }} />
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user.id} style={{
                  borderBottom: '1px solid var(--border-color)',
                  cursor: 'pointer', transition: 'background var(--transition-fast)',
                  animation: `fadeIn 0.3s ease ${i * 40}ms both`,
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-surface-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '12px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                        background: avatarColor(user.avatar),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.68rem', fontWeight: 700, color: '#fff',
                      }}>{user.avatar}</div>
                      <div>
                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{user.name}</div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 12px' }}>
                    <Badge color={user.plan === 'Enterprise' ? 'primary' : user.plan === 'Pro' ? 'info' : 'default'}>
                      {user.plan}
                    </Badge>
                  </td>
                  <td style={{ padding: '12px 12px', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    {fmt(user.mrr, 'currency')}/mo
                  </td>
                  <td style={{ padding: '12px 12px' }}>
                    <Badge color={statusBadge[user.status] ?? 'default'}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </td>
                  <td style={{ padding: '12px 12px', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    {new Date(user.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '12px 12px' }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {[Mail, MoreHorizontal].map((Icon, idx) => (
                        <button key={idx} style={{
                          width: 27, height: 27, borderRadius: 6, border: '1px solid var(--border-color)',
                          background: 'var(--bg-surface-2)', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)',
                        }}>
                          <Icon size={12} />
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 18px', borderTop: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Showing {filtered.length} of {users.length} users
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3].map(p => (
              <button key={p} style={{
                width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border-color)',
                background: p === 1 ? 'var(--color-primary-500)' : 'var(--bg-surface-2)',
                color: p === 1 ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer', fontSize: 'var(--text-xs)',
              }}>{p}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
