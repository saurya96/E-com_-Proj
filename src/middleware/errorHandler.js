import { errorResponse } from '../utils/responseFormatter.js';
import { ERROR_MESSAGES } from '../utils/errorMessages.js';

/**
 * Global Error Handler Middleware
 * Handles all types of errors in the application
 */
export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  // Default error values
  let statusCode = err.statusCode || 500;
  let message = err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  let errors = null;

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = ERROR_MESSAGES.VALIDATION_ERROR;
    errors = Object.values(err.errors).map(e => e.message);
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    errors = [message];
  }

  // Mongoose Cast Error (Invalid ID)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
    errors = [message];
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = ERROR_MESSAGES.INVALID_TOKEN;
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = ERROR_MESSAGES.TOKEN_EXPIRED;
  }

  // Send error response
  return res.status(statusCode).json(
    errorResponse(message, statusCode, errors)
  );
};

/**
 * 404 Not Found Middleware - Should be placed after all routes
 */
export const notFoundHandler = (req, res) => {
  return res.status(404).json(
    errorResponse(`Route ${req.originalUrl} not found`, 404)
  );
};

/**
 * Async Handler - Wraps async route handlers to catch errors
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
