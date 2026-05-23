-- IAMA Meeting App — Push Subscriptions & Sent Reminders
-- Iranian American Medical Association
--
-- Stores per-user web-push subscriptions for the PWA reminder system.
-- Cron job reads saved_agenda_items (002) and fires push notifications for
-- items starting in the next 10–20 min. sent_reminders deduplicates so each
-- (subscription, item) pair is only notified once.
--
-- RLS style matches 001_initial_schema.sql and 002_meeting_app.sql:
--   - push_subscriptions: owner-scoped CRUD via auth.uid() = user_id
--   - sent_reminders: locked down (service role only, no client policies)

-- ============================================
-- PUSH SUBSCRIPTIONS
-- ============================================
create table public.push_subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  user_agent text,
  created_at timestamptz default now()
);

create index idx_push_subscriptions_user on public.push_subscriptions(user_id);

-- ============================================
-- SENT REMINDERS (dedup log, service-role only)
-- ============================================
create table public.sent_reminders (
  subscription_id uuid references public.push_subscriptions(id) on delete cascade,
  item_id text not null,
  sent_at timestamptz default now(),
  primary key (subscription_id, item_id)
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- push_subscriptions: owner-scoped insert / select / delete
alter table public.push_subscriptions enable row level security;

create policy "Users can insert own push subscriptions"
  on public.push_subscriptions for insert
  with check (auth.uid() = user_id);

create policy "Users can view own push subscriptions"
  on public.push_subscriptions for select
  using (auth.uid() = user_id);

create policy "Users can delete own push subscriptions"
  on public.push_subscriptions for delete
  using (auth.uid() = user_id);

-- sent_reminders: RLS enabled, no permissive policies → only service role can access
alter table public.sent_reminders enable row level security;
-- (intentionally no policies — service role bypasses RLS)
