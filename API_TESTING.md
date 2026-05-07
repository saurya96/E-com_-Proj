# API Testing Examples

This file contains ready-to-use examples for testing all API endpoints.

## 🔐 Authentication Tests

### Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Save the token from response:**
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### Get User Profile (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🏷️ Category Tests

### Get All Categories
```bash
curl -X GET http://localhost:5000/api/categories
```

---

### Create Category (Admin Only)
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Electronics",
    "description": "Electronic devices and gadgets",
    "image": "https://example.com/electronics.jpg"
  }'
```

**Save the category ID:**
```bash
CATEGORY_ID="..."
```

---

## 📦 Product Tests

### Get All Products
```bash
curl -X GET "http://localhost:5000/api/products?page=1&limit=10"
```

---

### Get Products with Pagination
```bash
curl -X GET "http://localhost:5000/api/products?page=1&limit=5"
```

---

### Get Products with Filtering (Price Range)
```bash
curl -X GET "http://localhost:5000/api/products?minPrice=100&maxPrice=5000"
```

---

### Get Products with Filtering (Category)
```bash
curl -X GET "http://localhost:5000/api/products?category=$CATEGORY_ID"
```

---

### Get Products with Sorting
```bash
# Sort by newest first (default)
curl -X GET "http://localhost:5000/api/products?sort=-createdAt"

# Sort by price (low to high)
curl -X GET "http://localhost:5000/api/products?sort=price"

# Sort by price (high to low)
curl -X GET "http://localhost:5000/api/products?sort=-price"
```

---

### Create Product (Protected)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with precision tracking and long battery life",
    "price": 29.99,
    "category": "'$CATEGORY_ID'",
    "stock": 200,
    "images": [
      "https://example.com/mouse1.jpg",
      "https://example.com/mouse2.jpg"
    ],
    "discount": 5,
    "sku": "MOUSE-001",
    "tags": ["electronics", "accessories", "wireless"]
  }'
```

**Save the product ID:**
```bash
PRODUCT_ID="..."
```

---

### Get Single Product
```bash
curl -X GET "http://localhost:5000/api/products/$PRODUCT_ID"
```

---

### Update Product (Protected)
```bash
curl -X PUT "http://localhost:5000/api/products/$PRODUCT_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "price": 24.99,
    "discount": 10,
    "stock": 150
  }'
```

---

### Delete Product (Protected)
```bash
curl -X DELETE "http://localhost:5000/api/products/$PRODUCT_ID" \
  -H "Authorization: Bearer $TOKEN"
```

---

### Get Products by Category
```bash
curl -X GET "http://localhost:5000/api/products/category/$CATEGORY_ID?page=1&limit=10"
```

---

## ❌ Error Cases

### Register with Existing Email
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Email already registered",
  "timestamp": "2024-01-15T10:40:00Z"
}
```

---

### Access Protected Route Without Token
```bash
curl -X GET http://localhost:5000/api/auth/profile
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "statusCode": 401,
  "message": "Unauthorized access",
  "timestamp": "2024-01-15T10:40:00Z"
}
```

---

### Access with Invalid Token
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer invalid_token_here"
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "statusCode": 401,
  "message": "Invalid or malformed token",
  "timestamp": "2024-01-15T10:40:00Z"
}
```

---

### Create Product Without Auth
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 99.99,
    "category": "'$CATEGORY_ID'",
    "stock": 10
  }'
```

**Expected Response (401 Unauthorized):**
```json
{
  "success": false,
  "statusCode": 401,
  "message": "Unauthorized access",
  "timestamp": "2024-01-15T10:40:00Z"
}
```

---

### Invalid Product Data
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Test",
    "description": "Short",
    "price": -10,
    "category": "'$CATEGORY_ID'",
    "stock": 10
  }'
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    "description must be at least 10 characters",
    "price must be greater than 0"
  ],
  "timestamp": "2024-01-15T10:40:00Z"
}
```

---

### Get Non-existent Product
```bash
curl -X GET "http://localhost:5000/api/products/invalid_product_id"
```

**Expected Response (404 Not Found):**
```json
{
  "success": false,
  "statusCode": 404,
  "message": "Product not found",
  "timestamp": "2024-01-15T10:40:00Z"
}
```

---

## 🧪 Batch Testing Script

Save this as `test-api.sh` and run with `bash test-api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:5000"
TOKEN=""

echo "🧪 Starting API Tests..."
echo ""

# Test 1: Health Check
echo "✅ Test 1: Health Check"
curl -s "$BASE_URL/api/health" | jq .
echo ""

# Test 2: Register
echo "✅ Test 2: Register User"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test'$RANDOM'@example.com",
    "password": "password123"
  }')
echo "$REGISTER_RESPONSE" | jq .
TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.data.token')
echo "Token: $TOKEN"
echo ""

# Test 3: Get Profile
echo "✅ Test 3: Get Profile"
curl -s "$BASE_URL/api/auth/profile" \
  -H "Authorization: Bearer $TOKEN" | jq .
echo ""

# Test 4: Get Categories
echo "✅ Test 4: Get Categories"
curl -s "$BASE_URL/api/categories" | jq .
echo ""

# Test 5: Get Products
echo "✅ Test 5: Get Products"
curl -s "$BASE_URL/api/products?limit=5" | jq .
echo ""

echo "🎉 All tests completed!"
```

---

## 📱 Using Postman

### Import Collection
1. Open Postman
2. Click "Import"
3. Select `postman-collection.json`
4. Click "Import"

### Set Environment Variables
1. Click "Environments" (bottom left)
2. Create new environment
3. Set variables:
   - `baseUrl`: http://localhost:5000
   - `token`: (auto-filled after login)
   - `categoryId`: (auto-filled after category creation)
   - `productId`: (auto-filled after product creation)

### Run Tests
1. Click on each request
2. Click "Send"
3. View response and status code
4. Automatic tests run if collection uses them

---

## 💻 Using VS Code REST Client

Install "REST Client" extension and create `requests.http`:

```http
### Variables
@baseUrl = http://localhost:5000
@token = (add token here after login)

### Health Check
GET {{baseUrl}}/api/health

### Register
POST {{baseUrl}}/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

### Login
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

### Get Profile
GET {{baseUrl}}/api/auth/profile
Authorization: Bearer {{token}}

### Get All Products
GET {{baseUrl}}/api/products?page=1&limit=10
```

---

## 📊 Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Success (GET, POST, PUT) |
| 201 | Created | Resource created (POST) |
| 400 | Bad Request | Invalid data, validation error |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | No permission (not creator, not admin) |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error |

---

## 🔄 Common Workflow

```bash
# 1. Register user
curl ... /auth/register → Get TOKEN

# 2. Login (to verify)
curl ... /auth/login → Get TOKEN

# 3. Create category
curl ... /categories → Get CATEGORY_ID

# 4. Create product
curl ... /products → Get PRODUCT_ID

# 5. Read products
curl ... /products

# 6. Update product
curl ... /products/$PRODUCT_ID

# 7. Delete product
curl ... /products/$PRODUCT_ID
```

---

For more details, see README.md and QUICK_START.md
