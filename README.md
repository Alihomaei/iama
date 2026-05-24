# IAMA — Iranian American Medical Association

The official website for the Iranian American Medical Association (IAMA), a
501(c)(3) non-profit, non-religious, non-political organization (founded 1993)
established for charitable and educational purposes. It provides membership,
an annual congress, abstract submission, educational resources, a member
directory, regional chapters and specialty sections, and an admin panel.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19) |
| Styling | Tailwind CSS v4 (theme tokens in `src/app/globals.css`) |
| Auth & DB | Supabase (Postgres + Auth, SSR via `@supabase/ssr`) |
| Payments | Stripe + PayPal |
| Email | Resend (transactional) |
| Icons | lucide-react |
| Analytics | Vercel Analytics |
| Meeting App | Installable PWA (Web App Manifest + service worker) with Web Push (`web-push` + VAPID) |
| Hosting | Vercel (production-only; push to `main` auto-deploys) |

> **Important:** This project pins Next.js 16, which has breaking changes vs.
> earlier versions (e.g. dynamic-route `params` is a `Promise` and must be
> awaited). See [`AGENTS.md`](./AGENTS.md) — read `node_modules/next/dist/docs/`
> before changing framework code.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local   # then fill in the values below

# 3. Run the dev server
npm run dev                        # http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm run start` (serve the
build), `npm run lint` (ESLint).

### Environment variables

All keys live in `.env.local` (see `.env.local.example`):

- **Supabase** — `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Stripe** — `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- **PayPal** — `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`
- **Resend** — `RESEND_API_KEY`
- **App** — `NEXT_PUBLIC_APP_URL`
- **Web Push (Meeting App)** — `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` (generate with `npx web-push generate-vapid-keys`), `CRON_SECRET` (authorizes the reminders cron)

The middleware tolerates missing Supabase env vars so the app still boots
locally without a configured backend.

## Project structure

```
src/
├── app/                      # App Router routes
│   ├── page.tsx              # Homepage (hero, stats, meeting-app CTA, events, news, CTA, partners)
│   ├── manifest.ts           # PWA Web App Manifest (start_url /app, installable)
│   ├── app/                  # 📱 Meeting App (PWA) — own chrome (top bar + bottom tabs)
│   │   ├── page.tsx          #   Today: live Now/Next, today's sessions, quick links
│   │   ├── schedule/         #   Full agenda — day tabs, track filter, search, Now/Next
│   │   ├── sessions/[id]/    #   Session detail (moderators, panel, talks)
│   │   ├── talks/[id]/       #   Individual talk detail (speaker, abstract)
│   │   ├── people/[id]/      #   Speaker/moderator/panelist directory + profiles
│   │   ├── my-agenda/        #   Saved sessions (local + Supabase sync), conflict flags
│   │   ├── info/             #   Venue, reminders (push toggle), add-to-home-screen help
│   │   ├── offline/          #   Offline fallback page
│   │   ├── actions.ts        #   Server actions for saved-agenda items
│   │   └── push-actions.ts   #   Server actions for Web Push subscriptions
│   ├── about/ membership/ congress/ (register, schedule, speakers)
│   ├── events/ (annual-meeting)
│   ├── community/ (chapters/[slug], sections/[slug])
│   ├── opportunities/ (mentorship, travel-grant)
│   ├── donation/ news/ education/ directory/ advocacy/
│   ├── abstracts/ (submit, status)
│   ├── auth/ (login, signup, callback)
│   ├── dashboard/            # Member dashboard
│   ├── admin/                # Admin panel (members, abstracts, events, content, settings)
│   └── api/                  # Route handlers (abstracts, events, members, news, directory, stripe, paypal, app/reminders)
├── components/
│   ├── layout/               # navbar, footer, page-header
│   ├── sections/             # hero, stats, meeting-app-cta, featured-events, latest-news, membership-cta, partners
│   ├── app/                  # Meeting-app UI: app-nav, session-card, talk-row, person-avatar,
│   │   │                     #   track-chip, now-next-banner, day-tabs, search-bar, save-button,
│   │   │                     #   notify-toggle, pwa-register, use-saved-items
│   └── ui/                   # button, input, textarea, select, tabs, card, badge
├── lib/
│   ├── agenda/               # 📱 Meeting App content model + selectors (types, data, index)
│   ├── supabase/             # client, server, middleware helpers
│   ├── stripe.ts paypal.ts email.ts utils.ts
│   └── chapters.ts sections.ts   # data for community chapter/section pages
├── types/database.ts
└── middleware.ts
public/
├── logo.png                  # official IAMA logo, opaque (used in the navbar)
├── logo-transparent.png      # transparent logo (auth pages + footer, on white plaques over dark)
├── seal.png                  # circular IAMA seal cropped from logo.png — source for favicon + PWA icons
├── sw.js                     # service worker (offline cache + Web Push handlers)
├── icon-192.png icon-512.png icon-maskable-512.png apple-touch-icon.png  # PWA icons (seal on teal)
└── images/                   # hero-1-v2.jpg, hero-2.jpg (homepage edges); events/ (2026 poster); news/; team/ (board headshots)
src/app/favicon.ico           # browser favicon — transparent circular seal (generated)
scripts/gen-icons.mjs         # regenerates seal.png, PWA icons (seal on teal) + favicon.ico (sharp + ImageMagick)
supabase/migrations/          # SQL schema (001 base, 002 saved-agenda, 003 push)
```

