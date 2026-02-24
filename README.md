# VELMORA - Luxury Fashion Ecommerce Platform

Premium ecommerce platform untuk luxury fashion brand Velmora, dibangun dengan Next.js 16, Supabase, dan Vercel.

![Velmora Logo](public/velmora-logo.svg)

---

## ✨ Features

- 🛍️ **Product Catalog**: Koleksi produk luxury dengan filter dan search
- 🛒 **Shopping Cart**: Manage cart dengan real-time updates
- 💳 **Checkout Process**: Multi-step checkout dengan shipping & payment info
- ❤️ **Wishlist**: Save favorite products
- 👤 **User Authentication**: Email/password auth dengan Supabase
- 👨‍💼 **Admin Dashboard**: Kelola produk, orders, users, dan analytics
- 💬 **Live Chat**: Customer support real-time
- 📊 **Analytics**: Dashboard dengan sales metrics dan trends
- 🎨 **Modern Design**: Responsive, mobile-first design dengan black/white/beige theme
- 🚀 **Production Ready**: Dioptimasi untuk performance dan security

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) atau npm
- Akun Supabase
- Akun Vercel (untuk deployment)

### 1. Clone & Install

```bash
git clone <repository-url>
cd velmora-ecommerce
pnpm install
```

### 2. Setup Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` dengan credentials Supabase Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Setup Database

Jalankan SQL migrations di Supabase Dashboard:

1. Buka [supabase.com](https://supabase.com/)
2. Pilih project Anda
3. Buka SQL Editor
4. Copy & paste konten dari `scripts/001_create_tables.sql`
5. Klik Run
6. Repeat untuk `scripts/002_create_profile_trigger.sql`

### 4. Run Development Server

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## 📚 Documentation

- **[Setup Guide](./SETUP_GUIDE.md)** - Detailed setup instructions
- **[Deployment Guide](./DEPLOYMENT.md)** - Deploy to production
- **[API Documentation](./API_DOCUMENTATION.md)** - API endpoints reference
- **[Project Summary](./PROJECT_SUMMARY.md)** - Fitur dan struktur project

---

## 🏗️ Project Structure

```
velmora-ecommerce/
├── app/
│   ├── admin/              # Admin dashboard (protected)
│   ├── shop/               # Product catalog
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout process
│   ├── auth/               # Authentication
│   ├── api/                # API routes
│   └── page.tsx            # Homepage
├── lib/
│   └── supabase/           # Supabase client setup
├── public/
│   └── products/           # Product images
├── scripts/
│   ├── 001_create_tables.sql
│   └── 002_create_profile_trigger.sql
└── ...config files
```

---

## 🔐 Admin Access

### Create Admin User

1. Di Supabase Dashboard → Authentication → Users
2. Klik "Invite User"
3. Masukkan email: `admin@velmora.admin`
4. Klik User dan edit Metadata:

```json
{
  "is_admin": true
}
```

### Login to Admin Panel

1. Buka [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
2. Gunakan email admin
3. Akses dashboard di [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🌐 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page dengan featured products |
| Shop | `/shop` | Product catalog dengan filters |
| Product | `/shop/:id` | Product detail page |
| Cart | `/cart` | Shopping cart |
| Checkout | `/checkout` | Checkout process |
| Wishlist | `/wishlist` | Saved products |
| Chat | `/chat` | Customer support |
| Contact | `/contact` | Contact & FAQ |
| Login | `/auth/login` | User login |
| Signup | `/auth/signup` | User registration |
| Admin | `/admin` | Admin dashboard |

---

## 📦 API Endpoints

```bash
# Products
GET    /api/products          # Get all products
GET    /api/products/:id      # Get product detail
POST   /api/products          # Create (admin)
PUT    /api/products/:id      # Update (admin)
DELETE /api/products/:id      # Delete (admin)

# Orders
GET    /api/orders            # Get all (admin)
POST   /api/orders            # Create order
PUT    /api/orders/:id        # Update status (admin)

# Cart
GET    /api/cart              # Get cart
POST   /api/cart/items        # Add item
PUT    /api/cart/items/:id    # Update item
DELETE /api/cart/items/:id    # Remove item

# Users (Admin)
GET    /api/users             # Get all users
GET    /api/users/:id         # Get user details
```

Lihat [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) untuk detail lengkap.

---

## 🎨 Design System

### Colors

- **Primary**: Black (`#000000`)
- **Secondary**: White & Beige (`#F5F5F0`)
- **Accent**: Warm beige (`#C9B8A8`)
- **Foreground**: Dark gray & white

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Geist (sans-serif)

### Components

Built dengan [shadcn/ui](https://ui.shadcn.com/) dan Tailwind CSS v4.

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Login
vercel login

# Deploy
vercel --prod
```

Atau connect GitHub repository ke Vercel untuk automatic deployments.

Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk instruksi lengkap.

---

## 🔧 Development Commands

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Run production build
pnpm start

# Lint code
pnpm lint

# Format code
pnpm format
```

---

## 🗄️ Database Schema

Tabel utama:
- `products` - Product catalog
- `orders` - Customer orders
- `order_items` - Order line items
- `carts` - Shopping carts
- `cart_items` - Cart items
- `wishlists` - Wishlist items
- `chats` - Customer support chats
- `reviews` - Product reviews
- `profiles` - User profiles

Semua tabel dilindungi dengan Row Level Security (RLS).

---

## 🔒 Security

- ✅ Row Level Security di semua tabel
- ✅ Admin authentication dan authorization
- ✅ HTTPS/SSL untuk production
- ✅ Password hashing dengan bcrypt
- ✅ CORS configuration
- ✅ Environment variables for secrets

---

## 📊 Performance Optimization

- Next.js Image Optimization
- Code splitting & lazy loading
- Database indexing
- Caching strategy
- CDN for static assets (Vercel)

---

## 🐛 Troubleshooting

### "SUPABASE_URL not found"
- Pastikan `.env.local` dibuat dengan benar
- Restart dev server

### "Unauthorized" di Admin
- Pastikan user memiliki `is_admin: true`
- Clear cookies dan logout/login

### Produk tidak muncul
- Jalankan database migrations
- Pastikan RLS policies configured

Lihat [SETUP_GUIDE.md](./SETUP_GUIDE.md#troubleshooting) untuk troubleshooting lengkap.

---

## 📞 Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

## 📝 License

MIT License - See LICENSE file for details

---

## 🎯 Next Steps

- [ ] Customize branding dan logo
- [ ] Setup payment gateway (Stripe/Midtrans)
- [ ] Add email notifications
- [ ] Implement inventory management
- [ ] Setup advanced analytics
- [ ] Add search functionality
- [ ] Setup SMS notifications
- [ ] Add customer reviews

---

## 📸 Screenshots

Gambar akan ditampilkan di sini setelah deployment...

---

**Built with ❤️ using Next.js, Supabase, and Vercel**

Last Updated: 2026-02-24
