-- Setup Admin User Metadata
-- Run this script in Supabase SQL Editor to set is_admin for your admin users

-- Make specific email(s) admin
-- Replace with your actual admin email(s)
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{is_admin}', 
  'true'::jsonb
)
WHERE email = 'budicahyono.dev@gmail.com';

-- Verify it worked
SELECT email, raw_user_meta_data FROM auth.users WHERE email = 'budicahyono.dev@gmail.com';
