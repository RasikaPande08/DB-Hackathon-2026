# DB Smart Assistant

A premium, responsive React dashboard for Deutsche Bank employees. It aggregates actions from internal systems (ITRA, Compliance, Trainings) into a personalized **Daily Action Summary** with AI-style briefing, training tracker, trading declarations, transaction monitoring, notifications, and analytics.

## Tech stack

- **React 19** + **TypeScript** (Vite)
- **Tailwind CSS v4**
- **Framer Motion** — page and card animations
- **Recharts** — analytics charts
- **Lucide React** — icons
- Light / dark theme with persistence

## Getting started

```bash
cd Projects/db-smart-assistant
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

```bash
npm run build   # production build
npm run preview # preview production build
```

## Project structure

```
src/
  api/mockData.ts       # Mock JSON + fetchDashboardData() API
  components/
    dashboard/          # Feature modules (Daily Prompt, Training, ITRA, etc.)
    layout/             # Sidebar, Header
    ui/                 # GlassCard, badges, loading, progress ring
  context/ThemeContext.tsx
  hooks/useDashboardData.ts
  types/index.ts
  App.tsx
  main.tsx
  index.css
```

## Mock API

`fetchDashboardData()` in `src/api/mockData.ts` simulates ~1.2s latency and returns a full `DashboardData` payload for employee **Rasika**. Replace these functions with real backend calls when integrating ITRA, LMS, and compliance services.

## Features

- AI Daily Prompt (first visible block after load)
- Daily Briefing + upcoming deadlines
- Training tracker with progress and countdown
- ITRA trading declaration module
- Transaction cards with severity
- AI insights (priority-sorted)
- Notification center by priority
- Animated analytics (trainings, declarations, compliance, productivity, transactions)
- Collapsible mobile sidebar, theme toggle, scroll-spy navigation

## Design

Corporate Deutsche Bank palette (deep blue `#0018A8`, gold accents), glassmorphism panels, Inter typography, and motion aligned with enterprise dashboards (Stripe / Copilot-style clarity).

---

Internal prototype — not an official Deutsche Bank product.
