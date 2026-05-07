# 🚀 Quick Start Guide - E-Commerce Product Catalog API

This guide will help you get the API running in minutes!

---

## ⚡ 5-Minute Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string
4. Copy `.env.example` to `.env` and update:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ecommerce_db
JWT_SECRET=your_secret_key_here
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Verify it's Working
Open browser: http://localhost:5000/api/health

You should see:
```json
{
  "success": true,
  "message": "✅ API is running successfully"
}
```

---

## 🧪 Test Your First API Call

### Using Postman:
1. Import `postman-collection.json` into Postman
2. Set `baseUrl` to `http://localhost:5000`
3. Run "Register" request
4. Run "Get Profile" request

### Using cURL:
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Get Products (no auth needed)
curl http://localhost:5000/api/products
```

---

## 📦 Project Structure

```
e-com/
├── src/
│   ├── config/      → Database & environment config
│   ├── models/      → MongoDB schemas
│   ├── controllers/ → Business logic
│   ├── routes/      → API endpoints
│   ├── middleware/  → Auth, validation, error handling
│   ├── utils/       → Helpers & formatters
│   └── app.js       → Express setup
├── server.js        → Entry point
├── .env            → Configuration (git ignored)
├── package.json    → Dependencies
└── README.md       → Full documentation
```

---

## 🔗 Key Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Create user account | ❌ |
| POST | `/api/auth/login` | Login and get token | ❌ |
| GET | `/api/auth/profile` | Get user profile | ✅ |
| GET | `/api/products` | List all products | ❌ |
| POST | `/api/products` | Create product | ✅ |
| PUT | `/api/products/:id` | Update product | ✅ |
| DELETE | `/api/products/:id` | Delete product | ✅ |
| GET | `/api/categories` | List categories | ❌ |
| POST | `/api/categories` | Create category | ✅ |

---

## 🛠️ Available Scripts

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start

# View dependencies
npm list

# Update dependencies
npm update
```

---

## 🔐 Authentication Flow

1. **Register** → Get token
2. **Use token** → Add to header: `Authorization: Bearer TOKEN`
3. **Access protected routes** → Token is verified
4. **Token expires** → Login again to get new token

Example header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module"
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
npm install
```

### Issue: "MongoDB connection failed"
```
Check:
1. MONGODB_URI is correct in .env
2. IP whitelist in MongoDB Atlas
3. Credentials (username/password) are correct
4. Database name is correct
```

### Issue: "Port 5000 already in use"
```bash
# Use different port
PORT=3000 npm run dev

# Or kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

### Issue: "Token verification failed"
```
Make sure:
1. Token is sent in Authorization header
2. Format is: Bearer {token}
3. Token hasn't expired
4. JWT_SECRET matches between login and verification
```

---

## 📊 Testing Checklist

### Basic Testing
- [ ] Server starts without errors
- [ ] Health check endpoint works
- [ ] Register endpoint creates user
- [ ] Login endpoint returns token
- [ ] Get profile endpoint works with token
- [ ] Get products returns list
- [ ] Create product requires token

### Advanced Testing
- [ ] Filter products by category
- [ ] Filter products by price range
- [ ] Pagination works (page, limit)
- [ ] Sorting works (by name, price, date)
- [ ] Update only works for creator
- [ ] Delete only works for creator
- [ ] Error messages are clear

---

## 🚀 Next Steps

1. **Add more categories** via POST /api/categories
2. **Create sample products** via POST /api/products
3. **Test filtering** with query parameters
4. **Set up environment variables** for production
5. **Deploy to Render** (see README.md for instructions)
6. **Monitor logs** in Render dashboard
7. **Test deployed API** with public URL

---

## 📚 Full Documentation

See `README.md` for:
- Complete API documentation
- All endpoint examples
- System architecture
- Database schema details
- Deployment instructions
- Screenshots
- Challenges and solutions

---

## 💡 Pro Tips

1. **Use Postman environment variables**
   - Set `baseUrl` = http://localhost:5000
   - Tokens auto-save after login

2. **View logs in Render**
   - Login to dashboard
   - Click your app
   - View logs tab

3. **Test in different formats**
   - Use Postman, cURL, REST Client
   - Test all HTTP methods
   - Test with and without auth

4. **Monitor MongoDB**
   - Go to MongoDB Atlas dashboard
   - View data in collections
   - Check database size

---

## ❓ Need Help?

1. Check the README.md file
2. Review code comments
3. Check error messages (they're descriptive)
4. Verify environment variables
5. Check MongoDB connection
6. Review Postman request format

---

Happy coding! 🎉
