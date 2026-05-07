/**
 * Centralized Error Messages
 */

export const ERROR_MESSAGES = {
  // Authentication Errors
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'Email already registered',
  USER_NOT_FOUND: 'User not found',
  TOKEN_EXPIRED: 'Token has expired',
  INVALID_TOKEN: 'Invalid or malformed token',
  UNAUTHORIZED: 'Unauthorized access',
  
  // Product Errors
  PRODUCT_NOT_FOUND: 'Product not found',
  INVALID_PRODUCT_DATA: 'Invalid product data provided',
  INSUFFICIENT_STOCK: 'Insufficient product stock available',
  PRODUCT_ALREADY_EXISTS: 'Product already exists',
  
  // Category Errors
  CATEGORY_NOT_FOUND: 'Category not found',
  CATEGORY_ALREADY_EXISTS: 'Category already exists',
  
  // Validation Errors
  VALIDATION_ERROR: 'Validation failed',
  INVALID_EMAIL: 'Invalid email format',
  INVALID_PRICE: 'Price must be greater than 0',
  INVALID_STOCK: 'Stock must be a non-negative number',
  
  // Database Errors
  DATABASE_ERROR: 'Database error occurred',
  DUPLICATE_KEY_ERROR: 'Duplicate key error',
  
  // Server Errors
  INTERNAL_SERVER_ERROR: 'Internal server error',
  METHOD_NOT_ALLOWED: 'Method not allowed',
  NOT_FOUND: 'Resource not found',
  BAD_REQUEST: 'Bad request',
  
  // Permission Errors
  PERMISSION_DENIED: 'You do not have permission to perform this action',
  ADMIN_ONLY: 'This action is only available to administrators',
};

export const SUCCESS_MESSAGES = {
  USER_REGISTERED: 'User registered successfully',
  USER_LOGGED_IN: 'User logged in successfully',
  PRODUCT_CREATED: 'Product created successfully',
  PRODUCT_UPDATED: 'Product updated successfully',
  PRODUCT_DELETED: 'Product deleted successfully',
  PRODUCTS_FETCHED: 'Products fetched successfully',
  CATEGORY_CREATED: 'Category created successfully',
  CATEGORY_DELETED: 'Category deleted successfully',
  PROFILE_FETCHED: 'Profile fetched successfully',
};
