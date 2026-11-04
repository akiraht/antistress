-- Bảng lưu thông tin người dùng & hạn VIP 7.000đ/tháng
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique,
  display_name text,
  is_vip boolean default false not null,
  vip_expires_at timestamptz,
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create table public.payment_orders (
  order_code bigint primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount integer not null default 7000,
  status text not null default 'PENDING',
  created_at timestamptz default now()
);