## Routes

- **Public:** `/`, `/about`, `/membership`, `/congress` (+ `register`, `schedule`, `speakers`), `/events` (+ `annual-meeting`), `/community` (+ `chapters/[slug]`, `sections/[slug]`), `/opportunities` (+ `mentorship`, `travel-grant`), `/donation`, `/news`, `/education`, `/directory`, `/advocacy`, `/abstracts/submit`, `/abstracts/status`
- **Meeting App (PWA):** `/app` (Today), `/app/schedule`, `/app/sessions/[id]`, `/app/talks/[id]`, `/app/people` (+ `[id]`), `/app/my-agenda`, `/app/info`, `/app/offline`
- **Auth:** `/auth/login`, `/auth/signup`, `/auth/callback`
- **Member:** `/dashboard`
- **Admin:** `/admin` (+ `members`, `abstracts`, `events`, `content`, `settings`)
- **API:** `/api/abstracts` (+ `[id]`, `[id]/review`), `/api/events` (+ `[slug]`), `/api/members` (+ `[id]`), `/api/news` (+ `[slug]`), `/api/directory`, `/api/stripe/checkout`, `/api/stripe/webhook`, `/api/paypal/create-order`, `/api/paypal/capture-order`, `/api/app/reminders` (Web Push cron)

### Navigation

Primary nav: **About · Membership · Event ▾ · Community ▾ · Opportunities & Awards ▾ · News · Find a Doctor · Donation**. Community is a two-level menu — **Chapters** (Arizona, California, Massachusetts, New Jersey, New York, Ohio) and **Sections** (JAVAAN/Juniors, Psychiatry, SUSMA, Dental). The full horizontal nav shows at `xl` (≥1280px); below that it collapses to a hamburger with a nested accordion.

## Admin panel

