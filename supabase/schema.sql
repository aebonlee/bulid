-- ============================================================================
--  bulid (건설기계 AI역량강화 학습사이트) — Supabase 스키마
--  공용 Supabase 프로젝트(hcmgdztsgjvzcyxyayaj)에 적재되므로 모든 객체는
--  bulid_ 접두사를 사용한다. auth.users 트리거는 search_path 고정 +
--  스키마 명시 + 예외처리로 작성하여, 오류가 나도 전체 회원가입을 막지 않는다.
--  (과거 공용 프로젝트에서 트리거 1개가 전체 가입을 마비시킨 사고 이력 반영)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1) 프로필 테이블
-- ----------------------------------------------------------------------------
create table if not exists public.bulid_profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  name        text,
  avatar_url  text,
  provider    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.bulid_profiles is 'bulid 학습사이트 사용자 프로필';

-- ----------------------------------------------------------------------------
-- 2) 학습 진도 테이블 (DAY/PART 단위 완료)
-- ----------------------------------------------------------------------------
create table if not exists public.bulid_progress (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references auth.users (id) on delete cascade,
  vol_id       text not null,          -- 'vol1' | 'vol2'
  part_num     integer not null,       -- 1..8
  completed_at timestamptz not null default now(),
  unique (user_id, vol_id, part_num)
);

create index if not exists bulid_progress_user_idx on public.bulid_progress (user_id);

comment on table public.bulid_progress is 'bulid 학습사이트 사용자별 DAY/PART 완료 진도';

-- ----------------------------------------------------------------------------
-- 3) RLS — 본인 데이터만 접근
-- ----------------------------------------------------------------------------
alter table public.bulid_profiles  enable row level security;
alter table public.bulid_progress  enable row level security;

-- profiles
drop policy if exists bulid_profiles_select_own on public.bulid_profiles;
create policy bulid_profiles_select_own on public.bulid_profiles
  for select using (auth.uid() = id);

drop policy if exists bulid_profiles_upsert_own on public.bulid_profiles;
create policy bulid_profiles_upsert_own on public.bulid_profiles
  for insert with check (auth.uid() = id);

drop policy if exists bulid_profiles_update_own on public.bulid_profiles;
create policy bulid_profiles_update_own on public.bulid_profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- progress
drop policy if exists bulid_progress_select_own on public.bulid_progress;
create policy bulid_progress_select_own on public.bulid_progress
  for select using (auth.uid() = user_id);

drop policy if exists bulid_progress_insert_own on public.bulid_progress;
create policy bulid_progress_insert_own on public.bulid_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists bulid_progress_update_own on public.bulid_progress;
create policy bulid_progress_update_own on public.bulid_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists bulid_progress_delete_own on public.bulid_progress;
create policy bulid_progress_delete_own on public.bulid_progress
  for delete using (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- 4) 회원가입 핸들러 (★ 안전 작성 필수)
--    - SECURITY DEFINER + set search_path = public  → 검색경로 고정
--    - 모든 객체 스키마 명시(public.bulid_profiles)
--    - 예외는 삼켜서(EXCEPTION WHEN OTHERS) auth.users INSERT를 절대 막지 않음
--      → 공용 프로젝트의 다른 사이트 회원가입에 영향 없음
-- ----------------------------------------------------------------------------
create or replace function public.bulid_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.bulid_profiles (id, email, name, avatar_url, provider)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data ->> 'name',
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'nickname',
      split_part(coalesce(new.email, ''), '@', 1)
    ),
    new.raw_user_meta_data ->> 'avatar_url',
    new.raw_app_meta_data  ->> 'provider'
  )
  on conflict (id) do nothing;
  return new;
exception
  when others then
    -- 어떤 오류가 나도 회원가입 자체는 통과시킨다 (전체 가입 마비 방지)
    raise warning 'bulid_handle_new_user failed for %: %', new.id, sqlerrm;
    return new;
end;
$$;

-- 트리거 이름도 bulid_ 접두사로 분리 (다른 사이트 트리거와 독립)
drop trigger if exists bulid_on_auth_user_created on auth.users;
create trigger bulid_on_auth_user_created
  after insert on auth.users
  for each row execute function public.bulid_handle_new_user();

-- ----------------------------------------------------------------------------
-- 5) updated_at 자동 갱신 (profiles)
-- ----------------------------------------------------------------------------
create or replace function public.bulid_touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bulid_profiles_touch on public.bulid_profiles;
create trigger bulid_profiles_touch
  before update on public.bulid_profiles
  for each row execute function public.bulid_touch_updated_at();
