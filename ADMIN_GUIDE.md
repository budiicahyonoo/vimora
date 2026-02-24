# Admin Guide - Velmora Ecommerce Platform

Panduan lengkap untuk menggunakan Admin Panel dan melakukan CRUD operations.

---

## Table of Contents

1. [Accessing Admin Panel](#accessing-admin-panel)
2. [Product Management](#product-management)
3. [Order Management](#order-management)
4. [User Management](#user-management)
5. [Analytics Dashboard](#analytics-dashboard)
6. [API CRUD Operations](#api-crud-operations)

---

## Accessing Admin Panel

### Requirements

- Email admin yang terdaftar di Supabase
- Metadata `is_admin: true` di user profile
- Active session/login

### Login Steps

1. Buka aplikasi Velmora
2. Klik "Login" atau buka `/auth/login`
3. Masukkan email admin: `admin@velmora.admin`
4. Masukkan password
5. Klik "Login"
6. Redirect otomatis ke `/admin` dashboard

### Access the Dashboard

Direct URL: `https://your-domain.com/admin`

Atau dari menu → Click profile → Admin Panel (jika user adalah admin)

---

## Product Management

### Dashboard Access

URL: `/admin/products`

### View All Products

1. Buka `/admin/products`
2. Lihat daftar semua produk dalam table format
3. Informasi yang ditampilkan:
   - Product name
   - Category
   - Price
   - Stock quantity
   - Total sales
   - Action buttons

### Search Products

1. Gunakan search bar di top
2. Ketik product name
3. Result akan di-filter secara real-time

### Filter by Category

1. Klik dropdown "All Categories"
2. Pilih category: Clothing, Accessories, atau Footwear
3. List akan di-filter

### Add New Product

#### Via UI Admin Panel

1. Klik tombol "Add Product" (green button dengan + icon)
2. Modal form akan muncul
3. Isi form fields:

```
Product Name: [required]
Description: [optional]
Price: [required, number]
Stock: [required, number]
Category: [required, dropdown]
```

4. Klik "Add Product"
5. Product akan dibuat dan muncul di list

#### Via API

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Silk Blouse",
    "description": "Luxury silk blouse with elegant draping",
    "price": 299,
    "stock": 50,
    "category": "Clothing",
    "image_url": "/products/silk-blouse.jpg"
  }'
```

### Edit Product

#### Via UI Admin Panel

1. Klik icon "Edit" (pencil icon) pada product row
2. Modal edit form akan muncul
3. Update fields yang diperlukan
4. Klik "Update Product"

#### Via API

```bash
curl -X PUT http://localhost:3000/api/products/uuid-1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product Name",
    "price": 349,
    "stock": 40,
    "category": "Accessories"
  }'
```

### Delete Product

#### Via UI Admin Panel

1. Klik icon "Delete" (trash icon) pada product row
2. Confirm deletion
3. Product akan dihapus dari database

#### Via API

```bash
curl -X DELETE http://localhost:3000/api/products/uuid-1
```

### Product Categories

Available categories:
- Clothing
- Accessories
- Footwear

Untuk menambah category, update di:
- Database schema (products table)
- Admin products page (select options)
- Shop page filter options

---

## Order Management

### Dashboard Access

URL: `/admin/orders`

### View All Orders

1. Buka `/admin/orders`
2. Lihat daftar orders dalam table
3. Informasi per order:
   - Order ID
   - Customer email
   - Order date
   - Status
   - Total amount
   - Action buttons

### Order Statuses

Status yang available:
- `pending` - Menunggu payment
- `confirmed` - Payment received
- `processing` - Preparing shipment
- `shipped` - Dalam perjalanan
- `delivered` - Diterima customer
- `cancelled` - Dibatalkan

### Filter Orders

1. Gunakan filter by status
2. Klik dropdown "All Status"
3. Pilih status yang ingin dilihat

### View Order Details

1. Klik pada order row
2. Detail modal akan muncul menampilkan:
   - Order ID
   - Customer info
   - Items (products dalam order)
   - Shipping address
   - Payment info
   - Order timeline

### Update Order Status

#### Via UI

1. Klik order dari list
2. Di modal detail, klik "Change Status"
3. Pilih status baru dari dropdown
4. Klik "Update"
5. Status akan berubah

#### Via API

```bash
curl -X PUT http://localhost:3000/api/orders/order-uuid \
  -H "Content-Type: application/json" \
  -d '{
    "status": "shipped"
  }'
```

### Export Order Data

(Feature coming soon)

---

## User Management

### Dashboard Access

URL: `/admin/users`

### View All Users

1. Buka `/admin/users`
2. Lihat daftar users dengan info:
   - User ID
   - Email
   - Join date
   - Last login
   - Total orders
   - Status (active/inactive)

### Search Users

1. Gunakan search bar
2. Ketik email atau username
3. List di-filter

### View User Profile

1. Klik user row
2. Modal profile akan menampilkan:
   - Personal info
   - Email
   - Phone
   - Address
   - Order history
   - Wishlist items
   - Created at date

### User Roles

Available roles:
- `customer` - Regular customer
- `admin` - Admin user

Untuk change role ke admin:
1. Open user profile
2. Change role dropdown ke "Admin"
3. Click "Save"
4. Or di Supabase, set metadata `is_admin: true`

### Deactivate User

1. Klik user row
2. Klik "Deactivate" button
3. User tidak bisa login
4. Data tetap tersimpan

### Delete User

⚠️ **Warning**: Ini akan menghapus user dan semua associated data.

1. Klik user row
2. Klik "Delete User"
3. Confirm dengan memasukkan email user
4. User dan data dihapus permanent

---

## Analytics Dashboard

### Dashboard Access

URL: `/admin/analytics`

### Key Metrics

#### Sales Summary
- Total revenue (all time)
- Revenue this month
- Revenue this week
- Average order value

#### Order Metrics
- Total orders
- Pending orders
- Completed orders
- Average fulfillment time

#### Customer Metrics
- Total customers
- New customers this month
- Customer retention rate
- Average customer lifetime value

#### Product Metrics
- Total products
- Best selling products
- Low stock products
- Products by category

### Charts & Graphs

#### Sales Trend (Last 30 Days)
- Daily/weekly revenue trend
- Visualized as line chart
- Hover untuk lihat exact values

#### Order Status Distribution
- Pie chart menampilkan:
  - Pending orders
  - Processing orders
  - Shipped orders
  - Delivered orders

#### Top Products
- Bar chart top 10 selling products
- Click untuk lihat product details

#### Revenue by Category
- Revenue breakdown per category
- Clothing, Accessories, Footwear

### Export Analytics

(Feature coming soon)

---

## API CRUD Operations

Setiap operation dapat dilakukan via API untuk automation.

### Authentication

Semua admin API memerlukan auth token:

```bash
# Get auth token
curl -X POST http://localhost:3000/auth/login \
  -d "email=admin@velmora.admin&password=password"
```

### Products API

#### GET All Products

```bash
curl http://localhost:3000/api/products
```

Response:
```json
[
  {
    "id": "uuid",
    "name": "Product Name",
    "price": 299,
    "stock": 50,
    "category": "Clothing"
  }
]
```

#### GET Single Product

```bash
curl http://localhost:3000/api/products/uuid-1
```

#### CREATE Product

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "description": "Description here",
    "price": 299,
    "stock": 50,
    "category": "Clothing",
    "image_url": "/products/image.jpg"
  }'
```

**Required fields**: name, price, category
**Optional fields**: description, image_url

#### UPDATE Product

```bash
curl -X PUT http://localhost:3000/api/products/uuid-1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "price": 349
  }'
```

Dapat update partial fields.

#### DELETE Product

```bash
curl -X DELETE http://localhost:3000/api/products/uuid-1
```

### Orders API

#### GET All Orders

```bash
curl http://localhost:3000/api/orders
```

#### GET User Orders

```bash
curl http://localhost:3000/api/orders/user/user-uuid
```

#### UPDATE Order Status

```bash
curl -X PUT http://localhost:3000/api/orders/order-uuid \
  -H "Content-Type: application/json" \
  -d '{
    "status": "shipped"
  }'
```

Valid statuses: pending, confirmed, processing, shipped, delivered, cancelled

### Users API

#### GET All Users

```bash
curl http://localhost:3000/api/users
```

#### GET User Details

```bash
curl http://localhost:3000/api/users/user-uuid
```

---

## Bulk Operations

### Bulk Update Stock

Create script di `/scripts/bulk-update-stock.js`:

```javascript
const supabase = require('@supabase/supabase-js').createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function updateStock() {
  const updates = [
    { id: 'uuid-1', stock: 100 },
    { id: 'uuid-2', stock: 50 },
    // ... more
  ]

  for (const update of updates) {
    await supabase
      .from('products')
      .update({ stock: update.stock })
      .eq('id', update.id)
  }
}

updateStock()
```

Run dengan:

```bash
node scripts/bulk-update-stock.js
```

### Bulk Delete Orders

```javascript
async function deleteOldOrders(daysOld = 90) {
  const date = new Date()
  date.setDate(date.getDate() - daysOld)
  
  const { error } = await supabase
    .from('orders')
    .delete()
    .lt('created_at', date.toISOString())
  
  if (error) console.error('Error:', error)
  else console.log('Orders deleted successfully')
}

deleteOldOrders(90)
```

---

## Admin Best Practices

1. **Regular Backups**: Backup database regularly
2. **Audit Logs**: Check activity logs
3. **Secure Password**: Gunakan password yang kuat
4. **Two-Factor Auth**: Enable 2FA jika available
5. **Regular Updates**: Keep system updated
6. **Monitor Analytics**: Check metrics regularly
7. **Inventory Check**: Monitor stock levels
8. **Customer Support**: Respond to customer issues

---

## Troubleshooting

### Can't Access Admin Panel

**Error**: "Unauthorized"

**Solution**:
1. Pastikan user memiliki metadata `is_admin: true`
2. Di Supabase Dashboard → Users → Click user
3. Edit User Metadata:
   ```json
   {
     "is_admin": true
   }
   ```
4. Save dan logout/login

### Product Not Appearing

**Error**: "Product created but not showing"

**Solution**:
1. Check di Supabase: products table
2. Verify RLS policies
3. Refresh browser cache
4. Check product category filter

### Order Status Won't Update

**Error**: "Failed to update order status"

**Solution**:
1. Verify you're admin
2. Check valid status value
3. Check order exists
4. Review API response

### Stock Not Updating

**Error**: "Stock unchanged after update"

**Solution**:
1. Check RLS policies on products
2. Verify numeric value
3. Check column name spelling
4. Review database schema

---

## Quick Commands

```bash
# Backup database
pg_dump postgresql://user:pass@host/db > backup.sql

# View logs
vercel logs --tail

# Check environment
echo $NEXT_PUBLIC_SUPABASE_URL

# Test API
curl http://localhost:3000/api/products
```

---

## Support

- Check logs: Vercel Dashboard → Logs
- Database: Supabase Dashboard → SQL Editor
- Auth: Supabase Dashboard → Authentication
- Monitor: Supabase Dashboard → Usage

---

Last Updated: 2026-02-24
