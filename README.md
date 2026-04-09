# NexusAI Dashboard

**Version:** 1.0.0  
**Author:** NexusAI  
**License:** Envato Regular / Extended License  
**Demo:** [Live Preview →](https://nexusai-demo.vercel.app)  
**Support:** [Item Comments on Envato →](https://codecanyon.net)

---

## Table of Contents

1. [Introduction](#introduction)
2. [What's Included](#whats-included)
3. [Requirements](#requirements)
4. [Quick Start](#quick-start)
5. [Installation Guide](#installation-guide)
6. [Environment Variables](#environment-variables)
7. [AI API Integration Guide](#ai-api-integration-guide)
8. [Customization Guide](#customization-guide)
9. [Pages & Routes](#pages--routes)
10. [Component Reference](#component-reference)
11. [Theming System](#theming-system)
12. [Responsive Design](#responsive-design)
13. [Deployment Guide](#deployment-guide)
14. [Browser Support](#browser-support)
15. [Changelog](#changelog)
16. [Support](#support)

---

## Introduction

NexusAI is a premium SaaS admin dashboard built with **React 18**, **TypeScript**, and **Recharts**. It ships with a built-in AI Insights panel, 6 color themes, full dark/light mode, and a completely responsive layout — from 320px mobile to 4K widescreen.

It is designed to save 200+ hours of development time and to be connected directly to your real backend by changing a single environment variable.

---

## What's Included

```
nexusai-dashboard/
├── src/
│   ├── components/
│   │   ├── ai/             ← AI Insight Panel
│   │   ├── layout/         ← Sidebar, Topbar, AppLayout (responsive)
│   │   └── ui/             ← KpiCard, Card, Badge, ActivityFeed
│   ├── hooks/
│   │   └── useWindowWidth.ts
│   ├── lib/
│   │   ├── mockData.ts     ← All demo data in one file
│   │   └── utils.ts        ← Formatters, helpers
│   ├── pages/
│   │   ├── auth/           ← Login page
│   │   ├── dashboard/      ← Main dashboard
│   │   ├── analytics/      ← Charts & heatmap
│   │   ├── users/          ← User management table
│   │   ├── billing/        ← Invoices & revenue
│   │   └── settings/       ← Appearance, profile, notifications
│   ├── store/
│   │   └── ThemeStore.tsx  ← Dark mode + color theme context
│   └── styles/
│       └── tokens.css      ← Full design token system
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
├── LICENSE.txt
└── README.md               ← This file
```

---

## Requirements

| Requirement | Version      |
|-------------|--------------|
| Node.js     | 18 or higher |
| npm         | 9 or higher  |
| Browser     | See [Browser Support](#browser-support) |

---

## Quick Start

```bash
# 1. Unzip the package
unzip nexusai-dashboard-v1.0.0.zip
cd nexusai-dashboard

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env.local

# 4. Start development server
npm run dev
```

Open your browser at **http://localhost:5173**

**Demo login:** `admin@nexusai.com` — any password (click Sign in)

---

## Installation Guide

### Step 1 — Unzip

Extract the downloaded `.zip` file to a folder of your choice.

### Step 2 — Install dependencies

```bash
npm install
```

This installs all packages listed in `package.json`. No manual downloads required.

### Step 3 — Create your environment file

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values (see [Environment Variables](#environment-variables)).

### Step 4 — Run in development

```bash
npm run dev
```

### Step 5 — Build for production

```bash
npm run build
```

The production files are output to the `/dist` folder. Upload the contents of `/dist` to any static hosting provider.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
# ─── AI Integration (optional) ──────────────────────────────
# Your AI provider API key — used by the AI Insights panel.
# Supports: OpenAI, Anthropic, Google Gemini, or any OpenAI-compatible API.
VITE_AI_API_KEY=sk-...

# Which AI provider to use (openai | anthropic | gemini | custom)
VITE_AI_PROVIDER=openai

# Model name to use (e.g. gpt-4o, claude-3-5-sonnet-20241022, gemini-1.5-pro)
VITE_AI_MODEL=gpt-4o

# ─── Backend API (optional) ─────────────────────────────────
# Point to your real API to replace mock data.
# Leave empty to use the built-in mock data layer.
VITE_API_BASE_URL=https://api.yourapp.com

# ─── Mock data (development) ────────────────────────────────
# Set to false to disable the mock data layer and use VITE_API_BASE_URL instead.
VITE_USE_MOCK=true
```

> **Security:** Never commit `.env.local` to version control.
> Never use `VITE_AI_API_KEY` in production for user-facing apps — proxy the request through your own backend instead.

---

## AI API Integration Guide

The **AI Insights Panel** (`src/components/ai/AiInsightPanel.tsx`) displays AI-generated summaries, anomaly alerts, and forecasts. By default it shows static mock data. Here is how to connect it to a real AI API.

### Option A — OpenAI

1. Create an account at [platform.openai.com](https://platform.openai.com)
2. Generate an API key and add it to `.env.local`:
   ```env
   VITE_AI_API_KEY=sk-proj-...
   VITE_AI_PROVIDER=openai
   VITE_AI_MODEL=gpt-4o
   ```
3. Edit `src/components/ai/AiInsightPanel.tsx` and replace the static `aiInsights` import with the live fetch:

```tsx
// Replace static data with live API call
async function fetchInsights(data: object): Promise<Insight[]> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_AI_API_KEY}`,
    },
    body: JSON.stringify({
      model: import.meta.env.VITE_AI_MODEL ?? 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a SaaS analytics assistant. Analyze the provided metrics and return exactly 4 insights as a JSON array. Each insight must have: id (number), type ("opportunity"|"warning"|"forecast"|"info"), title (string, max 40 chars), body (string, max 120 chars).',
        },
        {
          role: 'user',
          content: `Analyze this SaaS metrics data: ${JSON.stringify(data)}`,
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 500,
    }),
  })
  const json = await res.json()
  const parsed = JSON.parse(json.choices[0].message.content)
  return parsed.insights ?? []
}
```

### Option B — Anthropic Claude

```tsx
async function fetchInsights(data: object): Promise<Insight[]> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_AI_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: import.meta.env.VITE_AI_MODEL ?? 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Analyze this SaaS data and return 4 insights as JSON:
            { "insights": [ { "id": 1, "type": "opportunity|warning|forecast|info", "title": "...", "body": "..." } ] }
            Data: ${JSON.stringify(data)}`,
        },
      ],
    }),
  })
  const json = await res.json()
  const parsed = JSON.parse(json.content[0].text)
  return parsed.insights ?? []
}
```

### Option C — Backend Proxy (Recommended for Production)

For production, never expose your API key in the browser. Instead, create a backend endpoint:

```tsx
// src/lib/api/ai.ts
export async function fetchAiInsights(metrics: object) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/insights`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ metrics }),
  })
  return res.json()
}
```

Your backend endpoint receives the request, calls the AI API using a server-side environment variable, and returns the formatted insights. This way your API key is never exposed to the browser.

### Passing Real Metrics to the AI

In `src/pages/dashboard/DashboardPage.tsx`, pass your real data:

```tsx
import { fetchAiInsights } from '@/lib/api/ai'

// Inside the component:
const insights = await fetchAiInsights({
  revenue: kpiData.revenue.value,
  users:   kpiData.users.value,
  churn:   kpiData.churnRate.value,
  mrr:     kpiData.mrr.value,
  // Add any other metrics you want analyzed
})
```

---

## Customization Guide

### Changing brand colors

All design tokens are in `src/styles/tokens.css`. To change the primary color:

```css
:root {
  --color-primary-500: #6366f1;  /* ← change this to your brand hex */
  --color-primary-600: #4f46e5;  /* darker shade — used for hover states */
  --color-primary-700: #4338ca;  /* darkest shade — used for active states */
}
```

### Switching themes programmatically

```tsx
import { useTheme } from '@/store/ThemeStore'

const { setColorTheme, setMode } = useTheme()

// Switch color theme
setColorTheme('forest')   // 'indigo' | 'arctic' | 'forest' | 'sunrise' | 'lavender'

// Switch dark/light mode
setMode('dark')           // 'light' | 'dark' | 'system'
```

### Adding a new page

1. Create the page file:
   ```
   src/pages/reports/ReportsPage.tsx
   ```

2. Add the route in `src/App.tsx`:
   ```tsx
   import { ReportsPage } from '@/pages/reports/ReportsPage'
   // Inside <Routes>:
   <Route path="/reports" element={<ReportsPage />} />
   ```

3. Add the nav item in `src/components/layout/Sidebar.tsx`:
   ```tsx
   import { FileText } from 'lucide-react'
   // Inside navItems array:
   { label: 'Reports', to: '/reports', icon: FileText },
   ```

### Replacing mock data with real API data

1. Set `VITE_USE_MOCK=false` in `.env.local`
2. Set `VITE_API_BASE_URL=https://your-api.com`
3. Create API functions in `src/lib/api/`:
   ```ts
   // src/lib/api/dashboard.ts
   export async function getKpiData() {
     const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/kpi`)
     return res.json()
   }
   ```
4. Replace the static import in each page:
   ```tsx
   // Before:
   import { kpiData } from '@/lib/mockData'
   // After:
   const kpiData = await getKpiData()
   ```

---

## Pages & Routes

| Page       | Route        | Description                                      |
|------------|--------------|--------------------------------------------------|
| Login      | `/login`     | Auth screen with OAuth buttons, form validation  |
| Dashboard  | `/dashboard` | KPI cards, revenue charts, AI insights, activity |
| Analytics  | `/analytics` | Growth lines, heatmap, radar, channel breakdown  |
| Users      | `/users`     | Sortable/filterable table, mobile card view      |
| Billing    | `/billing`   | Invoices table, revenue chart, payment method    |
| Settings   | `/settings`  | Theme picker, profile form, notifications, 2FA   |

---

## Component Reference

### `<KpiCard />`

```tsx
import { KpiCard } from '@/components/ui/KpiCard'

<KpiCard
  title="Monthly Revenue"
  value={84230}
  prev={74910}
  format="currency"       // 'currency' | 'number' | 'percent'
  icon={<DollarSign />}
  accentColor="#6366f1"   // optional — color of top border
  delay={0}               // optional — animation delay in ms
/>
```

### `<Card />`

```tsx
import { Card } from '@/components/ui/Card'

<Card
  title="Chart Title"
  subtitle="Optional subtitle"
  action={<button>Action</button>}   // optional — top right button
  padding="20px"                     // optional — inner padding
  delay={100}                        // optional — animation delay in ms
>
  {/* any content */}
</Card>
```

### `<Badge />`

```tsx
import { Badge } from '@/components/ui/Card'

<Badge color="success">Active</Badge>
// color: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary'
```

### `<AiInsightPanel />`

```tsx
import { AiInsightPanel } from '@/components/ai/AiInsightPanel'

// Drop-in panel — connect to real AI by editing the component
<AiInsightPanel />
```

---

## Theming System

NexusAI uses a CSS custom property (variable) based design token system defined in `src/styles/tokens.css`.

### Available color themes

| Theme    | Primary   | Accent    |
|----------|-----------|-----------|
| Indigo   | `#6366f1` | `#a855f7` |
| Arctic   | `#0ea5e9` | `#06b6d4` |
| Forest   | `#10b981` | `#34d399` |
| Sunrise  | `#f59e0b` | `#fb923c` |
| Lavender | `#a855f7` | `#e879f9` |

### Dark and light mode

The theme is applied via `data-theme` on the `<html>` element:
- `data-theme="dark"` — dark mode
- `data-theme="light"` — light mode

This is handled automatically by `ThemeStore.tsx`.

---

## Responsive Design

NexusAI is designed mobile-first and tested at the following breakpoints:

| Breakpoint | Width    | Layout                                       |
|------------|----------|----------------------------------------------|
| Mobile     | < 640px  | Single column, card views, hamburger menu    |
| Tablet     | 640–1024px | 2-column grids, sidebar on overlay          |
| Desktop    | > 1024px | Full sidebar, multi-column grids             |
| Wide       | > 1400px | Max-width content, generous padding          |

### Mobile-specific behaviors

- **Sidebar:** Hidden by default, slides in from the left on hamburger tap. Tap the overlay or ✕ to close. Automatically closes on navigation.
- **Users page:** Switches from a data table to stacked cards on mobile.
- **Charts:** Reduced height and simplified axes on small screens.
- **KPI grid:** 2 columns on mobile, 4 columns on desktop.
- **Analytics:** Radar chart hidden on mobile to save space.

---

## Deployment Guide

### Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Netlify

```bash
npm run build
# Drag and drop the /dist folder to app.netlify.com/drop
```

### Traditional hosting (Apache / Nginx)

```bash
npm run build
# Upload all contents of /dist to your web server's public folder
```

Add the following rewrite rule so React Router works correctly:

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## Browser Support

| Browser        | Version  |
|----------------|----------|
| Chrome         | 100+     |
| Firefox        | 100+     |
| Safari         | 15+      |
| Edge           | 100+     |
| iOS Safari     | 15+      |
| Chrome Android | 100+     |

---

## Changelog

### v1.0.0 — Initial Release

- 6 pages: Dashboard, Analytics, Users, Billing, Settings, Login
- 5 color themes: Indigo, Arctic, Forest, Sunrise, Lavender
- Full dark / light mode support
- Responsive layout: mobile (320px) to widescreen (2560px+)
- Mobile hamburger sidebar with slide animation
- Users page: desktop table + mobile card view
- AI Insights Panel with guide for OpenAI, Anthropic, and custom backends
- 8 chart types: Area, Bar, Line, Pie, Radar, Heatmap, and more
- KPI cards with trend indicators
- Activity feed
- Notification dropdown
- Searchable, sortable, filterable users table
- Invoices table with status badges
- Settings: theme switcher, profile form, notification toggles, security

---

## Support

**Support period:** 6 months from purchase date.

**How to get support:**
1. Read this documentation carefully.
2. Check the item's comments section on Envato for common issues.
3. Submit a support request via the **item comments tab** on Envato or via the author profile contact form.

**What is covered:**
- Bugs in the Item itself.
- Questions about how to use documented features.
- Help connecting to the AI API (OpenAI / Anthropic).

**What is NOT covered:**
- Custom feature development.
- Integration with third-party services not described in this documentation.
- Issues caused by modifying the source code.
- General React / TypeScript / JavaScript questions.

**Response time:** Within 24 hours on business days.

---

*Thank you for purchasing NexusAI Dashboard. We hope it helps you build something great.*
