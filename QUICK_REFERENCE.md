# Velmora - Quick Reference Card

Fast lookup guide untuk common tasks dan commands.

---

## 🚀 Getting Started (5 minutes)

```bash
# 1. Clone & install
git clone <repo>
cd velmora-ecommerce
pnpm install

# 2. Create .env.local (copy from .env.example)
cp .env.example .env.local

# 3. Fill environment variables in .env.local
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# SUPABASE_SERVICE_ROLE_KEY=...

# 4. Start development server
pnpm dev

# 5. Open browser
# http://localhost:3000
```

---

## 📝 Essential Commands

```bash
# Development
pnpm dev                 # Start dev server
pnpm build              # Build for production
pnpm start              # Run production build
pnpm lint               # Check code quality
pnpm format             # Format code

# Database
# Run SQL migrations in Supabase Dashboard
# SQL Editor → Paste 001_create_tables.sql → Run
# SQL Editor → Paste 002_create_profile_trigger.sql → Run

# Deployment
vercel login            # Login to Vercel
vercel link             # Link project
vercel --prod          # Deploy to production
```

---

## 🔑 Environment Variables

```env
# Required for Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# Optional
SENDGRID_API_KEY=xxxxx
STRIPE_PUBLIC_KEY=xxxxx
STRIPE_SECRET_KEY=xxxxx
```

**Get from**: Supabase Dashboard → Settings → API

---

## 🌐 Key URLs

| Page | URL | Auth Required |
|------|-----|---|
| Homepage | / | No |
| Shop | /shop | No |
| Product | /shop/:id | No |
| Cart | /cart | No |
| Checkout | /checkout | No |
| Wishlist | /wishlist | Yes |
| Chat | /chat | No |
| Contact | /contact | No |
| Login | /auth/login | No |
| Signup | /auth/signup | No |
| **Admin** | **/admin** | **Yes (Admin Only)** |
| Admin Products | /admin/products | Yes (Admin) |
| Admin Orders | /admin/orders | Yes (Admin) |
| Admin Users | /admin/users | Yes (Admin) |
| Admin Analytics | /admin/analytics | Yes (Admin) |

---

## 📡 API Endpoints Quick Reference

### Products
```bash
# Get all
curl http://localhost:3000/api/products

# Get one
curl http://localhost:3000/api/products/uuid

# Create (admin)
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Product","price":299,"category":"Clothing"}'

# Update (admin)
curl -X PUT http://localhost:3000/api/products/uuid \
  -d '{"price":349}'

# Delete (admin)
curl -X DELETE http://localhost:3000/api/products/uuid
```

### Cart
```bash
# Get cart
curl http://localhost:3000/api/cart

# Add item
curl -X POST http://localhost:3000/api/cart/items \
  -d '{"product_id":"uuid","quantity":1}'

# Update item
curl -X PUT http://localhost:3000/api/cart/items/uuid \
  -d '{"quantity":2}'

# Remove item
curl -X DELETE http://localhost:3000/api/cart/items/uuid
```

### Orders
```bash
# Get all (admin)
curl http://localhost:3000/api/orders

# Create order
curl -X POST http://localhost:3000/api/orders \
  -d '{"items":[...],"total":599}'

# Update status (admin)
curl -X PUT http://localhost:3000/api/orders/uuid \
  -d '{"status":"shipped"}'
```

---

## 👨‍💼 Admin Setup

### Create Admin User

```sql
-- Via Supabase SQL Editor
-- 1. Create user via Auth
-- 2. Set metadata in Users table:

UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(raw_user_meta_data, '{is_admin}', 'true'::jsonb)
WHERE email = 'admin@velmora.admin';
```

Or via Supabase Dashboard:
1. Authentication → Users
2. Click user → Edit User Metadata
3. Add: `{"is_admin": true}`
4. Save

### Login to Admin
```
URL: http://localhost:3000/auth/login
Email: admin@velmora.admin
Password: Your password
→ Redirects to /admin
```

---

## 📂 Project Structure

