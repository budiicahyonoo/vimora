# VELMORA - Setup & Deployment Guide

Panduan lengkap untuk menjalankan dan mendeploy Velmora Ecommerce Platform.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Database Configuration](#database-configuration)
4. [Admin Setup](#admin-setup)
5. [Running Locally](#running-locally)
6. [Deployment to Vercel](#deployment-to-vercel)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Sebelum memulai, pastikan Anda memiliki:

- **Node.js**: v18.17 atau lebih tinggi ([Download](https://nodejs.org/))
- **Git**: Untuk version control ([Download](https://git-scm.com/))
- **Akun Supabase**: Database PostgreSQL yang dihosting ([Sign up](https://supabase.com/))
- **Akun Vercel**: Untuk deployment ([Sign up](https://vercel.com/))
- **Package Manager**: pnpm (recommended) atau npm

### Install pnpm

```bash
npm install -g pnpm
```

---

## Local Development Setup

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd velmora-ecommerce
```

### 2. Install Dependencies

```bash
pnpm install
```

Atau jika menggunakan npm:

```bash
npm install
```

### 3. Setup Supabase Project

#### Create a new Supabase Project

1. Login ke [supabase.com](https://supabase.com/)
2. Klik "New Project"
3. Pilih nama project: `velmora`
4. Pilih region terdekat dengan lokasi Anda
5. Klik "Create new project"

#### Get Connection Credentials

Setelah project dibuat:
1. Buka menu "Settings" → "API"
2. Copy:
   - `anon` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`

---

## Database Configuration

### 1. Create .env.local File

Di root project, buat file `.env.local`:

```bash
cp .env.example .env.local
```

### 2. Fill Environment Variables

Edit `.env.local` dengan credentials Supabase Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# Optional - for email notifications
# SMTP_HOST=
# SMTP_PORT=
# SMTP_USER=
# SMTP_PASSWORD=
```

### 3. Execute Database Migrations

Buka Supabase Dashboard → SQL Editor dan jalankan script berikut:

**Buka file**: `/scripts/001_create_tables.sql`

Copy semua konten dan jalankan di Supabase SQL Editor:

```sql
-- Salin isi dari scripts/001_create_tables.sql dan paste di sini
```

Setelah berhasil, jalankan script trigger:

**Buka file**: `/scripts/002_create_profile_trigger.sql`

```sql
-- Salin isi dari scripts/002_create_profile_trigger.sql dan paste di sini
```

### Atau Gunakan Dashboard UI (Alternative)

1. Buka Supabase Dashboard
2. Pilih "SQL Editor"
3. Klik "New Query"
4. Copy & paste konten dari `scripts/001_create_tables.sql`
5. Klik "Run"
6. Repeat untuk `scripts/002_create_profile_trigger.sql`

---

## Admin Setup

### 1. Create Admin User

#### Via Supabase Dashboard

1. Buka Supabase → Authentication → Users
2. Klik "Invite User"
3. Masukkan email admin: `admin@velmora.admin`
4. Klik "Invite"

#### Atau Via Command Line

```bash
# Create admin dengan metadata
pnpm supabase auth admin create-user \
  --email admin@velmora.admin \
  --password YourSecurePassword123
```

### 2. Set Admin Metadata

Di Supabase Dashboard → Authentication → Users:

1. Klik user yang baru dibuat
2. Scroll ke "User Metadata"
3. Tambahkan:
   ```json
   {
     "is_admin": true
   }
   ```
4. Klik "Save"

### 3. Login ke Admin Panel

1. Buka aplikasi: `http://localhost:3000/auth/login`
2. Login dengan email admin
3. Akses admin panel: `http://localhost:3000/admin`

---

## Running Locally

### Start Development Server

```bash
pnpm dev
```

Aplikasi akan berjalan di `http://localhost:3000`

### Access Different Pages

- **Homepage**: `http://localhost:3000/`
- **Shop**: `http://localhost:3000/shop`
- **Product Detail**: `http://localhost:3000/shop/1`
- **Cart**: `http://localhost:3000/cart`
- **Checkout**: `http://localhost:3000/checkout`
- **Wishlist**: `http://localhost:3000/wishlist`
- **Contact**: `http://localhost:3000/contact`
- **Chat**: `http://localhost:3000/chat`
- **Auth Login**: `http://localhost:3000/auth/login`
- **Auth Signup**: `http://localhost:3000/auth/signup`
- **Admin Panel**: `http://localhost:3000/admin` (memerlukan login admin)

### Development Commands

```bash
# Development server
pnpm dev

# Build untuk production
pnpm build

# Run production build
pnpm start

# Lint code
pnpm lint

# Format code
pnpm format
```

---

## Deployment to Vercel

### 1. Connect GitHub Repository

1. Buat repository baru di GitHub
2. Push code Anda:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/velmora.git
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### Option B: Via Vercel Web

1. Buka [vercel.com](https://vercel.com/)
2. Klik "New Project"
3. Import GitHub repository
4. Klik "Import"

### 3. Configure Environment Variables in Vercel

Di Vercel Dashboard:

1. Project Settings → Environment Variables
2. Tambahkan semua variable dari `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

3. Klik "Save"

### 4. Re-deploy

Setelah menambahkan environment variables:

```bash
vercel --prod
```

Atau via Vercel Dashboard → Deployments → Trigger New Deployment

---

## Admin API Operations

### Create Product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "description": "Product description",
    "price": 299,
    "stock": 50,
    "category": "Clothing",
    "image_url": "/products/image.jpg"
  }'
```

### Get All Products

```bash
curl http://localhost:3000/api/products
```

### Get Product by ID

```bash
curl http://localhost:3000/api/products/1
```

### Update Product

```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "price": 399,
    "stock": 40,
    "category": "Accessories"
  }'
```

### Delete Product

```bash
curl -X DELETE http://localhost:3000/api/products/1
```

---

## Project Structure

```
velmora-ecommerce/
├── app/
│   ├── admin/              # Admin dashboard (protected)
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── orders/
│   │   ├── users/
│   │   └── analytics/
│   ├── auth/               # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── error/
│   ├── shop/               # Product catalog
│   │   └── [id]/
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout process
│   ├── wishlist/           # Wishlist
│   ├── chat/               # Customer chat
│   ├── contact/            # Contact page
│   ├── api/                # API routes
│   │   └── products/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Client Supabase
│   │   ├── server.ts       # Server Supabase
│   │   └── proxy.ts        # Auth proxy
│   └── utils.ts
├── public/
│   ├── products/           # Product images
│   └── velmora-logo.svg
├── scripts/
│   ├── 001_create_tables.sql
│   └── 002_create_profile_trigger.sql
├── middleware.ts           # Vercel SvelteKit middleware
├── .env.example
├── .env.local
├── package.json
├── next.config.js
└── tsconfig.json
```

---

## Database Schema

### Users (Supabase Auth)

- `id` - UUID (primary key)
- `email` - varchar
- `user_metadata` - jsonb
  - `is_admin` - boolean

### Products

- `id` - UUID (primary key)
- `name` - varchar
- `description` - text
- `price` - decimal
- `stock` - integer
- `category` - varchar
- `image_url` - varchar
- `created_at` - timestamp
- `updated_at` - timestamp

### Orders

- `id` - UUID (primary key)
- `user_id` - UUID (foreign key)
- `status` - varchar
- `total` - decimal
- `created_at` - timestamp

### Carts

- `id` - UUID (primary key)
- `user_id` - UUID (foreign key)
- `created_at` - timestamp

### Wishlists

- `id` - UUID (primary key)
- `user_id` - UUID (foreign key)
- `product_id` - UUID (foreign key)
- `created_at` - timestamp

---

## Security Best Practices

1. **Environment Variables**: Jangan commit `.env.local` ke Git
2. **Admin Protection**: Hanya user dengan `is_admin: true` dapat mengakses `/admin`
3. **RLS Policies**: Semua tabel dilindungi dengan Row Level Security
4. **API Authentication**: Semua endpoint API mengecek admin status
5. **Password**: Gunakan password yang kuat untuk admin user

---

## Troubleshooting

### Error: "NEXT_PUBLIC_SUPABASE_URL not found"

Solusi:
1. Pastikan `.env.local` dibuat dengan benar
2. Restart development server: `Ctrl+C` lalu `pnpm dev`
3. Verifikasi environment variable di `.env.local`

### Error: "Unauthorized" di Admin Panel

Solusi:
1. Pastikan user memiliki metadata `is_admin: true`
2. Logout dan login kembali
3. Check di Supabase Dashboard → Users → User Metadata

### Error: "Connection refused" to Supabase

Solusi:
1. Verifikasi URL Supabase di `.env.local`
2. Pastikan project Supabase aktif
3. Check koneksi internet

### Products tidak muncul di Shop

Solusi:
1. Jalankan database migration scripts
2. Tambahkan produk via admin panel atau API
3. Refresh halaman shop

### Admin panel tidak bisa diakses

Solusi:
1. Pastikan user login
2. Check metadata `is_admin: true` di Supabase
3. Clear browser cache dan logout/login kembali

---

## Performance Optimization

1. **Image Optimization**: Gunakan Next.js Image component
2. **Database Indexing**: Index pada `user_id` dan `product_id`
3. **Caching**: Implement Redis caching untuk products
4. **CDN**: Vercel CDN otomatis untuk static assets

---

## Next Steps

1. Customize branding dan logo
2. Setup payment gateway (Stripe/Midtrans)
3. Add email notifications
4. Implement inventory management
5. Setup analytics dashboard
6. Add search functionality
7. Setup SMS notifications

---

## Support & Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

Last Updated: 2026-02-24