> ⚠️ **Temporary access — backend not connected yet.** Production is **not wired
> to Supabase** (the Vercel project has no env vars, so the client falls back to
> `https://placeholder.supabase.co` and real auth cannot run). As a stopgap,
> `/admin` is gated by a **hardcoded passphrase** instead of Supabase auth:
>
> - **URL:** `/admin` · **Passphrase:** `iama-admin-2026`
> - Implemented in `src/app/admin/layout.tsx` via `const ADMIN_BYPASS = true`
>   (it injects a mock `super_admin` profile). This is a **client-side gate
>   only** — the passphrase ships in the JS bundle, so it's a speed bump, not
>   real security. Acceptable only because every admin page renders local sample
>   data (no real records exist behind it).
>
> **To restore real auth and remove the bypass (once Supabase exists):**
> 1. Create a Supabase project (or add the Vercel ↔ Supabase Marketplace integration).
> 2. Apply `supabase/migrations/001_initial_schema.sql` (Supabase SQL editor or CLI).
> 3. Set the env vars in Vercel — `NEXT_PUBLIC_SUPABASE_URL`,
>    `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — then **redeploy**
>    (the `NEXT_PUBLIC_*` values only bake in on a fresh build).
> 4. Create your account (sign up at `/auth/signup`, or add a user in Supabase
>    Auth) and grant it the role:
>    `update public.profiles set admin_role='super_admin' where email='ali.homaei2012@gmail.com';`
> 5. In `src/app/admin/layout.tsx`, set `ADMIN_BYPASS = false` and delete the
>    bypass block.

Once Supabase is connected, `/admin` is gated by Supabase auth + a
`profiles.admin_role` (super_admin, content_editor, abstract_reviewer,
event_manager). Sections:

- **Members / Abstracts / Events / Content** — manage records and submissions.
- **Settings** (`/admin/settings`) — non-structural site edits: organization
  info, homepage hero copy + button links, the four stat counters, hero
  carousel images, partner list, and social links.

> The Content and Settings editors currently use in-memory sample state — edits
> preview locally but are **not yet persisted**. Wire them to Supabase (e.g. a
> `site_settings` table) to make changes permanent.

## Database

Supabase Postgres. The base schema lives in
`supabase/migrations/001_initial_schema.sql`. Tables: `profiles`, `memberships`,
`membership_pricing`, `congress_events`, `congress_pricing`, `registrations`,
`abstracts`, `speakers`, `congress_schedule`, `news_posts`,
`education_resources`, `payments`. Two follow-up migrations support the Meeting
App: `002_meeting_app.sql` (`saved_agenda_items`) and `003_push.sql`
(`push_subscriptions`, `sent_reminders`) — all with row-level security scoped to
the owning user.

Apply them via the Supabase SQL editor or the Supabase CLI.

## Homepage hero

`src/components/sections/hero.tsx` shows a clean teal gradient behind the
centered title, with photos on the left/right edges that fade toward the center
(CSS masks). Images come from `public/images/hero-*.jpg` (left = speaker,
right = audience). The image carousel/rotation is currently **paused** (renders
statically). Original source photos are kept in `assests/` (untracked).

## Meeting App (PWA)

`/app` is an installable, mobile-first **conference companion** for the 30th
Annual Meeting (Kimpton Hotel Monaco, Washington, D.C., **May 22–25, 2026**). It
has its own app chrome (top bar + 5-tab bottom nav: Today · Schedule · Saved ·
Speakers · Info) and is **installable to the home screen** ("Add to Home
Screen") via `src/app/manifest.ts` + `public/sw.js`.

- **Content model:** the entire real agenda lives as typed static data in
  `src/lib/agenda/` (`types.ts`, `data.ts`, `index.ts`) — 4 days, 21 sessions,
  46 talks, 61 people. Three addressable tiers: a **session** (e.g. the
  Cardiovascular Panel), its individual **talks** (each with its own page), and
  each **person** (oral/poster presenter, moderator, or panelist) with a profile
  listing all their roles. Selectors (`getSessionsByDay`, `getNowAndNext`,
  `getSessionsForPerson`, `searchAgenda`, …) are pure and offline-friendly.
  Times are stored as venue-local wall-clock and resolved at EDT (UTC−4), so the
  **Now/Next** indicator is correct on any device. `/congress/schedule` also
  renders from this module (no more placeholder data).
- **Personal agenda (save):** the star button (`save-button.tsx` +
  `use-saved-items.ts`) is **offline-first** — it saves to `localStorage` so it
  works today even with no backend, and **syncs to Supabase** (table
  `saved_agenda_items`) when the user is signed in (email + password), merging
  local picks up on first login. `/app/my-agenda` groups saves by day and flags
  time **conflicts**.
- **Notifications:** Web Push via `web-push` + VAPID. Users subscribe from
  `/app/info`; subscriptions persist in `push_subscriptions`. The cron route
  `GET /api/app/reminders` (authorized by `CRON_SECRET`, scheduled in
  `vercel.json`) is meant to push a reminder ~10–20 min before a saved session
  — that timing needs Pro's per-minute cron; the daily Hobby cron (see below)
  only fires once a day.
- **Install / offline:** `pwa-register.tsx` registers the service worker and
  shows an install hint (Android/desktop button; iOS "Share → Add to Home
  Screen"). Visited pages are cached; unknown routes fall back to `/app/offline`.

**To enable saving-sync and push (needs Supabase + keys):**
1. Connect Supabase (see **Admin panel** above) and apply
   `supabase/migrations/002_meeting_app.sql` and `003_push.sql`.
2. Generate keys: `npx web-push generate-vapid-keys`; set
   `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, and a `CRON_SECRET` in
   Vercel, then redeploy.
