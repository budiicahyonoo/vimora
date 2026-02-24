# Troubleshooting Guide

## Admin Login Issues

### Issue: 404 Error on /admin After Login

**Symptoms:**
- Can log in successfully with admin account
- Navigate to `/admin`
- Get 404 "Not Found" error
- Or page redirects to home `/`

**Root Causes:**
1. User not marked as admin
2. User needs to re-login
3. Browser cache issue
4. Metadata not saved correctly

**Solutions:**

**Solution 1: Verify Admin Metadata in Supabase**
```sql
-- Run in Supabase SQL Editor
SELECT email, raw_user_meta_data 
FROM auth.users 
WHERE email = 'budicahyono.dev@gmail.com';
```

Expected output should show:
```json
{
  "is_admin": true
}
```

If `is_admin` is missing or `false`, proceed to Solution 2.

**Solution 2: Set Admin in Supabase Dashboard**
1. Go to https://app.supabase.com
2. Select your project
3. Go to **Authentication** → **Users**
4. Find `budicahyono.dev@gmail.com`
5. Click the user
6. Edit **User Metadata** field
7. Add/Update to: `{"is_admin": true}`
8. Click **Update User**

**Solution 3: Set Admin with SQL**
```sql
-- Run in Supabase SQL Editor
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{is_admin}', 
  'true'::jsonb
)
WHERE email = 'budicahyono.dev@gmail.com';

-- Verify it worked
SELECT email, raw_user_meta_data 
FROM auth.users 
WHERE email = 'budicahyono.dev@gmail.com';
```

**Solution 4: Clear Cache & Re-login**
1. Log out from app (click Logout in admin panel or clear localStorage)
2. Close browser window completely
3. Open new browser window
4. Go to http://localhost:3000/auth/login
5. Log in again with admin email
6. Navigate to /admin

**Solution 5: Verify JSON Format**
Make sure the JSON is exactly correct:
- ✅ Correct: `{"is_admin": true}`
- ❌ Wrong: `{"is_admin": "true"}` (string instead of boolean)
- ❌ Wrong: `{is_admin: true}` (missing quotes)
- ❌ Wrong: `{"is_admin":true}` (no space)

---

## Frontend Display Issues

### Issue: Logo Not Showing on Homepage

**Symptoms:**
- Navbar appears blank where logo should be
- Or text "VELMORA" still shows instead of image

**Solutions:**

1. **Check if file exists**
   - File should be at: `/public/velmora-logo.svg`
   - Check if it's there in your project

2. **Check image path in code**
   ```tsx
   <img src="/velmora-logo.svg" alt="Velmora Logo" className="h-10 w-auto" />
   ```
   Path must start with `/` not relative path

3. **Clear browser cache**
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Or clear cache in DevTools: F12 → Application → Clear

### Issue: Featured Product Images Not Showing

**Symptoms:**
- Featured products section shows placeholder instead of images
- Images appear broken (X icon)

**Files Required:**
- `/public/products/featured-1.jpg`
- `/public/products/featured-2.jpg`
- `/public/products/featured-3.jpg`
- `/public/products/featured-4.jpg`

**Solutions:**

1. **Verify images exist**
   - Check project at `/public/products/`
   - All 4 featured images should be there

2. **Check image format**
   - Must be `.jpg` (not `.png` or other formats)
   - Try lowercase filename

3. **Clear browser cache**
   - Hard refresh: `Ctrl+Shift+R`
   - Or open in incognito window

### Issue: Responsive Layout Broken on Mobile

**Symptoms:**
- Elements overlap on mobile
- Text too small
- Buttons unclickable
- Layout jumps between sizes

**Solutions:**

1. **Use Chrome DevTools (F12)**
   - Click device toggle icon
   - Select iPhone or Android device
   - Test at multiple sizes:
     - 375px (mobile)
     - 768px (tablet)
     - 1024px (desktop)

2. **Check viewport meta tag**
   - In `app/layout.tsx` should have:
   ```tsx
   export const viewport: Viewport = {
     width: 'device-width',
     initialScale: 1,
   }
   ```

3. **Clear build cache**
   ```bash
   rm -rf .next
   pnpm dev
   ```

---

## Authentication Issues

### Issue: Can't Log In With Admin Account

**Symptoms:**
- Submit login form
- Nothing happens or error appears
- "Invalid login credentials"

**Check Email Confirmation:**
1. Go to Supabase Dashboard
2. **Authentication** → **Users**
3. Find the user
4. Check if **Confirmed at** has a date
5. If empty, email is not confirmed

