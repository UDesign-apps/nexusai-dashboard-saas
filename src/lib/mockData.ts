// ── NexusAI Mock Data ──────────────────────────────────────

export const kpiData = {
  revenue:    { value: 84_230, prev: 74_910, format: 'currency' as const },
  users:      { value: 3_847,  prev: 3_556,  format: 'number' as const   },
  churnRate:  { value: 2.4,    prev: 3.1,    format: 'percent' as const  },
  mrr:        { value: 14_820, prev: 13_200, format: 'currency' as const },
  uptime:     { value: 99.97,  prev: 99.91,  format: 'percent' as const  },
  tickets:    { value: 12,     prev: 28,     format: 'number' as const   },
}

export const revenueWeekly = [
  { day: 'Mon', revenue: 9_420, users: 420 },
  { day: 'Tue', revenue: 11_100, users: 511 },
  { day: 'Wed', revenue: 8_750, users: 392 },
  { day: 'Thu', revenue: 13_200, users: 601 },
  { day: 'Fri', revenue: 12_400, users: 558 },
  { day: 'Sat', revenue: 7_100, users: 310 },
  { day: 'Sun', revenue: 6_800, users: 289 },
]

export const revenueMonthly = [
  { month: 'Jan', revenue: 58_200, target: 60_000 },
  { month: 'Feb', revenue: 62_400, target: 65_000 },
  { month: 'Mar', revenue: 59_800, target: 65_000 },
  { month: 'Apr', revenue: 71_200, target: 72_000 },
  { month: 'May', revenue: 68_900, target: 72_000 },
  { month: 'Jun', revenue: 75_400, target: 78_000 },
  { month: 'Jul', revenue: 79_100, target: 80_000 },
  { month: 'Aug', revenue: 84_230, target: 82_000 },
]

export const planDistribution = [
  { name: 'Enterprise', value: 38, color: '#6366f1' },
  { name: 'Pro',        value: 41, color: '#a855f7' },
  { name: 'Starter',    value: 21, color: '#06b6d4' },
]

export const users = [
  { id: '1', name: 'Aria Systems',    email: 'ops@aria.io',       plan: 'Enterprise', mrr: 2_400, status: 'active',   joined: '2023-04-12', avatar: 'AS' },
  { id: '2', name: 'ByteLoop Inc',    email: 'dev@byteloop.co',   plan: 'Pro',        mrr: 240,   status: 'active',   joined: '2023-08-29', avatar: 'BL' },
  { id: '3', name: 'Cova Design',     email: 'hello@covadesign.studio', plan: 'Starter', mrr: 49, status: 'trial',   joined: '2024-01-05', avatar: 'CD' },
  { id: '4', name: 'DriftWave Co',    email: 'finance@driftwave.com',   plan: 'Pro',   mrr: 240,   status: 'paused',  joined: '2023-06-17', avatar: 'DW' },
  { id: '5', name: 'Ember Analytics', email: 'team@emberanalytics.ai',  plan: 'Enterprise', mrr: 2_400, status: 'active', joined: '2022-11-03', avatar: 'EA' },
  { id: '6', name: 'Flux Studio',     email: 'hi@fluxstudio.design',    plan: 'Starter', mrr: 49, status: 'active',  joined: '2024-03-22', avatar: 'FS' },
  { id: '7', name: 'Grid Systems',    email: 'billing@gridsys.com',     plan: 'Pro',   mrr: 240,   status: 'active',  joined: '2023-09-14', avatar: 'GS' },
  { id: '8', name: 'Halo Platform',   email: 'admin@haloplatform.io',   plan: 'Enterprise', mrr: 2_400, status: 'churned', joined: '2022-07-30', avatar: 'HP' },
]

export const invoices = [
  { id: 'INV-0091', customer: 'Aria Systems',    amount: 2_400, date: '2024-08-01', status: 'paid'    },
  { id: 'INV-0090', customer: 'ByteLoop Inc',     amount: 240,   date: '2024-08-01', status: 'paid'    },
  { id: 'INV-0089', customer: 'Ember Analytics',  amount: 2_400, date: '2024-08-01', status: 'paid'    },
  { id: 'INV-0088', customer: 'Cova Design',      amount: 49,    date: '2024-07-28', status: 'pending' },
  { id: 'INV-0087', customer: 'DriftWave Co',     amount: 240,   date: '2024-07-01', status: 'overdue' },
  { id: 'INV-0086', customer: 'Grid Systems',     amount: 240,   date: '2024-07-01', status: 'paid'    },
]

export const aiInsights = [
  { id: 1, type: 'opportunity', title: 'Revenue spike detected',   body: 'Tuesday revenue was 18% above 30-day average. Channel: organic search.' },
  { id: 2, type: 'warning',     title: 'Churn risk: 23 accounts', body: 'Accounts showing low activity for 14+ days. Recommend automated outreach.' },
  { id: 3, type: 'forecast',    title: 'Next month projection',   body: 'MRR forecast: $91,400 ± $3,200 based on current growth trajectory.' },
  { id: 4, type: 'info',        title: 'Top channel: organic',    body: '41% of new signups this week arrived via organic search — up from 29% last month.' },
]

export const activityFeed = [
  { id: 1, user: 'Aria Systems',    action: 'upgraded to Enterprise', time: '2 min ago',  icon: '⬆' },
  { id: 2, user: 'Cova Design',     action: 'started a trial',        time: '14 min ago', icon: '✦' },
  { id: 3, user: 'Grid Systems',    action: 'paid invoice INV-0086',  time: '1 hr ago',   icon: '✓' },
  { id: 4, user: 'DriftWave Co',    action: 'paused subscription',    time: '3 hr ago',   icon: '⏸' },
  { id: 5, user: 'Flux Studio',     action: 'opened support ticket',  time: '5 hr ago',   icon: '◎' },
]

export const topPages = [
  { page: '/app/dashboard', views: 18_420, bounce: '24%' },
  { page: '/app/analytics',  views: 9_210,  bounce: '31%' },
  { page: '/app/users',      views: 6_800,  bounce: '18%' },
  { page: '/app/billing',    views: 4_320,  bounce: '12%' },
  { page: '/app/settings',   views: 2_140,  bounce: '29%' },
]