3. The reminders cron is set to daily (`0 12 * * *`) so it deploys on **Hobby** —
   Hobby rejects sub-daily crons at build time (it blocks the whole deployment).
   For 5-min reminders, upgrade to Pro and change `vercel.json` back to
   `*/5 * * * *`. On any plan the route also works when called manually with the
   `CRON_SECRET`.

Until then, the schedule, sessions, talks, speakers, install, and **on-device**
saving all work; only cross-device sync and push require the backend.

For local PWA/push testing over HTTPS: `npx next dev --experimental-https`.

## Deployment

The GitHub repo is connected to Vercel. **Pushing to `main` automatically
deploys to production** (production-only; no preview deploys). Live at
`https://iama-fawn.vercel.app`. No manual `vercel deploy` is needed.

```bash
git add -A && git commit -m "…" && git push origin main   # triggers prod deploy
```

A custom domain has been purchased but is not yet attached to the Vercel
project.

## Status / TODO

- **⚠️ Backend not connected (highest priority):** production has **no Supabase
  project / env vars**, so auth, signup/login, the member dashboard, payments,
  and persisted admin data don't function on the live site. `/admin` is reachable
  only via a **temporary hardcoded passphrase** (`iama-admin-2026`,
  `ADMIN_BYPASS` in `src/app/admin/layout.tsx`). See **Admin panel** above for
  the full steps to connect Supabase and remove the bypass.
- **Meeting App (PWA) — shipped:** `/app` is live with the real 30th Annual
  Meeting agenda (schedule, sessions, talks, speaker profiles), a personal
  "save" agenda (on-device now; Supabase-synced once the backend is connected),
  installability, and Web Push reminders (needs VAPID keys + cron + Supabase to
  fully activate — see **Meeting App (PWA)** above). `/congress/schedule` now
  renders the real agenda from `src/lib/agenda`.
- **Real content:** copy and data across the homepage, `/about`, `/membership`,
  `/congress`, `/events` (+ `annual-meeting`), `/community/*`, `/opportunities/*`,
  `/news`, and `/donation` now reflect real IAMA information sourced from the
  legacy site (iama.org) — leadership, the 30th Annual Meeting (Kimpton Hotel
  Monaco, Washington, D.C., May 23–25, 2026), membership tiers, the four sections,
  and contact/social details. The `/about` page has an **"Our Team"** section with
  hover-reveal photo cards of the 12 Board of Directors (real headshots in
  `public/images/team/`). The `/events/annual-meeting` page shows the official
  2026 event poster (`public/images/events/annual-meeting-2026-poster.png`,
  sourced from iama.org). Chapter & section data live in `src/lib/chapters.ts`
  and `src/lib/sections.ts`; news card photos live in `public/images/news/`.
- **Still illustrative / needs real data:** the `/education` CME catalog (the
  legacy site is "Coming Soon"); per-chapter member counts and the chairs for the
  Massachusetts, New Jersey, New York, and Ohio chapters (legacy site lists only
  Arizona & California presidents); the homepage **Partners/affiliates** list; and
  the program timelines / award tiers on `/opportunities/mentorship` and
  `/opportunities/travel-grant`.
- **News detail pages:** `/news/[slug]` article pages are not built yet, so the
  "Read more" links currently have no destination.
- **Admin persistence:** wire `/admin/settings` and `/admin/content` to Supabase.
- **Donation:** the real PayPal giving link and check-by-mail address are wired;
  the per-tier "Donate" buttons are still UI-only (connect to Stripe/PayPal).
