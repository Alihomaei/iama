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

The middleware tolerates missing Supabase env vars so the app still boots
locally without a configured backend.

## Project structure

```
src/
├── app/                      # App Router routes
│   ├── page.tsx              # Homepage (hero, stats, events, news, CTA, partners)
│   ├── about/ membership/ congress/ (register, schedule, speakers)
│   ├── events/ (annual-meeting)
│   ├── community/ (chapters/[slug], sections/[slug])
│   ├── opportunities/ (mentorship, travel-grant)
│   ├── donation/ news/ education/ directory/ advocacy/
│   ├── abstracts/ (submit, status)
│   ├── auth/ (login, signup, callback)
│   ├── dashboard/            # Member dashboard
│   ├── admin/                # Admin panel (members, abstracts, events, content, settings)
│   └── api/                  # Route handlers (abstracts, events, members, news, directory, stripe, paypal)
├── components/
│   ├── layout/               # navbar, footer, page-header
│   ├── sections/             # hero, stats, featured-events, latest-news, membership-cta, partners
│   └── ui/                   # button, input, textarea, select, tabs, card, badge
├── lib/
│   ├── supabase/             # client, server, middleware helpers
│   ├── stripe.ts paypal.ts email.ts utils.ts
│   └── chapters.ts sections.ts   # data for community chapter/section pages
├── types/database.ts
└── middleware.ts
public/
├── logo.png                  # official IAMA logo (used in the navbar)
└── images/hero-1-v2.jpg, hero-2.jpg   # homepage hero edge images
supabase/migrations/          # SQL schema
```

## Routes

- **Public:** `/`, `/about`, `/membership`, `/congress` (+ `register`, `schedule`, `speakers`), `/events` (+ `annual-meeting`), `/community` (+ `chapters/[slug]`, `sections/[slug]`), `/opportunities` (+ `mentorship`, `travel-grant`), `/donation`, `/news`, `/education`, `/directory`, `/advocacy`, `/abstracts/submit`, `/abstracts/status`
- **Auth:** `/auth/login`, `/auth/signup`, `/auth/callback`
- **Member:** `/dashboard`
- **Admin:** `/admin` (+ `members`, `abstracts`, `events`, `content`, `settings`)
- **API:** `/api/abstracts` (+ `[id]`, `[id]/review`), `/api/events` (+ `[slug]`), `/api/members` (+ `[id]`), `/api/news` (+ `[slug]`), `/api/directory`, `/api/stripe/checkout`, `/api/stripe/webhook`, `/api/paypal/create-order`, `/api/paypal/capture-order`

### Navigation

Primary nav: **About · Membership · Event ▾ · Community ▾ · Opportunities & Awards ▾ · News · Find a Doctor · Donation**. Community is a two-level menu — **Chapters** (Arizona, California, Massachusetts, New Jersey, New York, Ohio) and **Sections** (JAVAAN/Juniors, Psychiatry, SUSMA, Dental). The full horizontal nav shows at `xl` (≥1280px); below that it collapses to a hamburger with a nested accordion.

## Admin panel

`/admin` is gated by Supabase auth + a `profiles.admin_role` (super_admin,
content_editor, abstract_reviewer, event_manager). Sections:

- **Members / Abstracts / Events / Content** — manage records and submissions.
- **Settings** (`/admin/settings`) — non-structural site edits: organization
  info, homepage hero copy + button links, the four stat counters, hero
  carousel images, partner list, and social links.

> The Content and Settings editors currently use in-memory sample state — edits
> preview locally but are **not yet persisted**. Wire them to Supabase (e.g. a
> `site_settings` table) to make changes permanent.

## Database

Supabase Postgres. The schema lives in
`supabase/migrations/001_initial_schema.sql`. Tables: `profiles`, `memberships`,
`membership_pricing`, `congress_events`, `congress_pricing`, `registrations`,
`abstracts`, `speakers`, `congress_schedule`, `news_posts`,
`education_resources`, `payments`.

Apply it via the Supabase SQL editor or the Supabase CLI.

## Homepage hero

`src/components/sections/hero.tsx` shows a clean teal gradient behind the
centered title, with photos on the left/right edges that fade toward the center
(CSS masks). Images come from `public/images/hero-*.jpg` (left = speaker,
right = audience). The image carousel/rotation is currently **paused** (renders
statically). Original source photos are kept in `assests/` (untracked).

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

- **Real content:** copy and data across the homepage, `/about`, `/membership`,
  `/congress`, `/events` (+ `annual-meeting`), `/community/*`, `/opportunities/*`,
  `/news`, and `/donation` now reflect real IAMA information sourced from the
  legacy site (iama.org) — leadership, the 30th Annual Meeting (Kimpton Hotel
  Monaco, Washington, D.C., May 23–25, 2026), membership tiers, the four sections,
  and contact/social details. The `/about` page has an **"Our Team"** section with
  hover-reveal photo cards of the 12 Board of Directors (real headshots in
  `public/images/team/`). Chapter & section data live in `src/lib/chapters.ts`
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
