# Pre-Deployment Checklist - Velmora

Verifikasi lengkap sebelum deploy ke production.

---

## Development Environment ✓

- [ ] Node.js v18+ terinstall
- [ ] pnpm terinstall
- [ ] Git configured
- [ ] GitHub account created
- [ ] Vercel account created
- [ ] Supabase account created

---

## Code Setup ✓

- [ ] Repository cloned
- [ ] Dependencies installed: `pnpm install`
- [ ] `.env.local` file dibuat
- [ ] Environment variables di-fill dengan benar
- [ ] No TypeScript errors: `pnpm build` success
- [ ] No lint errors: `pnpm lint` pass
- [ ] Local development server runs: `pnpm dev`

---

## Database Configuration ✓

### Supabase Project

- [ ] Supabase project created
- [ ] Project region selected (nearest to location)
- [ ] Database initialized

### Database Schema

- [ ] SQL migration 001 (tables) executed
- [ ] SQL migration 002 (triggers) executed
- [ ] All tables created successfully:
  - [ ] `auth.users`
  - [ ] `public.profiles`
  - [ ] `public.products`
  - [ ] `public.orders`
  - [ ] `public.order_items`
  - [ ] `public.carts`
  - [ ] `public.cart_items`
  - [ ] `public.wishlists`
  - [ ] `public.chats`
  - [ ] `public.reviews`

### Row Level Security

- [ ] RLS enabled on all tables
- [ ] RLS policies created for each table
- [ ] Test RLS: Can't access other user's data

### Indexes

- [ ] Database indexes created for better performance
- [ ] Indexes on: `user_id`, `product_id`, `category`

---

## Authentication Setup ✓

### Supabase Auth

- [ ] Email provider enabled
- [ ] Password auth configured
- [ ] Email confirmation required

### Admin User

- [ ] Admin user created: `admin@velmora.admin`
- [ ] Admin password set
- [ ] User metadata `is_admin: true` added
- [ ] Can login successfully
- [ ] Can access admin panel

### Test Users

- [ ] Test customer user created
- [ ] Test customer can login
- [ ] Test customer can browse products

---

## Application Testing ✓

### Homepage

- [ ] Homepage loads correctly
- [ ] Logo displays properly
- [ ] Navigation menu works
- [ ] Featured products show
- [ ] Links to shop/cart/account work

### Shop Page

- [ ] Shop page displays products
- [ ] Product images load correctly
- [ ] Filters work (category, price)
- [ ] Search functionality works
- [ ] Sort options work (newest, price)
- [ ] Add to cart button works

### Product Detail

- [ ] Product detail page loads
- [ ] Product images display
- [ ] Product description shows
- [ ] Price displayed correctly
- [ ] Add to cart works
- [ ] Add to wishlist works

### Cart

- [ ] Can add items to cart
- [ ] Cart shows correct items
- [ ] Can update quantity
- [ ] Can remove items
- [ ] Total price calculated correctly
- [ ] Cart persists (refresh page)

### Checkout

- [ ] Checkout page loads
- [ ] Shipping form required fields visible
- [ ] Can enter shipping address
- [ ] Can proceed to review
- [ ] Order summary shows correct total
- [ ] Can submit order

### Authentication

- [ ] Signup page works
- [ ] Can create new account
- [ ] Email confirmation works (if enabled)
- [ ] Login page works
- [ ] Can login with valid credentials
- [ ] Invalid credentials show error
- [ ] Password reset works (if enabled)

### Admin Panel

- [ ] Admin page protected (non-admin redirected)
- [ ] Admin can access dashboard
- [ ] Dashboard shows statistics
- [ ] Can view products list
- [ ] Can add new product
- [ ] Can edit existing product
- [ ] Can delete product
- [ ] Can view orders
- [ ] Can update order status
- [ ] Can view users
- [ ] Analytics dashboard works

---

## Performance ✓

### Build Performance

- [ ] Build completes in <5 minutes
- [ ] No build warnings
- [ ] Bundle size reasonable
- [ ] Images optimized (using Next.js Image)

### Page Load

- [ ] Homepage loads in <2 seconds
- [ ] Shop page loads in <2 seconds
- [ ] Product detail loads in <1.5 seconds
- [ ] Cart loads instantly
- [ ] Admin dashboard loads in <3 seconds

### Lighthouse Scores

- [ ] Performance: >80
- [ ] Accessibility: >80
- [ ] Best Practices: >80
- [ ] SEO: >80

---

## Security ✓

### Environment Variables

- [ ] No secrets in code
- [ ] `.env.local` in `.gitignore`
- [ ] All required env vars in `.env.local`
- [ ] Database URL protected
- [ ] API keys protected

### Admin Protection

- [ ] Admin routes require authentication
- [ ] Non-admin users redirected from `/admin`
- [ ] API endpoints check admin status
- [ ] CRUD operations require authentication

### Data Protection

