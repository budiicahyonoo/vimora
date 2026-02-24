# Velmora API Documentation

Dokumentasi lengkap untuk semua API endpoints di Velmora Ecommerce Platform.

---

## Base URL

```
Development: http://localhost:3000
Production: https://velmora.com
```

---

## Authentication

Semua admin endpoints memerlukan authentication token dari Supabase.

### Get Auth Token

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@velmora.admin",
    "password": "password"
  }'
```

Response:

```json
{
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer",
    "expires_in": 3600,
    "user": {
      "id": "user-id",
      "email": "admin@velmora.admin",
      "user_metadata": {
        "is_admin": true
      }
    }
  }
}
```

---

## Products API

### 1. Get All Products

**Endpoint**: `GET /api/products`

**Description**: Retrieve semua products dari database

**Parameters**: None

**Response**:

```json
[
  {
    "id": "uuid-1",
    "name": "Silk Blouse",
    "description": "Premium silk blouse",
    "price": 299,
    "stock": 45,
    "category": "Clothing",
    "image_url": "/products/silk-blouse.jpg",
    "created_at": "2026-02-24T10:00:00Z",
    "updated_at": "2026-02-24T10:00:00Z"
  },
  {
    "id": "uuid-2",
    "name": "Leather Bag",
    "description": "Designer leather bag",
    "price": 599,
    "stock": 28,
    "category": "Accessories",
    "image_url": "/products/leather-bag.jpg",
    "created_at": "2026-02-24T10:05:00Z",
    "updated_at": "2026-02-24T10:05:00Z"
  }
]
```

**Example**:

```bash
curl http://localhost:3000/api/products
```

---

### 2. Get Single Product

**Endpoint**: `GET /api/products/:id`

**Description**: Retrieve product berdasarkan ID

**Parameters**:
- `id` (required): Product ID

**Response**:

```json
{
  "id": "uuid-1",
  "name": "Silk Blouse",
  "description": "Premium silk blouse",
  "price": 299,
  "stock": 45,
  "category": "Clothing",
  "image_url": "/products/silk-blouse.jpg",
  "created_at": "2026-02-24T10:00:00Z",
  "updated_at": "2026-02-24T10:00:00Z"
}
```

**Example**:

```bash
curl http://localhost:3000/api/products/uuid-1
```

---

### 3. Create Product (Admin Only)

**Endpoint**: `POST /api/products`

**Description**: Create product baru

**Authentication**: Required (Admin)

**Request Body**:

```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 299,
  "stock": 50,
  "category": "Clothing",
  "image_url": "/products/new-product.jpg"
}
```

**Response** (201 Created):

```json
{
  "id": "uuid-new",
  "name": "New Product",
  "description": "Product description",
  "price": 299,
  "stock": 50,
  "category": "Clothing",
  "image_url": "/products/new-product.jpg",
  "created_at": "2026-02-24T11:00:00Z",
  "updated_at": "2026-02-24T11:00:00Z"
}
```

**Example**:

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cashmere Sweater",
    "description": "Luxury cashmere sweater",
    "price": 499,
    "stock": 30,
    "category": "Clothing",
    "image_url": "/products/sweater.jpg"
  }'
```

**Error Response** (403 Unauthorized):

```json
{
  "error": "Unauthorized"
}
```

---

### 4. Update Product (Admin Only)

**Endpoint**: `PUT /api/products/:id`

**Description**: Update existing product

**Authentication**: Required (Admin)

**Parameters**:
- `id` (required): Product ID

**Request Body**:

```json
{
  "name": "Updated Product",
  "description": "Updated description",
  "price": 399,
  "stock": 40,
  "category": "Accessories",
  "image_url": "/products/updated.jpg"
}
```

**Response**:

```json
{
  "id": "uuid-1",
  "name": "Updated Product",
  "description": "Updated description",
  "price": 399,
  "stock": 40,
  "category": "Accessories",
  "image_url": "/products/updated.jpg",
  "created_at": "2026-02-24T10:00:00Z",
  "updated_at": "2026-02-24T11:30:00Z"
}
```

**Example**:

```bash
curl -X PUT http://localhost:3000/api/products/uuid-1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Silk Blouse",
    "price": 349,
    "stock": 40
  }'
```

---

### 5. Delete Product (Admin Only)

**Endpoint**: `DELETE /api/products/:id`

**Description**: Delete product

**Authentication**: Required (Admin)

**Parameters**:
- `id` (required): Product ID

**Response**:

```json
{
  "message": "Product deleted successfully"
}
```

**Example**:

```bash
curl -X DELETE http://localhost:3000/api/products/uuid-1
```

**Error Response** (404 Not Found):

```json
{
  "error": "Product not found"
}
```

---

## Orders API

### 1. Get All Orders (Admin)

**Endpoint**: `GET /api/orders`

**Description**: Retrieve semua orders

**Authentication**: Required (Admin)

**Response**:

```json
[
  {
    "id": "order-1",
    "user_id": "user-1",
    "status": "pending",
    "total": 599,
    "items": [
      {
        "product_id": "prod-1",
        "quantity": 1,
        "price": 599
      }
    ],
    "shipping_address": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zip": "10001",
      "country": "USA"
    },
    "created_at": "2026-02-24T12:00:00Z"
  }
]
```

**Example**:

