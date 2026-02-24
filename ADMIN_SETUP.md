# Admin Setup Guide

## How to Make a User Admin

There are two ways to make a user an admin in Velmora:

### Method 1: Through Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - Navigate to your Supabase project: https://app.supabase.com
   - Select your project

2. **Access Authentication Settings**
   - Go to **Authentication** → **Users**
   - Find the user you want to make admin (e.g., budicahyono.dev@gmail.com)
   - Click on the user to open details

3. **Edit User Metadata**
   - Look for the "User Metadata" field
   - Add the following JSON:
   ```json
   {
     "is_admin": true
   }
   ```
   - Click **Update User** or **Save**

### Method 2: Using SQL Query

1. **Go to Supabase SQL Editor**
   - In your Supabase project, go to **SQL Editor**
   - Click **New Query**

2. **Run Admin Setup Query**
   ```sql
   -- Set user as admin
   UPDATE auth.users 
   SET raw_user_meta_data = jsonb_set(
     COALESCE(raw_user_meta_data, '{}'::jsonb), 
     '{is_admin}', 
     'true'::jsonb
   )
   WHERE email = 'budicahyono.dev@gmail.com';
   ```

3. **Execute the Query**
   - Click **Run** or press **Ctrl+Enter**

### Method 3: Bulk Admin Setup Script

If you need to make multiple users admin, create a migration file:

```sql
-- scripts/003_setup_admins.sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{is_admin}', 
  'true'::jsonb
)
WHERE email IN ('budicahyono.dev@gmail.com', 'admin@velmora.com');
```

## Verify Admin Status

To verify a user is now admin:

1. **Check in Supabase Dashboard**
   - Go to **Authentication** → **Users**
   - Click the user
   - Check if `is_admin: true` appears in User Metadata

2. **Test in App**
   - Log out if logged in
   - Log in with the admin email
   - Navigate to `/admin`
   - If you see the admin dashboard, you're successfully admin!
   - If you get redirected to `/`, the user is not admin yet

## Admin Features

Once you're admin, you can access:
- **Dashboard** (`/admin`) - Overview of sales, orders, customers
- **Products** (`/admin/products`) - View, add, edit, delete products
- **Orders** (`/admin/orders`) - Manage customer orders
- **Users** (`/admin/users`) - View customer information
- **Analytics** (`/admin/analytics`) - Sales trends and reports

## Troubleshooting

### Issue: 404 Error When Accessing /admin

**Causes:**
1. User is not marked as admin
2. User needs to log in again
3. Browser cache issue

**Solutions:**
1. Verify user has `is_admin: true` in metadata
2. Log out completely and log back in
3. Clear browser cache (Ctrl+Shift+Del)
4. Try incognito/private window
5. Check admin layout auth check is working

### Issue: "User is not admin, redirecting to home"

This means the metadata check is failing. Ensure:
- The metadata is saved correctly: `{"is_admin": true}`
- The user has logged out and logged back in
- User metadata format is exactly right (no extra spaces or quotes)

### Issue: Admin Dashboard Shows "Loading..." Forever

**Solution:**
- Check browser console for errors (F12)
- Check Supabase connection is working
- Verify environment variables are set correctly
- Try a hard refresh (Ctrl+Shift+R)

## Making Users Non-Admin

To remove admin privileges:

**SQL:**
```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{is_admin}', 
  'false'::jsonb
)
WHERE email = 'user@example.com';
```

**Or in Dashboard:**
- Update User Metadata to: `{"is_admin": false}`

## Security Notes

⚠️ **Important Security Considerations:**

1. **Only trusted people should be admin**
   - Admins can create, edit, and delete products
   - Admins can view all customer orders
   - Admins can access sensitive business data

2. **Use strong passwords**
   - All admin accounts must use strong, unique passwords
   - Change passwords regularly

3. **Monitor admin access**
   - Keep track of who has admin access
   - Remove admin privileges from users who leave
   - Audit admin actions regularly

4. **Production Security**
   - On production, add additional security like 2FA
   - Consider IP restrictions
   - Implement audit logging for admin actions

## Next Steps

After setting up admin users:
1. Test the admin panel functionality
2. Add products through the admin interface
3. Review the ADMIN_GUIDE.md for detailed operations
4. Set up monitoring and logging for production
