export function fmt(value: number, type: 'currency' | 'number' | 'percent'): string {
  if (type === 'currency') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD', maximumFractionDigits: 0,
    }).format(value)
  }
  if (type === 'percent') return `${value.toFixed(1)}%`
  return new Intl.NumberFormat('en-US').format(value)
}

export function pctChange(current: number, prev: number): number {
  return parseFloat((((current - prev) / prev) * 100).toFixed(1))
}

export function clsx(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function avatarColor(initials: string): string {
  const colors = [
    '#6366f1','#a855f7','#06b6d4','#10b981',
    '#f59e0b','#ef4444','#3b82f6','#ec4899',
  ]
  const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % colors.length
  return colors[idx]
}
