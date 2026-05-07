# 🛍️ E-Commerce Product Catalog API

A professional, production-ready E-commerce Product Catalog API built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**. This API provides comprehensive CRUD operations for product management with robust authentication, validation, and error handling.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Objective](#objective)
- [Tools & Technologies](#tools--technologies)
- [System Architecture](#system-architecture)
- [Project Folder Structure](#project-folder-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Installation & Setup](#installation--setup)
- [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [API Testing Guide](#api-testing-guide)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Challenges Faced](#challenges-faced)
- [Conclusion](#conclusion)

---

## 🎯 Project Overview

This is a comprehensive E-commerce Product Catalog API designed to manage product listings, categories, and user authentication. The API supports:

- **User Authentication**: JWT-based registration and login system
- **Product Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Advanced Filtering**: Filter products by category, price range, and availability
- **Pagination & Sorting**: Efficient data retrieval with customizable pagination
- **Role-Based Access**: User and Admin roles with different permissions
- **Data Validation**: Comprehensive input validation and error handling
- **Professional Responses**: Standardized JSON response format across all endpoints

---

## 🎓 Objective

The objective of this project is to build a **professional-grade REST API** that demonstrates:

1. **API Design Excellence** - Clean, RESTful endpoint design following industry standards
2. **Database Integration** - Proper MongoDB schema design with relationships and validations
3. **Authentication & Authorization** - Secure JWT-based authentication with role-based access control
4. **Error Handling** - Comprehensive error handling with meaningful error messages
5. **Code Structure** - Professional MVC architecture with separation of concerns
6. **Scalability** - Code designed for easy scaling and maintenance
7. **Testing & Documentation** - Complete API documentation and Postman testing collection

---

## 🛠️ Tools & Technologies

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Node.js v14+ | JavaScript runtime environment |
| **Framework** | Express.js | Web application framework |
| **Database** | MongoDB (Atlas) | NoSQL document database |
| **ODM** | Mongoose | MongoDB object modeling |
| **Authentication** | JWT (jsonwebtoken) | Secure token-based authentication |
| **Password Hashing** | bcryptjs | Secure password hashing |
| **Input Validation** | Joi | Schema validation library |
| **HTTP Logging** | Morgan | HTTP request logging middleware |
| **CORS** | cors | Cross-Origin Resource Sharing middleware |
| **Environment Config** | dotenv | Environment variable management |
| **Testing** | Postman | API testing & documentation tool |
| **Deployment** | Render | Cloud hosting platform |
| **Version Control** | Git | Code version management |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                        │
│  (Postman, Web Browser, Mobile App, Third-party Services) │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/HTTPS Requests
                         │
┌────────────────────────▼────────────────────────────────────┐
│                     EXPRESS SERVER                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Middleware Layer                                     │  │
│  │ • CORS Handling                                      │  │
│  │ • Request Logging (Morgan)                           │  │
│  │ • Body Parser                                        │  │
│  │ • Authentication (JWT)                               │  │
│  │ • Validation (Joi)                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────────┐   │
│  │ Routing Layer                                      │   │
│  │ • /api/auth      → Authentication Routes           │   │
│  │ • /api/products  → Product Management Routes       │   │
│  │ • /api/categories → Category Management Routes    │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────────┐   │
│  │ Controller Layer (Business Logic)                  │   │
│  │ • authController    → User auth logic              │   │
│  │ • productController → CRUD operations              │   │
│  │ • categoryController → Category operations         │   │
│  └──────────────────────┬──────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────────┐   │
│  │ Model Layer (Data Models)                          │   │
│  │ • User Schema                                       │   │
│  │ • Product Schema                                    │   │
│  │ • Category Schema                                   │   │
│  └──────────────────────┬──────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ Query/Insert/Update/Delete
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    MONGODB DATABASE                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Collections:                                         │  │
│  │ • users → User accounts & authentication            │  │
│  │ • products → Product catalog & inventory           │  │
│  │ • categories → Product categories                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Folder Structure

```
e-com/
│
├── src/
│   ├── config/
│   │   ├── db.js                    # MongoDB connection setup
│   │   └── environment.js           # Environment configuration
│   │
│   ├── models/
│   │   ├── User.js                  # User schema with password hashing
│   │   ├── Product.js               # Product schema with validations
│   │   └── Category.js              # Category schema
│   │
│   ├── controllers/
│   │   ├── authController.js        # Register, Login, Profile management
│   │   ├── productController.js     # CRUD operations for products
│   │   └── categoryController.js    # CRUD operations for categories
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # Authentication endpoints
│   │   ├── productRoutes.js         # Product endpoints
│   │   ├── categoryRoutes.js        # Category endpoints
│   │   └── index.js                 # Route aggregation (optional)
│   │
│   ├── middleware/
│   │   ├── auth.js                  # JWT verification & authorization
│   │   ├── errorHandler.js          # Global error handling
│   │   ├── logger.js                # Request logging
│   │   └── validation.js            # Input validation schemas
│   │
│   ├── utils/
│   │   ├── responseFormatter.js     # Standardized response format
│   │   └── errorMessages.js         # Centralized error messages
│   │
│   └── app.js                       # Express app configuration
│
├── server.js                        # Server entry point
├── .env                             # Environment variables (local)
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies & scripts
├── README.md                        # This file
└── postman-collection.json          # Postman API testing collection
```

### Folder Structure Explanation

- **config/**: Centralized configuration files for database and environment variables
- **models/**: Mongoose schemas defining data structure and validations
- **controllers/**: Business logic for handling requests and responses
- **routes/**: API endpoint definitions and routing
- **middleware/**: Reusable middleware for auth, validation, error handling, logging
- **utils/**: Utility functions for response formatting and error management
- **app.js**: Express application setup with all middleware
- **server.js**: Entry point that starts the server and connects to database

---

## 🗄️ Database Schema

### 1. User Schema

```javascript
{
  _id: ObjectId,
  name: String (required, 2-50 chars),
  email: String (required, unique, email validation),
  password: String (hashed, required, min 6 chars),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Field Details:**
- `name`: User's full name, required for identification
- `email`: Unique email for login, validated against email format
- `password`: Hashed using bcryptjs before storage (never stored in plain text)
- `role`: Determines permissions (user = can create products, admin = full access)
- `isActive`: Soft delete flag, allows deactivating accounts
- `lastLogin`: Tracks user's last login time for security audits

---

### 2. Category Schema

```javascript
{
  _id: ObjectId,
  name: String (required, unique, 2-50 chars),
  description: String (max 500 chars),
  image: String (URL),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Field Details:**
- `name`: Category name (e.g., "Electronics", "Clothing")
- `description`: Optional category description
- `image`: Category thumbnail image URL
- `isActive`: Soft delete flag for logical deletion

---

### 3. Product Schema

```javascript
{
  _id: ObjectId,
  name: String (required, unique, 2-100 chars, indexed),
  description: String (required, 10-2000 chars),
  price: Number (required, > 0),
  category: ObjectId (ref: Category, required),
  stock: Number (required, >= 0),
  images: Array of Strings (max 5),
  rating: Number (0-5, default: 0),
  discount: Number (0-100%, default: 0),
  sku: String (unique, for inventory tracking),
  tags: Array of Strings (for searching),
  createdBy: ObjectId (ref: User, required),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Field Details:**
- `name`: Product name, indexed for fast search
- `description`: Detailed product description
- `price`: Product cost in currency units
- `category`: Reference to Category document for organization
- `stock`: Available quantity (inventory management)
- `images`: Product images (up to 5 URLs)
- `rating`: Customer rating (0-5 scale)
- `discount`: Percentage discount applied to price
- `sku`: Stock Keeping Unit for inventory tracking
- `tags`: Search tags (e.g., "popular", "sale", "new")
- `createdBy`: Reference to User who created the product
- `isActive`: Soft delete flag (product still exists but not visible)

**Virtual Field:**
- `discountedPrice`: Calculated as `price * (100 - discount) / 100`

**Indexes:**
- Full-text search on `name` and `description`
- Category reference for fast category queries
- Creator reference for user-specific queries
- Price index for range queries
- CreatedAt for sorting by date

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### 1. Authentication Endpoints

#### Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...user_id...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

#### User Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "...user_id...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "lastLogin": "2024-01-15T10:35:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-15T10:35:00Z"
}
```

---

#### Get User Profile (Protected)
```http
GET /auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Profile fetched successfully",
  "data": {
    "_id": "...user_id...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:35:00Z"
  },
  "timestamp": "2024-01-15T10:40:00Z"
}
```

---

### 2. Product Endpoints

#### Get All Products (with pagination, filtering, sorting)
```http
GET /products?page=1&limit=10&category=...&minPrice=100&maxPrice=5000&sort=-createdAt
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category ObjectId
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `sort`: Sort field (prefix with `-` for descending)

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Products fetched successfully",
  "data": [
    {
      "_id": "...product_id...",
      "name": "Laptop Pro",
      "description": "High-performance laptop",
      "price": 1299.99,
      "discount": 10,
      "discountedPrice": 1169.99,
      "stock": 50,
      "rating": 4.5,
      "category": {
        "_id": "...category_id...",
        "name": "Electronics"
      },
      "createdBy": {
        "_id": "...user_id...",
        "name": "Admin User",
        "email": "admin@example.com"
      },
      "createdAt": "2024-01-10T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  },
  "timestamp": "2024-01-15T10:40:00Z"
}
```

---

#### Get Single Product
```http
GET /products/:productId
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Product fetched successfully",
  "data": {
    "_id": "...product_id...",
    "name": "Laptop Pro",
    "description": "High-performance laptop with 16GB RAM",
    "price": 1299.99,
    "discount": 10,
    "discountedPrice": 1169.99,
    "stock": 50,
    "rating": 4.5,
    "category": {
      "_id": "...category_id...",
      "name": "Electronics"
    },
    "createdBy": {
      "_id": "...user_id...",
      "name": "Admin User"
    },
    "createdAt": "2024-01-10T10:00:00Z",
    "updatedAt": "2024-01-10T10:00:00Z"
  },
  "timestamp": "2024-01-15T10:40:00Z"
}
```

---

#### Create Product (Protected)
```http
POST /products
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with precision tracking",
  "price": 29.99,
  "category": "...category_id...",
  "stock": 200,
  "images": ["https://image1.jpg", "https://image2.jpg"],
  "discount": 5,
  "sku": "MOUSE-001",
  "tags": ["electronics", "accessories", "wireless"]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Product created successfully",
  "data": {
    "_id": "...new_product_id...",
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with precision tracking",
    "price": 29.99,
    "discount": 5,
    "discountedPrice": 28.49,
    "stock": 200,
    "category": {
      "_id": "...category_id...",
      "name": "Electronics"
    },
    "createdBy": {
      "_id": "...user_id...",
      "name": "John Doe"
    },
    "createdAt": "2024-01-15T10:45:00Z"
  },
  "timestamp": "2024-01-15T10:45:00Z"
}
```

---

#### Update Product (Protected)
```http
PUT /products/:productId
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "price": 24.99,
  "discount": 10,
  "stock": 150
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Product updated successfully",
  "data": {
    "_id": "...product_id...",
    "name": "Wireless Mouse",
    "price": 24.99,
    "discount": 10,
    "discountedPrice": 22.49,
    "stock": 150,
    "updatedAt": "2024-01-15T10:50:00Z"
  },
  "timestamp": "2024-01-15T10:50:00Z"
}
```

---

#### Delete Product (Protected)
```http
DELETE /products/:productId
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Product deleted successfully",
  "data": {
    "id": "...product_id..."
  },
  "timestamp": "2024-01-15T10:55:00Z"
}
```

---

#### Get Products by Category
```http
GET /products/category/:categoryId?page=1&limit=10
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Products fetched successfully",
  "data": [ /* Product array */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  },
  "timestamp": "2024-01-15T10:40:00Z"
}
```

---

### 3. Category Endpoints

#### Get All Categories
```http
GET /categories
```

**Response (200 OK):**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Categories fetched successfully",
  "data": [
    {
      "_id": "...category_id...",
      "name": "Electronics",
      "description": "Electronic devices and gadgets",
      "image": "https://category-image.jpg",
      "createdAt": "2024-01-01T00:00:00Z"
    },
    {
      "_id": "...category_id2...",
      "name": "Clothing",
      "description": "Fashion and apparel",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "timestamp": "2024-01-15T10:40:00Z"
}
```

---

#### Create Category (Admin Only)
```http
POST /categories
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Books",
  "description": "Books and literature",
  "image": "https://books-category.jpg"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Category created successfully",
  "data": {
    "_id": "...new_category_id...",
    "name": "Books",
    "description": "Books and literature",
    "image": "https://books-category.jpg",
    "createdAt": "2024-01-15T11:00:00Z"
  },
  "timestamp": "2024-01-15T11:00:00Z"
}
```

---

## 🔐 Authentication

### Authentication Method: JWT (JSON Web Tokens)

#### How JWT Works in This API:

1. **Registration**: User creates account with email and password
2. **Hashing**: Password is hashed using bcryptjs (never stored in plain text)
3. **Login**: User provides credentials, password is verified
4. **Token Generation**: Upon successful login, a JWT token is generated
5. **Token Storage**: Client stores the token (localStorage, session, etc.)
6. **Authorization**: Client sends token in `Authorization` header for protected routes
7. **Token Verification**: Server verifies token signature and expiration
8. **Access Granted/Denied**: User gains access to protected resources

#### Token Structure:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzYzOWIyMzQ4YzFiY2MxYTAxOWZkYTUiLCJpYXQiOjE2NzMyNDQzNDUsImV4cCI6MTY3Mzg0OTEwNX0.kzN_xyz123...
```

**Three parts:**
- **Header**: Algorithm (HS256) and token type (JWT)
- **Payload**: User ID and timestamps
- **Signature**: Verification signature using JWT_SECRET

#### Configuration:

- **JWT_SECRET**: Secret key used to sign and verify tokens (set in .env)
- **JWT_EXPIRE**: Token expiration time (default: 7 days)

#### Request with Token:

```http
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Token Expiration & Refresh:

- Token expires after set duration (default: 7 days)
- User must login again to get new token
- Expired token returns 401 Unauthorized status

#### Security Features:

✅ Passwords hashed with bcryptjs (10 salt rounds)  
✅ JWT tokens signed with strong secret key  
✅ Token expires automatically  
✅ Unauthorized requests rejected (401/403)  
✅ Role-based access control (user/admin)  
✅ No sensitive data in token payload  

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js**: v14 or higher ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **MongoDB Atlas Account**: Free cloud database ([Sign up](https://www.mongodb.com/cloud/atlas))
- **Git**: For version control ([Download](https://git-scm.com/))

### Step 1: Clone or Create Project

```bash
# Create project directory
mkdir e-com
cd e-com

# Initialize git (optional)
git init
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (JWT auth)
- bcryptjs (password hashing)
- joi (validation)
- cors (cross-origin)
- morgan (logging)
- dotenv (environment config)
- nodemon (development)

### Step 3: Setup MongoDB Atlas

1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**: Click "Build a Database" and select a free tier cluster
3. **Get Connection String**:
   - Click "Connect" on your cluster
   - Select "Drivers" 
   - Copy the connection string
   - Replace `<username>`, `<password>`, and `<database_name>`

Example:
```
mongodb+srv://user:password@cluster.mongodb.net/ecommerce_db?retryWrites=true&w=majority
```

### Step 4: Configure Environment Variables

1. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

2. Update `.env` with your values:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ecommerce_db?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d

# App
API_VERSION=v1
APP_NAME=E-Commerce Product Catalog API
```

**⚠️ Important Security Notes:**
- Change `JWT_SECRET` to a strong, random string
- Never commit `.env` file to Git
- Use strong MongoDB credentials
- In production, use environment-specific secrets

---

## 🏃 Running Locally

### Development Mode (with auto-reload)

```bash
npm run dev
```

**Output:**
```
============================================================
🚀 E-Commerce Product Catalog API is running
📍 Server URL: http://localhost:5000
🔗 API Health Check: http://localhost:5000/api/health
📚 API Docs: http://localhost:5000/api
🌍 Environment: development
============================================================
```

### Production Mode

```bash
npm start
```

### Verify Server is Running

Open in browser or use curl:

```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "success": true,
  "message": "✅ API is running successfully",
  "timestamp": "2024-01-15T10:40:00Z"
}
```

---

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_key_change_this` |
| `PORT` | Server port | `5000` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `JWT_EXPIRE` | Token expiration | `7d` |
| `API_VERSION` | API version | `v1` |
| `APP_NAME` | Application name | `E-Commerce API` |

---

## 🧪 API Testing Guide

### Option 1: Using Postman (Recommended)

#### Import Postman Collection

1. Open Postman
2. Click "Import" button
3. Select the `postman-collection.json` file
4. Set environment variables in Postman:
   - `baseUrl`: `http://localhost:5000`
   - `token`: (Will be auto-filled after login)

#### Testing Workflow

1. **Register User**
   - Send POST to `/api/auth/register`
   - Response includes auth token
   - Token auto-saves to Postman variable

2. **Get Profile**
   - Send GET to `/api/auth/profile`
   - Uses stored token automatically
   - Verify user data is returned

3. **Create Category**
   - Admin only: Create a category first
   - Required for creating products

4. **Create Product**
   - Send POST to `/api/products`
   - Include category ID
   - Verify product is created

5. **Get Products**
   - Send GET to `/api/products`
   - Test pagination: `?page=1&limit=5`
   - Test filtering: `?category=...&minPrice=100`

6. **Update/Delete**
   - Update product: PUT `/api/products/:id`
   - Delete product: DELETE `/api/products/:id`

### Option 2: Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'

# Get Profile (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"

# Get All Products
curl -X GET "http://localhost:5000/api/products?page=1&limit=10"
```

### Option 3: Using REST Client VS Code Extension

Install the "REST Client" extension in VS Code and create `.http` files:

```http
### Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 🌐 Deployment

### Deploy on Render (Recommended)

#### Step 1: Prepare Project

Ensure your project is ready:
- ✅ All code committed to Git/GitHub
- ✅ `.env` file NOT committed (check `.gitignore`)
- ✅ `package.json` has correct start script: `"start": "node server.js"`

#### Step 2: Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: E-commerce API"
git remote add origin https://github.com/your-username/ecommerce-api.git
git push -u origin main
```

#### Step 3: Create Render Account & Deploy

1. Go to [Render.com](https://render.com)
2. Click "Sign up" and create account
3. Click "New +" button → "Web Service"
4. Connect GitHub repository
5. Configure settings:

   ```
   Name: ecommerce-api
   Environment: Node
   Build Command: npm install
   Start Command: node server.js
   ```

6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your secret key
   - `NODE_ENV`: production
   - `PORT`: 10000

7. Click "Deploy"
8. Wait for deployment to complete
9. Get public URL from Render dashboard

#### Step 4: Test Deployed API

```bash
curl https://your-app-name.onrender.com/api/health
```

#### Troubleshooting Deployment

- **Build fails**: Check `npm install` output in logs
- **Database won't connect**: Verify MongoDB Atlas IP whitelist
- **Slow startup**: Cold start on free tier, wait 30 seconds
- **502 Error**: Check application logs on Render dashboard

---

## 📸 Screenshots

### Screenshot 1: API Health Check
![Health Check](docs/screenshots/health-check.png)
```
GET http://localhost:5000/api/health
Status: 200 OK
Response shows "API is running successfully"
```

### Screenshot 2: User Registration in Postman
![Register](docs/screenshots/register.png)
```
POST /api/auth/register
Status: 201 Created
Response includes user data and JWT token
```

### Screenshot 3: Product Creation
![Create Product](docs/screenshots/create-product.png)
```
POST /api/products
Status: 201 Created
Response includes created product with all details
```

### Screenshot 4: Get All Products with Pagination
![Get Products](docs/screenshots/get-products.png)
```
GET /api/products?page=1&limit=10
Status: 200 OK
Response includes products and pagination info
```

### Screenshot 5: MongoDB Collections
![MongoDB](docs/screenshots/mongodb-collections.png)
```
Database: ecommerce_db
Collections visible in MongoDB Atlas:
- users
- products
- categories
```

### Screenshot 6: Product Filtering
![Filtering](docs/screenshots/filtering.png)
```
GET /api/products?category=...&minPrice=100&maxPrice=5000
Status: 200 OK
Response filtered by category and price range
```

### Screenshot 7: Error Handling
![Error Response](docs/screenshots/error-handling.png)
```
POST /api/auth/register (with existing email)
Status: 400 Bad Request
Response: "Email already registered"
```

### Screenshot 8: Deployed API on Render
![Render Deployment](docs/screenshots/render-deployment.png)
```
Deployed URL: https://ecommerce-api-...onrender.com
All endpoints accessible publicly
```

---

## 🤔 Challenges Faced

### Challenge 1: JWT Token Management
**Problem**: How to securely manage JWT tokens across requests?

**Solution**: 
- Tokens stored in client-side storage (localStorage in Postman)
- Tokens included in Authorization header for all protected routes
- Implemented token expiration and refresh logic
- Added proper error handling for expired tokens

### Challenge 2: Password Security
**Problem**: How to ensure passwords are never stored in plain text?

**Solution**:
- Used bcryptjs to hash passwords before storage
- Implemented `comparePassword()` method for verification
- Set `select: false` on password field to exclude from queries
- Added password validation (minimum 6 characters)

### Challenge 3: Authorization Logic
**Problem**: How to control who can update/delete products?

**Solution**:
- Implemented creator-based authorization
- Product creator or admin can edit/delete
- Other users receive 403 Forbidden error
- Added role-based access control (user/admin)

### Challenge 4: Data Validation
**Problem**: How to validate all incoming data consistently?

**Solution**:
- Implemented Joi validation schemas for all endpoints
- Created reusable validation middleware
- Return clear error messages for invalid data
- Used both model-level and middleware-level validation

### Challenge 5: Error Handling
**Problem**: How to handle errors consistently across API?

**Solution**:
- Created standardized error response format
- Implemented global error handler middleware
- Centralized error messages in constants
- Proper HTTP status codes (400, 401, 403, 404, 500)
- Detailed error information for debugging

### Challenge 6: Pagination & Filtering
**Problem**: How to efficiently retrieve large product sets?

**Solution**:
- Implemented pagination with page and limit parameters
- Added MongoDB indexes for fast queries
- Implemented filtering by category, price, stock
- Sorting by various fields (name, price, date, rating)
- Used lean() for faster read queries

### Challenge 7: Soft Delete Implementation
**Problem**: How to delete products while maintaining referential integrity?

**Solution**:
- Implemented soft delete with `isActive` boolean flag
- Products still exist in database but not visible
- Allows data recovery and audit trails
- Filtered out inactive items in all queries

---

## 📝 Conclusion

This E-commerce Product Catalog API demonstrates professional-grade backend development practices:

### ✅ Achievements

1. **Complete CRUD Operations**: All Create, Read, Update, Delete operations implemented
2. **Robust Authentication**: JWT-based secure authentication with password hashing
3. **Professional Code Structure**: Clean MVC architecture with separation of concerns
4. **Database Integration**: MongoDB with Mongoose ODM, proper schemas and validations
5. **Advanced Querying**: Pagination, filtering, and sorting capabilities
6. **Error Handling**: Comprehensive error handling with meaningful messages
7. **Request Validation**: Input validation using Joi schemas
8. **Logging & Monitoring**: HTTP request logging with Morgan
9. **API Documentation**: Complete documentation with examples
10. **Cloud Deployment**: Ready for production deployment on Render

### 🎯 Learning Outcomes

This project provides hands-on experience in:
- **RESTful API Design**: Understanding REST principles and best practices
- **Node.js & Express**: Building scalable backend applications
- **MongoDB & Mongoose**: NoSQL database design and operations
- **Authentication & Authorization**: Implementing JWT-based security
- **Middleware Architecture**: Creating and composing middleware functions
- **Error Handling**: Professional error management strategies
- **API Testing**: Using Postman for comprehensive API testing
- **Cloud Deployment**: Deploying applications to production servers
- **Code Organization**: Structuring large projects for maintainability
- **Security Best Practices**: Implementing security measures in APIs

### 🚀 Future Enhancements

Potential improvements for Phase 2:
1. **Search Functionality**: Full-text search on product name and description
2. **Payment Integration**: Stripe/Razorpay for payments
3. **Email Notifications**: Welcome emails, order confirmations
4. **Advanced Caching**: Redis caching for frequently accessed data
5. **Rate Limiting**: Protect API from abuse
6. **API Documentation**: Swagger/OpenAPI documentation
7. **Unit Testing**: Jest/Mocha test suite
8. **Order Management**: Shopping cart and order processing
9. **Reviews & Ratings**: Product review system
10. **Admin Dashboard**: Frontend UI for management

---

## 📞 Support & Contact

For questions or issues:
1. Check the [Troubleshooting](#troubleshooting-deployment) section
2. Review code comments for implementation details
3. Check MongoDB and Render documentation
4. Verify all environment variables are set correctly

---

## 📜 License

MIT License - Feel free to use this project for learning and development.

---

**Made with ❤️ for learning professional backend development**

Happy coding! 🎉
