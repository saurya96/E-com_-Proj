#!/bin/bash

# 🔍 E-Commerce API - Project Verification Script
# This script checks if all files are properly set up

echo "🔍 E-Commerce Product Catalog API - Verification Check"
echo "==========================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
CHECKS=0
PASSED=0

# Function to check file existence
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} Found: $1"
        ((PASSED++))
    else
        echo -e "${RED}❌${NC} Missing: $1"
    fi
    ((CHECKS++))
}

# Function to check directory
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} Found: $1/"
        ((PASSED++))
    else
        echo -e "${RED}❌${NC} Missing: $1/"
    fi
    ((CHECKS++))
}

echo "📁 Checking Project Structure..."
echo ""

# Main files
check_file "server.js"
check_file "package.json"
check_file "package-lock.json"
check_file ".env"
check_file ".env.example"
check_file ".gitignore"

echo ""
echo "📄 Checking Documentation Files..."
echo ""

check_file "README.md"
check_file "QUICK_START.md"
check_file "API_TESTING.md"
check_file "DEPLOYMENT.md"
check_file "INDEX.md"
check_file "postman-collection.json"

echo ""
echo "🔧 Checking Source Code Directories..."
echo ""

check_dir "src"
check_dir "src/config"
check_dir "src/models"
check_dir "src/controllers"
check_dir "src/routes"
check_dir "src/middleware"
check_dir "src/utils"

echo ""
echo "📝 Checking Configuration Files..."
echo ""

check_file "src/config/db.js"
check_file "src/config/environment.js"

echo ""
echo "🗄️ Checking Model Files..."
echo ""

check_file "src/models/User.js"
check_file "src/models/Product.js"
check_file "src/models/Category.js"

echo ""
echo "🎮 Checking Controller Files..."
echo ""

check_file "src/controllers/authController.js"
check_file "src/controllers/productController.js"
check_file "src/controllers/categoryController.js"

echo ""
echo "🛣️ Checking Route Files..."
echo ""

check_file "src/routes/authRoutes.js"
check_file "src/routes/productRoutes.js"
check_file "src/routes/categoryRoutes.js"

echo ""
echo "⚙️ Checking Middleware Files..."
echo ""

check_file "src/middleware/auth.js"
check_file "src/middleware/errorHandler.js"
check_file "src/middleware/logger.js"
check_file "src/middleware/validation.js"

echo ""
echo "🔧 Checking Utility Files..."
echo ""

check_file "src/utils/responseFormatter.js"
check_file "src/utils/errorMessages.js"

echo ""
echo "📦 Checking App File..."
echo ""

check_file "src/app.js"

echo ""
echo "==========================================================="
echo ""
echo "📊 Verification Summary"
echo "==========================================================="
echo ""

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅${NC} Dependencies Installed (node_modules found)"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠️${NC} Dependencies Not Installed (run: npm install)"
fi
((CHECKS++))

echo ""
echo "Results: $PASSED / $CHECKS checks passed"
echo ""

if [ $PASSED -eq $CHECKS ]; then
    echo -e "${GREEN}🎉 All checks passed! Project is ready.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Update .env with MongoDB URI"
    echo "2. Run: npm run dev"
    echo "3. Visit: http://localhost:5000/api/health"
    echo "4. Import postman-collection.json into Postman"
    echo ""
    exit 0
else
    echo -e "${RED}⚠️ Some files are missing. Please check above.${NC}"
    echo ""
    exit 1
fi
