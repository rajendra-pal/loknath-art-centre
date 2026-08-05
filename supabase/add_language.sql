-- Idempotent: add language preference column to public.accounts.
-- Default 'en' for every existing row; new rows default to 'en'.

alter table public.accounts
  add column if not exists language text not null default 'en'
  check (language in ('en', 'bn'));

-- No policy change needed: the existing "Accounts owner access" policy
-- already covers select/update on the language column for the row owner.