```
velmora-ecommerce/
├── app/
│   ├── admin/              # Admin pages (protected)
│   ├── shop/               # Product pages
│   ├── cart/               # Cart page
│   ├── checkout/           # Checkout
│   ├── auth/               # Login/Signup
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── lib/
│   └── supabase/           # Supabase clients
├── public/
│   ├── products/           # Product images
│   └── velmora-logo.svg
├── scripts/
│   ├── 001_create_tables.sql
│   └── 002_create_profile_trigger.sql
└── Documentation files (README, SETUP_GUIDE, etc)
```

---

## 🛠️ Common Tasks

### Add New Product
```bash
# Via Admin Panel
1. Login to /admin/products
2. Click "Add Product"
3. Fill form (name, price, stock, category)
4. Click "Add Product"

# Via API
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "price": 299,
    "stock": 50,
    "category": "Clothing",
    "description": "Product description"
  }'
```

### Update Product Stock
```bash
# Via Admin
1. /admin/products
2. Click Edit icon
3. Update stock quantity
4. Save

# Via API
curl -X PUT http://localhost:3000/api/products/uuid \
  -d '{"stock": 40}'
```

### View Orders
```
Admin Panel: /admin/orders
Shows all customer orders with status
```

### Update Order Status
```bash
# Via Admin
1. Click order in /admin/orders
2. Change status dropdown
3. Click Update

# Via API
curl -X PUT http://localhost:3000/api/orders/uuid \
  -d '{"status": "shipped"}'

# Valid statuses:
pending → confirmed → processing → shipped → delivered
```

---

## 🐛 Troubleshooting

### "SUPABASE_URL not found"
```bash
# Check .env.local exists
ls -la .env.local

# Verify it has:
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Restart server
# Ctrl+C → pnpm dev
```

### "Unauthorized" on Admin
```bash
# Check if user is admin
# Supabase → Users → Click user → Check metadata

# User metadata must have:
{
  "is_admin": true
}

# Then logout and login again
```

### Products Not Showing
```bash
# Check database migrations ran
# Supabase → SQL Editor → Run both scripts

# Check RLS policies enabled
# Supabase → Tables → Check RLS toggle

# Clear browser cache
# Ctrl+Shift+Delete → Clear all
```

### API Not Responding
```bash
# Check server running
# Should see "- ready on http://localhost:3000"

# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL

# Check Supabase connection
# Try: pnpm dev with verbose logs
```

---

## 📊 Database Tables Quick View

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| products | Product catalog | id, name, price, stock, category |
| orders | Customer orders | id, user_id, status, total |
| order_items | Order line items | order_id, product_id, quantity |
| carts | Shopping carts | id, user_id, created_at |
| cart_items | Cart contents | cart_id, product_id, quantity |
| wishlists | Saved products | user_id, product_id |
| chats | Support messages | id, user_id, message |
| reviews | Product reviews | product_id, user_id, rating |
| profiles | User info | id (user), first_name, last_name |

---

## 🎨 Design System

```css
/* Colors */
--primary: #000000 (black)
--secondary: #FFFFFF (white)
--accent: #C9B8A8 (beige)
--background: #F5F5F0

/* Typography */
Headings: Playfair Display (serif)
Body: Geist (sans-serif)
Code: Geist Mono

/* Spacing Scale */
2px, 4px, 6px, 8px, 12px, 16px, 24px, 32px, 48px...
```

---

## 📱 Responsive Breakpoints

```css
Mobile: < 640px
Tablet: 640px - 1024px
Desktop: > 1024px

/* Tailwind Prefixes */
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

Example: `md:grid-cols-2` = 2 columns on tablets+

---

## 🚀 Deployment Checklist

```bash
# 1. Build locally
pnpm build

# 2. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 3. Vercel deploys automatically
# OR manually: vercel --prod

# 4. Add env vars in Vercel
# Settings → Environment Variables
# Add all NEXT_PUBLIC_* and SUPABASE_* vars

