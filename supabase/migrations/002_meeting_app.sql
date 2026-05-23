-- IAMA Meeting App — Personal Agenda
-- Iranian American Medical Association
--
-- Per-user "saved" sessions/talks for the PWA personal agenda.
-- Mirrors the conventions in 001_initial_schema.sql (RLS on, owner-scoped
-- policies via auth.uid()). When a user is signed in these rows are the source
-- of truth and sync across devices; signed-out users fall back to localStorage
-- on the client, so this table is purely additive and never required at runtime.

-- ============================================
-- SAVED AGENDA ITEMS
-- ============================================
create table public.saved_agenda_items (
  user_id uuid references public.profiles(id) on delete cascade not null,
  item_id text not null,
  item_type text not null check (item_type in ('session', 'talk')),
  created_at timestamptz default now(),
  primary key (user_id, item_id)
);

create index idx_saved_user on public.saved_agenda_items(user_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table public.saved_agenda_items enable row level security;

create policy "Users can view own saved items"
  on public.saved_agenda_items for select
  using (auth.uid() = user_id);

create policy "Users can insert own saved items"
  on public.saved_agenda_items for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own saved items"
  on public.saved_agenda_items for delete
  using (auth.uid() = user_id);
