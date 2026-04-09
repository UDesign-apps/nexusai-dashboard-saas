import { activityFeed } from '@/lib/mockData'

export function ActivityFeed() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {activityFeed.map((item, i) => (
        <div key={item.id} style={{
          display: 'flex', gap: 12, padding: '12px 0',
          borderBottom: i < activityFeed.length - 1 ? '1px solid var(--border-color)' : 'none',
          animation: `fadeIn 0.3s ease ${i * 60}ms both`,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10, flexShrink: 0,
            background: 'var(--bg-surface-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13,
          }}>
            {item.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 'var(--text-sm)', lineHeight: 1.4 }}>
              <span style={{ fontWeight: 600 }}>{item.user}</span>
              <span style={{ color: 'var(--text-secondary)' }}> {item.action}</span>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 2 }}>
              {item.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
