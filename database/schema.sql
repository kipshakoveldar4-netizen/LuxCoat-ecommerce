create extension if not exists pgcrypto;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  size_ml integer not null,
  price_cents integer not null,
  currency text not null default 'USD',
  inventory_quantity integer not null default 0,
  active boolean not null default true,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text not null,
  last_name text not null,
  phone text,
  country text not null,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id),
  order_number text unique not null,
  status text not null default 'pending',
  payment_provider text,
  payment_status text not null default 'not_started',
  subtotal_cents integer not null,
  shipping_cents integer not null,
  total_cents integer not null,
  currency text not null default 'USD',
  shipping_address jsonb not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id),
  sku text not null,
  title text not null,
  quantity integer not null,
  unit_price_cents integer not null,
  total_cents integer not null
);

insert into products (
  slug,
  title,
  description,
  size_ml,
  price_cents,
  currency,
  inventory_quantity,
  image_url
)
values (
  'luxcoat-liquid-glass-237ml',
  'LuxCoat Liquid Glass',
  'Automotive liquid glass coating for deep gloss, shine restoration, light scratch resistance, and UV protection.',
  237,
  3495,
  'USD',
  420,
  '/images/luxcoat-product.png'
)
on conflict (slug) do nothing;
