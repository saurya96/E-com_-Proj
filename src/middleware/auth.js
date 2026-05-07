import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/responseFormatter.js';
import { ERROR_MESSAGES } from '../utils/errorMessages.js';
import User from '../models/User.js';

/**
 * Authentication Middleware - Verifies JWT token and attaches user to request
 */
export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json(
        errorResponse(ERROR_MESSAGES.UNAUTHORIZED, 401)
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json(
        errorResponse(ERROR_MESSAGES.USER_NOT_FOUND, 401)
      );
    }

    req.user = user;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json(
        errorResponse(ERROR_MESSAGES.TOKEN_EXPIRED, 401)
      );
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json(
        errorResponse(ERROR_MESSAGES.INVALID_TOKEN, 401)
      );
    }
    return res.status(401).json(
      errorResponse(ERROR_MESSAGES.UNAUTHORIZED, 401)
    );
  }
};

/**
 * Admin Authorization Middleware
 */
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json(
      errorResponse(ERROR_MESSAGES.ADMIN_ONLY, 403)
    );
  }
  next();
};

/**
 * Optional Authentication - Attach user if token is present
 */
export const optionalAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
    }
    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};
