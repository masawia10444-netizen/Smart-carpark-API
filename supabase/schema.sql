-- Smart Carpark API - Supabase schema
-- Run this file in Supabase SQL Editor (Project → SQL Editor).

create table if not exists public.users (
  id text primary key,
  username text unique not null,
  password text not null,
  name text not null,
  email text,
  role text not null default 'staff',
  permissions text[] not null default '{}',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.transactions (
  id text primary key,
  bill_no text not null,
  plate_no text not null,
  vehicle_type text not null,
  service_type text not null,
  entry_at timestamptz,
  exit_at timestamptz,
  duration_minute integer,
  amount numeric,
  vat numeric,
  discount numeric,
  net_amount numeric,
  status text not null,
  payment jsonb not null default '{}'::jsonb,
  receipt jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists transactions_bill_no_idx on public.transactions (bill_no);
create index if not exists transactions_plate_no_idx on public.transactions (plate_no);
create index if not exists transactions_status_idx on public.transactions (status);

create table if not exists public.app_config (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_users_updated_at on public.users;
create trigger set_users_updated_at
before update on public.users
for each row execute procedure public.set_updated_at();

drop trigger if exists set_transactions_updated_at on public.transactions;
create trigger set_transactions_updated_at
before update on public.transactions
for each row execute procedure public.set_updated_at();

drop trigger if exists set_app_config_updated_at on public.app_config;
create trigger set_app_config_updated_at
before update on public.app_config
for each row execute procedure public.set_updated_at();