# 5. Check deployment
# Visit https://your-domain.com
```

---

## 📞 Documentation Files

| Need Help With | Read This |
|---|---|
| Getting started | README.md |
| Local setup | SETUP_GUIDE.md |
| Deploy to production | DEPLOYMENT.md |
| API reference | API_DOCUMENTATION.md |
| Admin operations | ADMIN_GUIDE.md |
| Pre-launch checks | PRE_DEPLOYMENT_CHECKLIST.md |
| Technical specs | PROJECT_SUMMARY.md |
| All documentation | DOCUMENTATION.md |

---

## ⌨️ Keyboard Shortcuts

```bash
# Development
Ctrl+C         # Stop dev server
Ctrl+J         # Open integrated terminal (VS Code)
Ctrl+Shift+P   # Command palette (VS Code)

# Browser
F12            # Open DevTools
Ctrl+Shift+K   # Console
Ctrl+Shift+C   # Inspector
Ctrl+Shift+N   # Incognito (bypass cache)
```

---

## 🔒 Security Quick Tips

```bash
# Never commit secrets
echo ".env.local" >> .gitignore

# Rotate API keys regularly
# Supabase → Settings → API → Regenerate keys

# Always use HTTPS in production
# Vercel handles this automatically

# Keep dependencies updated
pnpm update

# Check for vulnerabilities
pnpm audit
```

---

## 🎯 Performance Tips

```bash
# Optimize images
# Use Next.js Image component, not <img>

# Code splitting
# Use dynamic() import for heavy components

# Database
# Check query performance in Supabase
# Add indexes: CREATE INDEX ... ON ...

# Caching
# Leverage Next.js caching strategies
# ISR (Incremental Static Regeneration)

# Monitor
# Check Vercel Analytics
# Monitor in Supabase Dashboard
```

---

## 📈 Useful Metrics

```
Homepage Load: <2s target
Shop Page Load: <2s target
Admin Dashboard: <3s target
Lighthouse Score: >80 target
Uptime: >99.9% target
Error Rate: <1% target
```

---

## 🌍 Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org)

---

## 💡 Quick Tips

1. **Use Supabase CLI for local development**
   ```bash
   npm install -g supabase-cli
   supabase start
   ```

2. **Enable RLS for security**
   - Go to each table → Enable RLS
   - Add policies for access control

3. **Use API for automation**
   - Batch operations
   - Scheduled tasks
   - External integrations

4. **Monitor performance**
   - Check Vercel Analytics
   - Monitor database queries
   - Track error rates

5. **Keep docs updated**
   - Update this file as you go
   - Document any customizations
   - Keep API docs current

---

## 📋 Reference Table

### Status Values
- Orders: `pending`, `confirmed`, `processing`, `shipped`, `delivered`, `cancelled`
- User roles: `customer`, `admin`

### Category Values
- `Clothing`
- `Accessories`
- `Footwear`

### Product Fields
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "price": "number",
  "stock": "number",
  "category": "string",
  "image_url": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

---

## ✅ Daily Checklist

- [ ] Check error logs (Vercel)
- [ ] Monitor database usage (Supabase)
- [ ] Review new orders (Admin)
- [ ] Check low stock items (Admin)
- [ ] Verify uptime monitoring
- [ ] Update documentation if needed

---

## 🎓 Learning Paths

### Beginner
1. Read README.md
2. Follow SETUP_GUIDE.md
3. Run `pnpm dev`
4. Explore homepage

### Developer
1. Study SETUP_GUIDE.md
2. Review API_DOCUMENTATION.md
3. Explore app/ folder
4. Try adding a feature

### Admin
1. Read ADMIN_GUIDE.md
2. Create test products
3. Create test orders
4. Explore dashboard

### DevOps
1. Read DEPLOYMENT.md
2. Follow PRE_DEPLOYMENT_CHECKLIST.md
3. Setup monitoring
4. Plan scaling

---

## 🆘 Need Help?

1. **Check the docs** - Start with relevant guide
2. **Search the file** - Ctrl+F in browser
3. **Check logs** - Vercel/Supabase dashboards
4. **Debug locally** - Use `pnpm dev` + DevTools
5. **Read error message** - Usually tells you what's wrong

---

**Save this file for quick reference!** 📌

---

Last Updated: 2026-02-24
