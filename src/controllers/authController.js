import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/responseFormatter.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/errorMessages.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * Generate JWT Token
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json(
      errorResponse(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS, 400)
    );
  }

  // Create new user
  const user = new User({
    name,
    email,
    password,
  });

  await user.save();

  // Generate token
  const token = generateToken(user._id);

  return res.status(201).json(
    successResponse(
      {
        user: user.toJSON(),
        token,
      },
      SUCCESS_MESSAGES.USER_REGISTERED,
      201
    )
  );
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT token
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user with password field selected
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json(
      errorResponse(ERROR_MESSAGES.INVALID_CREDENTIALS, 401)
    );
  }

  // Compare password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json(
      errorResponse(ERROR_MESSAGES.INVALID_CREDENTIALS, 401)
    );
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Generate token
  const token = generateToken(user._id);

  return res.status(200).json(
    successResponse(
      {
        user: user.toJSON(),
        token,
      },
      SUCCESS_MESSAGES.USER_LOGGED_IN,
      200
    )
  );
});

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json(
      errorResponse(ERROR_MESSAGES.USER_NOT_FOUND, 404)
    );
  }

  return res.status(200).json(
    successResponse(user, SUCCESS_MESSAGES.PROFILE_FETCHED, 200)
  );
});

/**
 * @route   PUT /api/auth/profile
 * @desc    Update current user profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json(
      errorResponse(ERROR_MESSAGES.USER_NOT_FOUND, 404)
    );
  }

  // Check if email is already taken by another user
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(
        errorResponse(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS, 400)
      );
    }
    user.email = email;
  }

  if (name) {
    user.name = name;
  }

  await user.save();

  return res.status(200).json(
    successResponse(user, 'Profile updated successfully', 200)
  );
});
