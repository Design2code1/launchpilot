# Supabase Integration & Database Schema

Supabase is the default backend engine configuration. It handles Authentication, Database (PostgreSQL), and User Avatar Storage.

## SQL Initialization Schema
Execute the following SQL query inside your Supabase SQL Editor to initialize user profiles:

```sql
-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  name text,
  avatar_url text,
  bio text,
  plan text default 'free',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Policies for RLS
create policy "Allow public read-access profiles"
  on public.profiles for select
  using (true);

create policy "Allow user profiles updates"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger to automatically create a profile entry on user signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, plan)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', 'User'), 'free');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## Storage Bucket Configuration
Create a storage bucket named `avatars` and ensure the access permissions are set to public.