- [ ] Row Level Security enabled
- [ ] Users can only access own data
- [ ] Products public, but editable only by admin
- [ ] Orders scoped to user

### HTTPS

- [ ] Development uses HTTP (ok for local)
- [ ] Production will use HTTPS
- [ ] SSL certificate will be auto-configured

---

## Content ✓

### Product Data

- [ ] Sample products created (8 products)
- [ ] Product images uploaded
- [ ] Product prices set
- [ ] Product categories set
- [ ] Product descriptions added
- [ ] Stock quantities set

### Static Content

- [ ] Logo uploaded
- [ ] Homepage content correct
- [ ] Contact page information correct
- [ ] About page information correct

### Branding

- [ ] Brand colors applied
- [ ] Brand fonts loaded
- [ ] Brand logo displayed
- [ ] Consistent styling throughout

---

## Third-party Services ✓

### Supabase

- [ ] Account created
- [ ] Project created
- [ ] API credentials obtained
- [ ] Credentials added to env vars

### Vercel

- [ ] Account created
- [ ] Ready to connect GitHub

### GitHub (if using)

- [ ] Repository created
- [ ] Code pushed to main branch
- [ ] README updated
- [ ] .gitignore properly configured

---

## Documentation ✓

- [ ] README.md updated and complete
- [ ] SETUP_GUIDE.md created
- [ ] DEPLOYMENT.md created
- [ ] API_DOCUMENTATION.md created
- [ ] ADMIN_GUIDE.md created
- [ ] .env.example file created
- [ ] Inline code comments added
- [ ] API endpoints documented

---

## Deployment Preparation ✓

### Git Repository

- [ ] Initialize git: `git init`
- [ ] All files added: `git add .`
- [ ] Initial commit: `git commit -m "Initial commit"`
- [ ] Remote added: `git remote add origin <url>`
- [ ] Pushed to main: `git push -u origin main`

### Vercel

- [ ] Vercel account linked to GitHub
- [ ] Project settings configured
- [ ] Build settings correct
- [ ] Production environment setup

### Environment Variables (Production)

- [ ] `NEXT_PUBLIC_SUPABASE_URL` added to Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added to Vercel
- [ ] `SUPABASE_SERVICE_ROLE_KEY` added to Vercel
- [ ] Variables marked as sensitive where needed

---

## Pre-Flight Check ✓

### Final Code Review

- [ ] No console.log debug statements
- [ ] No commented-out code
- [ ] No hardcoded secrets
- [ ] No TODO comments left
- [ ] Code formatted and linted
- [ ] TypeScript strict mode passing

### Final Testing

```bash
# Run all tests
pnpm test

# Build for production
pnpm build

# Check for errors
pnpm lint

# Type check
pnpm type-check
```

Results:
- [ ] All tests pass
- [ ] Build succeeds
- [ ] No lint errors
- [ ] No type errors

### Browser Testing

- [ ] Chrome - all features work
- [ ] Firefox - all features work
- [ ] Safari - all features work
- [ ] Mobile (iOS) - responsive and works
- [ ] Mobile (Android) - responsive and works
- [ ] Tablet view - responsive and works

---

## Database Final Check ✓

- [ ] Backup created before deployment
- [ ] Production database ready
- [ ] RLS policies tested
- [ ] No sensitive data exposed
- [ ] Indexes created for performance

---

## Monitoring Setup ✓

- [ ] Vercel Analytics enabled
- [ ] Error tracking configured
- [ ] Logs accessible
- [ ] Performance monitoring setup
- [ ] Email alerts configured

---

## Deployment Ready ✓

**Final Checklist**:

- [ ] All above checks completed
- [ ] Code reviewed and approved
- [ ] Tests passing
- [ ] Documentation complete
- [ ] Team notified
- [ ] Backup created
- [ ] Ready to deploy

---

## Deployment Steps

When all checks pass, follow these steps:

```bash
# 1. Final local test
pnpm build
pnpm start

# 2. Verify production env vars in Vercel

# 3. Deploy
git push origin main

# 4. Monitor deployment in Vercel Dashboard

# 5. Test production URL

# 6. Set up monitoring and alerts

# 7. Announce launch
```

---

## Post-Deployment ✓

After deployment is live:

- [ ] Test production URL in browser
- [ ] Verify all pages load
- [ ] Verify authentication works
- [ ] Verify admin panel works
- [ ] Verify database connected
- [ ] Check error logs
- [ ] Monitor performance metrics
- [ ] Test on different devices
- [ ] Test payment flow
- [ ] Verify email notifications (if enabled)

---

## Issues Found

Document any issues found during testing:

```
Issue #1: [Description]
Status: [Open/Fixed/Pending]
Priority: [High/Medium/Low]
Resolution: [How it was resolved]
```

---

## Sign-off

- [ ] Development Team: _________________________ Date: _______
- [ ] QA Team: _________________________ Date: _______
- [ ] Product Owner: _________________________ Date: _______

---

**Ready to Deploy!** 🚀

---

Last Updated: 2026-02-24