```bash
curl http://localhost:3000/api/orders \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

---

### 2. Get User Orders

**Endpoint**: `GET /api/orders/user/:userId`

**Description**: Get orders dari specific user

**Parameters**:
- `userId` (required): User ID

**Response**: Array of orders

**Example**:

```bash
curl http://localhost:3000/api/orders/user/user-1
```

---

### 3. Create Order

**Endpoint**: `POST /api/orders`

**Description**: Create new order (customer)

**Request Body**:

```json
{
  "items": [
    {
      "product_id": "prod-1",
      "quantity": 1,
      "price": 299
    }
  ],
  "shipping_address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA"
  },
  "total": 299
}
```

**Response** (201 Created):

```json
{
  "id": "order-new",
  "user_id": "current-user",
  "status": "pending",
  "total": 299,
  "items": [...],
  "created_at": "2026-02-24T12:30:00Z"
}
```

**Example**:

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"product_id": "prod-1", "quantity": 1, "price": 299}],
    "shipping_address": {"street": "123 St", "city": "NYC"},
    "total": 299
  }'
```

---

### 4. Update Order Status (Admin)

**Endpoint**: `PUT /api/orders/:id`

**Description**: Update order status

**Authentication**: Required (Admin)

**Request Body**:

```json
{
  "status": "shipped"
}
```

**Response**:

```json
{
  "id": "order-1",
  "status": "shipped",
  "updated_at": "2026-02-24T13:00:00Z"
}
```

**Example**:

```bash
curl -X PUT http://localhost:3000/api/orders/order-1 \
  -H "Content-Type: application/json" \
  -d '{"status": "shipped"}'
```

---

## Cart API

### 1. Get Cart

**Endpoint**: `GET /api/cart`

**Description**: Get current user's cart

**Response**:

```json
{
  "id": "cart-1",
  "items": [
    {
      "product_id": "prod-1",
      "name": "Silk Blouse",
      "quantity": 1,
      "price": 299,
      "total": 299
    }
  ],
  "subtotal": 299,
  "tax": 29.90,
  "total": 328.90
}
```

**Example**:

```bash
curl http://localhost:3000/api/cart
```

---

### 2. Add to Cart

**Endpoint**: `POST /api/cart/items`

**Description**: Add item ke cart

**Request Body**:

```json
{
  "product_id": "prod-1",
  "quantity": 1
}
```

**Response**:

```json
{
  "item": {
    "product_id": "prod-1",
    "quantity": 1,
    "price": 299
  },
  "cart_total": 328.90
}
```

**Example**:

```bash
curl -X POST http://localhost:3000/api/cart/items \
  -H "Content-Type: application/json" \
  -d '{"product_id": "prod-1", "quantity": 1}'
```

---

### 3. Update Cart Item

**Endpoint**: `PUT /api/cart/items/:productId`

**Description**: Update quantity item di cart

**Parameters**:
- `productId` (required): Product ID

**Request Body**:

```json
{
  "quantity": 2
}
```

**Response**:

```json
{
  "item": {
    "product_id": "prod-1",
    "quantity": 2,
    "price": 299
  }
}
```

**Example**:

```bash
curl -X PUT http://localhost:3000/api/cart/items/prod-1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 2}'
```

---

### 4. Remove from Cart

**Endpoint**: `DELETE /api/cart/items/:productId`

**Description**: Remove item dari cart

**Response**:

```json
{
  "message": "Item removed from cart"
}
```

**Example**:

```bash
curl -X DELETE http://localhost:3000/api/cart/items/prod-1
```

---

## Users API (Admin)

### 1. Get All Users

**Endpoint**: `GET /api/users`

**Description**: Get semua users (Admin only)

**Authentication**: Required (Admin)

**Response**:

```json
[
  {
    "id": "user-1",
    "email": "customer@email.com",
    "created_at": "2026-02-20T10:00:00Z",
    "last_login": "2026-02-24T08:00:00Z",
    "orders_count": 5
  }
]
```

---

### 2. Get User Details

**Endpoint**: `GET /api/users/:id`

**Description**: Get specific user details

**Response**:

```json
{
  "id": "user-1",
  "email": "customer@email.com",
  "created_at": "2026-02-20T10:00:00Z",
  "profile": {
    "first_name": "John",
    "last_name": "Doe"
  },
  "orders": [...],
  "wishlist": [...]
}
```

---

## Error Handling

### Common Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Bad Request | Check request body format |
| 401 | Unauthorized | Provide valid auth token |
| 403 | Forbidden | User not admin |
| 404 | Not Found | Resource tidak ada |
| 500 | Server Error | Contact support |

**Error Response Format**:

```json
{
  "error": "Error message",
  "status": 400
}
```

---

## Rate Limiting

- **Limit**: 100 requests per 10 seconds per IP
- **Headers**: 
  - `X-RateLimit-Limit: 100`
  - `X-RateLimit-Remaining: 99`
  - `X-RateLimit-Reset: 1645678000`

---

## Testing API

### Using cURL

```bash
# Get all products
curl http://localhost:3000/api/products

# Create product (admin)
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","price":100,"category":"Test"}'

# Update product
curl -X PUT http://localhost:3000/api/products/uuid \
  -H "Content-Type: application/json" \
  -d '{"price":150}'

# Delete product
curl -X DELETE http://localhost:3000/api/products/uuid
```

### Using Postman

1. Import collection dari endpoints
2. Setup environment variables:
   - `base_url`: http://localhost:3000
   - `auth_token`: Your token
3. Run requests

### Using JavaScript/Fetch

```javascript
// Get products
const products = await fetch('http://localhost:3000/api/products')
  .then(res => res.json())

// Create product
const newProduct = await fetch('http://localhost:3000/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Product',
    price: 299,
    category: 'Clothing'
  })
}).then(res => res.json())
```

---

## API Versioning

Current Version: `v1`

Future versions akan support di `/api/v2/...`

---

## Webhooks (Coming Soon)

- Order confirmation
- Payment received
- Shipment tracking
- Customer support messages

---

## Rate Limit Best Practices

1. Implement caching client-side
2. Batch requests ketika mungkin
3. Use pagination untuk large datasets
4. Implement exponential backoff untuk retries

---

Last Updated: 2026-02-24
