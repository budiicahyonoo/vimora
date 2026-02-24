# Deployment Guide - Velmora Ecommerce Platform

Panduan lengkap untuk mendeploy Velmora ke production menggunakan Vercel.

---

## Quick Start Deployment

### 1. Prepare Your Repository

```bash
# Initialize git (jika belum)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Velmora Ecommerce"

# Create repository on GitHub dan push
git remote add origin https://github.com/your-username/velmora.git
git branch -M main
git push -u origin main
```

### 2. Deploy via Vercel

#### Step A: Connect to Vercel

1. Buka [vercel.com](https://vercel.com/)
2. Sign in dengan GitHub account
3. Klik "New Project"
4. Select GitHub repository: `velmora`
5. Klik "Import"

#### Step B: Configure Environment Variables

Di halaman setup Vercel:

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
SUPABASE_SERVICE_ROLE_KEY = your-service-role-key
```

#### Step C: Deploy

Klik "Deploy" dan tunggu proses selesai (~2-3 menit)

---

## Advanced Deployment

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login ke Vercel
vercel login

# Configure project
vercel link

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY

# Deploy ke production
vercel --prod
```

### Option 2: GitHub Actions (CI/CD)

Buat `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Option 3: Docker Deployment

Buat `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy source code
COPY . .

# Build
RUN pnpm build

# Expose port
EXPOSE 3000

# Start
CMD ["pnpm", "start"]
```

Build dan push:

```bash
docker build -t velmora:latest .
docker push your-registry/velmora:latest
```

---

## Custom Domain Setup

### 1. Purchase Domain

Beli domain di:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare

### 2. Connect to Vercel

1. Buka Vercel Dashboard → Project Settings → Domains
2. Klik "Add Domain"
3. Masukkan domain name: `velmora.com`
4. Vercel akan memberikan nameserver instructions

### 3. Update DNS

Di domain registrar, update nameserver ke Vercel:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

Wait for DNS propagation (24 jam)

---

## SSL/HTTPS Certificate

Vercel otomatis menyediakan SSL certificate dari Let's Encrypt untuk domain Anda.

Verifikasi:
1. Buka `https://velmora.com`
2. Check green lock di browser
3. SSL sudah enabled

---

## Database Migration to Production

### 1. Setup Supabase Production

Buat Supabase project baru untuk production:

```bash
# Via Supabase CLI
supabase projects create \
  --name velmora-prod \
  --region us-east-1
```

### 2. Run Migrations

Di Supabase Dashboard production:

1. Buka SQL Editor
2. Run `001_create_tables.sql`
3. Run `002_create_profile_trigger.sql`

### 3. Update Environment Variables

Di Vercel Project Settings → Environment Variables:

Update dengan Supabase production credentials:

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx-prod.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = prod-anon-key
SUPABASE_SERVICE_ROLE_KEY = prod-service-role-key
```

### 4. Re-deploy

Trigger redeployment:

```bash
git commit --allow-empty -m "Deploy to production"
git push origin main
```

---

## Email Configuration

### Setup SendGrid (Recommended)

1. Buat akun di [SendGrid](https://sendgrid.com/)
2. Buat API key
3. Add environment variable:

```
SENDGRID_API_KEY = your-sendgrid-api-key
```

### Alternative: Gmail SMTP

```env
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your-email@gmail.com
SMTP_PASSWORD = your-app-password
```

---

## Monitoring & Logging

### Vercel Analytics

1. Buka Vercel Dashboard
2. Analytics tab untuk:
   - Page views
   - Response times
   - Error rates

### Supabase Monitoring

1. Buka Supabase Dashboard
2. Check:
   - Database performance
   - API requests
   - Storage usage

### Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

Setup di `next.config.js`:

```js
import * as Sentry from "@sentry/nextjs";

export default Sentry.withSentryConfig(nextConfig, {
  org: "your-org",
  project: "velmora",
});
```

---

## Performance Optimization

### Image Optimization

```tsx
import Image from 'next/image'

export default function ProductImage() {
  return (
    <Image
      src="/products/image.jpg"
      alt="Product"
      width={400}
      height={400}
      priority
    />
  )
}
```

### Code Splitting

```tsx
import dynamic from 'next/dynamic'

const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  loading: () => <p>Loading...</p>,
})
```

### Database Optimization

```sql
-- Index untuk performa
CREATE INDEX products_category_idx ON products(category);
CREATE INDEX orders_user_id_idx ON orders(user_id);
CREATE INDEX cart_items_user_id_idx ON cart_items(user_id);
```

---

## Backup & Recovery

### Database Backup

Supabase otomatis backup setiap jam. Akses via:

1. Supabase Dashboard → Backups
2. Download backup tertentu
3. Restore jika diperlukan

### Manual Backup

```bash
# Export database
pg_dump postgresql://user:password@host:5432/db > backup.sql