**Solution: Confirm Email Manually**
```sql
-- In Supabase SQL Editor
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email = 'budicahyono.dev@gmail.com';
```

### Issue: "Invalid API Key" Error

**Symptoms:**
- App won't load
- Console shows "SUPABASE_URL is missing"
- Network errors to Supabase

**Solution: Check Environment Variables**

1. Create `.env.local` in project root
2. Add these variables (get from Supabase dashboard):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Restart dev server:
   ```bash
   pnpm dev
   ```

4. Check Supabase **Settings** → **API** for correct values

---

## Database Issues

### Issue: Database Migrations Failed

**Symptoms:**
- Tables don't exist
- Queries return errors
- "SCHEMA DOES NOT EXIST"

**Solutions:**

1. **Verify migrations ran**
   ```sql
   -- In Supabase SQL Editor
   SELECT * FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```
   Should show: products, orders, users, carts, etc.

2. **Re-run migrations**
   - If tables missing, execute SQL manually:
   - Read `/vercel/share/v0-project/scripts/001_create_tables.sql`
   - Copy-paste into Supabase SQL Editor
   - Click **Run**

3. **Check for RLS errors**
   - If getting "permission denied" errors
   - Table may have Row Level Security enabled
   - Check table RLS policies are correct

---

## Performance Issues

### Issue: Page Loads Slowly

**Symptoms:**
- Takes >3 seconds to load
- Images load very slowly
- Console shows errors

**Optimize:**

1. **Check Network in DevTools (F12)**
   - Look for slow requests
   - Check image file sizes
   - Verify Supabase is responding

2. **Clear Next.js Cache**
   ```bash
   rm -rf .next
   pnpm dev
   ```

3. **Check Image Optimization**
   - Use Next.js Image component
   - Add width/height props
   - Use appropriate formats

### Issue: Images Taking Long to Load

**Symptoms:**
- Featured products/shop page images slow
- Images appear one by one

**Solutions:**

1. **Check Image Sizes**
   - Should be ~50-200KB each
   - Use .jpg format (smaller than .png)
   - Compress if needed

2. **Verify Image Paths**
   - Check path starts with `/`
   - Check capitalization matches exactly
   - No spaces in filenames

3. **Browser Cache**
   - Hard refresh: `Ctrl+Shift+R`
   - Try different browser
   - Try incognito window

---

## Build & Deployment Issues

### Issue: Build Fails With TypeScript Errors

**Symptoms:**
- `pnpm build` fails
- TypeScript errors in console
- Deployment rejected

**Solutions:**

1. **Check TypeScript**
   ```bash
   pnpm run build
   ```
   Look for specific error messages

2. **Common Issues**
   - Missing imports: Add `import { ... } from '...'`
   - Wrong component names: Check capitalization
   - Missing props: Check component prop types

3. **Fix and Rebuild**
   ```bash
   pnpm run build
   ```

### Issue: Deployment Timeout

**Symptoms:**
- Deployment takes >15 minutes
- "Build timeout exceeded"
- Vercel cancels deployment

**Solutions:**

1. **Optimize build**
   - Remove large dependencies
   - Check for circular imports
   - Use code splitting

2. **Check `next.config.js`**
   - Verify no problematic configs
   - Check Turbopack settings

3. **Increase timeout**
   - In Vercel project settings
   - Deployment → Build & Deploy
   - Increase timeout

---

## Quick Fixes Checklist

- [ ] Did you run `pnpm install`?
- [ ] Did you create `.env.local` with Supabase keys?
- [ ] Did you run the database migrations?
- [ ] Did you set the user as admin?
- [ ] Did you hard refresh browser (Ctrl+Shift+R)?
- [ ] Did you clear Next.js cache (`rm -rf .next`)?
- [ ] Did you restart dev server?
- [ ] Is Supabase project accessible?
- [ ] Are all required files in `/public`?
- [ ] Are environment variables correct?

---

## Getting Help

If issue persists:

1. **Check Console**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Note exact error message

2. **Check Network**
   - Open DevTools (F12)
   - Network tab
   - Look for failed requests
   - Check Supabase connectivity

3. **Check Documentation**
   - Read SETUP_GUIDE.md
   - Read ADMIN_SETUP.md
   - Read DEPLOYMENT.md

4. **Check Supabase Status**
   - Go to https://status.supabase.com
   - Verify no incidents

5. **Restart Everything**
   - Stop dev server: `Ctrl+C`
   - Clear cache: `rm -rf .next`
   - Reinstall: `pnpm install`
   - Start: `pnpm dev`
