
-- Enable PostGIS extension for geospatial queries
create extension if not exists postgis;

-- Create the bot_sightings table
create table public.bot_sightings (
  id uuid default gen_random_uuid() primary key,
  location geography(POINT) not null,
  class text not null check (class in ('sidewalk_courier', 'aerial_drone', 'quadrupedal_inspector', 'autonomous_road_vehicle', 'surveillance_unit', 'other_machine', 'not_a_bot')),
  vibe_score int not null check (vibe_score between 1 and 100),
  timestamp timestamptz default now() not null,
  image_url text,
  metadata jsonb
);

-- Index for geospatial queries
create index bot_sightings_geo_index on public.bot_sightings using GIST (location);

-- Secure the table (RLS)
alter table public.bot_sightings enable row level security;

-- Allow public read access (for radar)
create policy "Public sightings are viewable by everyone"
  on public.bot_sightings for select
  using (true);

-- Allow authenticated users to insert (using anon key for now, can restrict later)
create policy "Anyone can upload sightings"
  on public.bot_sightings for insert
  with check (true);

-- RPC Function to find bots within a radius (Steel Thread)
create or replace function get_bots_in_radius(
  lat float,
  long float,
  radius_meters float
)
returns setof public.bot_sightings
language sql
as $$
  select *
  from public.bot_sightings
  where ST_DWithin(
    location,
    ST_SetSRID(ST_MakePoint(long, lat), 4326)::geography,
    radius_meters
  );
$$;