# Import database
psql -U user -d dbname < backup.sql
```

---

## Rollback Strategy

### Revert to Previous Deployment

```bash
# Via Git
git revert <commit-hash>
git push origin main

# Via Vercel Dashboard
1. Deployments tab
2. Click previous deployment
3. Click "Promote to Production"
```

---

## Cost Optimization

### Reduce Vercel Costs

- Use Edge Functions untuk lightweight tasks
- Optimize image sizes
- Remove unused dependencies
- Use Incremental Static Regeneration (ISR)

### Reduce Supabase Costs

- Setup row level security properly
- Optimize query efficiency
- Compress images sebelum upload
- Remove unused data

---

## Security Hardening

### 1. Environment Secrets

Jangan hardcode secrets:

```javascript
// ❌ DON'T
const apiKey = "sk_test_xxxxx"

// ✅ DO
const apiKey = process.env.SUPABASE_SERVICE_ROLE_KEY
```

### 2. CORS Configuration

Vercel otomatis handle CORS untuk same-origin requests.

### 3. Rate Limiting

Implement di Middleware:

```typescript
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export async function middleware(request: NextRequest) {
  const { success } = await ratelimit.limit(request.ip!);
  if (!success) return new Response('Too many requests', { status: 429 });
}
```

### 4. API Keys Rotation

Update API keys secara berkala:

1. Generate new key di Supabase
2. Update environment variables
3. Delete old key

---

## Monitoring Checklist

- [ ] Domain berjalan dengan HTTPS
- [ ] Database connected dan berfungsi
- [ ] Admin panel accessible
- [ ] Products dapat ditambah/edit/delete
- [ ] Users dapat login
- [ ] Checkout process berfungsi
- [ ] Email notifications terkirim
- [ ] Analytics dashboard berfungsi
- [ ] No errors di Vercel logs
- [ ] Performance metrics normal

---

## Post-Deployment

### 1. Test Production

```bash
# Test endpoints
curl https://velmora.com/api/products

# Test authentication
curl -X POST https://velmora.com/auth/login \
  -d "email=test@test.com&password=password"

# Test admin API
curl https://velmora.com/api/products/1
```

### 2. Monitor First 24 Hours

- Check error rates
- Monitor response times
- Track user logins
- Verify payment processing

### 3. Setup Alerts

Via Vercel or Sentry:
- Alert on deployment failures
- Alert on error spikes
- Alert on high latency

---

## Troubleshooting Deployment

### Build Fails

```bash
# Check build locally
pnpm build

# View detailed logs
vercel logs --tail
```

### Environment Variables Not Loaded

```bash
# Verify variables in Vercel
vercel env ls

# Re-deploy after updating
git commit --allow-empty -m "Trigger deploy"
git push
```

### Database Connection Error

```bash
# Test connection
psql -U user -h host -d database

# Check Supabase status
# Verify credentials in .env.local
```

### Slow Performance

```bash
# Check with Lighthouse
# Run performance audit
# Optimize images and code splitting
```

---

## References

- [Vercel Deployment Docs](https://vercel.com/docs/deployments)
- [Supabase Production Checklist](https://supabase.com/docs/guides/production-checklist)
- [Next.js Production Best Practices](https://nextjs.org/docs/advanced-features/security-headers)

---

Last Updated: 2026-02-24
