-- IAMA Database Schema
-- Iranian American Medical Association

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- PROFILES (extends Supabase auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  first_name text,
  last_name text,
  avatar_url text,
  phone text,
  specialty text,
  institution text,
  city text,
  state text,
  country text,
  bio text,
  is_public_directory boolean default false,
  admin_role text check (admin_role in ('super_admin', 'content_editor', 'abstract_reviewer', 'event_manager')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- MEMBERSHIPS
-- ============================================
create table public.memberships (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  tier text not null check (tier in ('fellow', 'associate', 'student', 'international', 'faculty')),
  status text not null default 'pending' check (status in ('pending', 'active', 'expired', 'cancelled')),
  starts_at timestamptz not null default now(),
  expires_at timestamptz not null,
  auto_renew boolean default false,
  payment_id text,
  created_at timestamptz default now()
);

create index idx_memberships_user on public.memberships(user_id);
create index idx_memberships_status on public.memberships(status);

-- ============================================
-- MEMBERSHIP PRICING
-- ============================================
create table public.membership_pricing (
  id uuid default uuid_generate_v4() primary key,
  tier text not null unique check (tier in ('fellow', 'associate', 'student', 'international', 'faculty')),
  annual_price integer not null, -- in cents
  description text,
  benefits jsonb default '[]'::jsonb
);

-- Seed membership pricing
insert into public.membership_pricing (tier, annual_price, description, benefits) values
  ('fellow', 50000, 'Full membership for board-certified physicians', '["Voting rights", "Congress discount", "Full journal access", "Committee eligibility", "Directory listing"]'::jsonb),
  ('faculty', 40000, 'For academic faculty members', '["Congress discount", "Full journal access", "Education resources", "Directory listing"]'::jsonb),
  ('associate', 25000, 'For residents and fellows-in-training', '["Congress discount", "Journal access", "Mentorship program", "Directory listing"]'::jsonb),
  ('international', 30000, 'For physicians outside the US', '["Congress discount", "Journal access", "Virtual event access", "Directory listing"]'::jsonb),
  ('student', 5000, 'For medical students', '["Congress discount", "Education resources", "Mentorship program"]'::jsonb);

-- ============================================
-- CONGRESS EVENTS
-- ============================================
create table public.congress_events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text,
  location text,
  venue text,
  start_date date not null,
  end_date date not null,
  early_bird_deadline timestamptz,
  regular_deadline timestamptz,
  abstract_deadline timestamptz,
  is_active boolean default true,
  banner_url text,
  created_at timestamptz default now()
);

-- ============================================
-- CONGRESS PRICING
-- ============================================
create table public.congress_pricing (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references public.congress_events(id) on delete cascade not null,
  category text not null check (category in ('physician', 'resident', 'student', 'virtual')),
  tier text not null check (tier in ('early_bird', 'regular', 'late')),
  price integer not null, -- in cents
  member_price integer not null, -- in cents
  unique(event_id, category, tier)
);

-- ============================================
-- REGISTRATIONS
-- ============================================
create table public.registrations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  event_id uuid references public.congress_events(id) on delete cascade not null,
  category text not null check (category in ('physician', 'resident', 'student', 'virtual')),
  pricing_tier text not null check (pricing_tier in ('early_bird', 'regular', 'late')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'completed', 'failed', 'refunded')),
  payment_provider text check (payment_provider in ('stripe', 'paypal')),
  payment_id text,
  amount_paid integer not null default 0,
  is_member_rate boolean default false,
  created_at timestamptz default now(),
  unique(user_id, event_id)
);

create index idx_registrations_event on public.registrations(event_id);
create index idx_registrations_user on public.registrations(user_id);

-- ============================================
-- ABSTRACTS
-- ============================================
create table public.abstracts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  event_id uuid references public.congress_events(id) on delete cascade not null,
  title text not null,
  authors jsonb not null default '[]'::jsonb,
  body_background text,
  body_methods text,
  body_results text,
  body_conclusion text,
  keywords text[] default '{}',
  category text,
  conflict_of_interest text,
  status text not null default 'draft' check (status in ('draft', 'submitted', 'under_review', 'accepted', 'rejected', 'revision_requested')),
  reviewer_id uuid references public.profiles(id),
  reviewer_comments text,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_abstracts_user on public.abstracts(user_id);
create index idx_abstracts_event on public.abstracts(event_id);
create index idx_abstracts_status on public.abstracts(status);
create index idx_abstracts_reviewer on public.abstracts(reviewer_id);

-- ============================================
-- SPEAKERS
-- ============================================
create table public.speakers (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references public.congress_events(id) on delete cascade not null,
  name text not null,
  title text,
  institution text,
  bio text,
  photo_url text,
  sessions jsonb default '[]'::jsonb,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- ============================================
-- CONGRESS SCHEDULE
-- ============================================
create table public.congress_schedule (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references public.congress_events(id) on delete cascade not null,
  day_date date not null,
  track text,
  start_time time not null,
  end_time time not null,
  title text not null,
  description text,
  speaker_ids uuid[] default '{}',
  location text,
  sort_order integer default 0
);

create index idx_schedule_event on public.congress_schedule(event_id);

-- ============================================
-- NEWS / BLOG
-- ============================================
create table public.news_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  author_id uuid references public.profiles(id),
  cover_image_url text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_news_published on public.news_posts(published, published_at desc);

-- ============================================
-- EDUCATION RESOURCES
-- ============================================
create table public.education_resources (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text,
  content text,
  type text not null check (type in ('cme', 'webinar', 'article', 'guideline')),
  cover_image_url text,
  published boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- PAYMENTS LOG
-- ============================================
create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  provider text not null check (provider in ('stripe', 'paypal')),
  provider_payment_id text not null,
  amount integer not null,
  currency text default 'usd',
  status text not null check (status in ('pending', 'completed', 'failed', 'refunded')),
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index idx_payments_user on public.payments(user_id);
create index idx_payments_provider on public.payments(provider, provider_payment_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Profiles: users can read public profiles, update own
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (is_public_directory = true);

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Memberships: users can see own
alter table public.memberships enable row level security;

create policy "Users can view own memberships"
  on public.memberships for select
  using (auth.uid() = user_id);

-- Membership pricing: public read
alter table public.membership_pricing enable row level security;

create policy "Membership pricing is public"
  on public.membership_pricing for select
  using (true);

-- Congress events: public read
alter table public.congress_events enable row level security;

create policy "Congress events are public"
  on public.congress_events for select
  using (true);

-- Congress pricing: public read
alter table public.congress_pricing enable row level security;

create policy "Congress pricing is public"
  on public.congress_pricing for select
  using (true);

-- Registrations: users see own
alter table public.registrations enable row level security;

create policy "Users can view own registrations"
  on public.registrations for select
  using (auth.uid() = user_id);

create policy "Users can insert own registrations"
  on public.registrations for insert
  with check (auth.uid() = user_id);

-- Abstracts: users see own, reviewers see assigned
alter table public.abstracts enable row level security;

create policy "Users can view own abstracts"
  on public.abstracts for select
  using (auth.uid() = user_id);

create policy "Users can insert own abstracts"
  on public.abstracts for insert
  with check (auth.uid() = user_id);

create policy "Users can update own draft abstracts"
  on public.abstracts for update
  using (auth.uid() = user_id and status in ('draft', 'revision_requested'));

create policy "Reviewers can view assigned abstracts"
  on public.abstracts for select
  using (auth.uid() = reviewer_id);

-- Speakers: public read
alter table public.speakers enable row level security;

create policy "Speakers are public"
  on public.speakers for select
  using (true);

-- Schedule: public read
alter table public.congress_schedule enable row level security;

create policy "Schedule is public"
  on public.congress_schedule for select
  using (true);

-- News: public read published
alter table public.news_posts enable row level security;

create policy "Published news is public"
  on public.news_posts for select
  using (published = true);

-- Education: public read published
alter table public.education_resources enable row level security;

create policy "Published education resources are public"
  on public.education_resources for select
  using (published = true);

-- Payments: users see own
alter table public.payments enable row level security;

create policy "Users can view own payments"
  on public.payments for select
  using (auth.uid() = user_id);

-- ============================================
-- ADMIN POLICIES (using admin_role from profiles)
-- ============================================

-- Helper function to check admin role
create or replace function public.is_admin(required_role text default null)
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
    and (
      admin_role = 'super_admin'
      or (required_role is not null and admin_role = required_role)
    )
  );
$$ language sql security definer;

-- Super admin can do everything
create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());

create policy "Admins can update all profiles"
  on public.profiles for update
  using (public.is_admin());

create policy "Admins can manage memberships"
  on public.memberships for all
  using (public.is_admin());

create policy "Admins can manage congress events"
  on public.congress_events for all
  using (public.is_admin() or public.is_admin('event_manager'));

create policy "Admins can manage congress pricing"
  on public.congress_pricing for all
  using (public.is_admin() or public.is_admin('event_manager'));

create policy "Admins can view all registrations"
  on public.registrations for select
  using (public.is_admin() or public.is_admin('event_manager'));

create policy "Admins can manage abstracts"
  on public.abstracts for all
  using (public.is_admin() or public.is_admin('abstract_reviewer'));

create policy "Admins can manage speakers"
  on public.speakers for all
  using (public.is_admin() or public.is_admin('event_manager'));

create policy "Admins can manage schedule"
  on public.congress_schedule for all
  using (public.is_admin() or public.is_admin('event_manager'));

create policy "Admins can manage news"
  on public.news_posts for all
  using (public.is_admin() or public.is_admin('content_editor'));

create policy "Admins can manage education"
  on public.education_resources for all
  using (public.is_admin() or public.is_admin('content_editor'));

create policy "Admins can view all payments"
  on public.payments for select
  using (public.is_admin());

-- Updated at trigger
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger update_abstracts_updated_at
  before update on public.abstracts
  for each row execute function public.update_updated_at();

create trigger update_news_updated_at
  before update on public.news_posts
  for each row execute function public.update_updated_at();
