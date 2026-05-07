import Category from '../models/Category.js';
import { successResponse, errorResponse } from '../utils/responseFormatter.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/errorMessages.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort('name');

  return res.status(200).json(
    successResponse(categories, 'Categories fetched successfully', 200)
  );
});

/**
 * @route   GET /api/categories/:id
 * @desc    Get single category by ID
 * @access  Public
 */
export const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json(
      errorResponse(ERROR_MESSAGES.CATEGORY_NOT_FOUND, 404)
    );
  }

  return res.status(200).json(
    successResponse(category, 'Category fetched successfully', 200)
  );
});

/**
 * @route   POST /api/categories
 * @desc    Create a new category
 * @access  Private/Admin
 */
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, image } = req.body;

  // Check if category already exists
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return res.status(400).json(
      errorResponse(ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS, 400)
    );
  }

  const category = new Category({
    name,
    description,
    image,
  });

  await category.save();

  return res.status(201).json(
    successResponse(category, SUCCESS_MESSAGES.CATEGORY_CREATED, 201)
  );
});

/**
 * @route   PUT /api/categories/:id
 * @desc    Update a category
 * @access  Private/Admin
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body;

  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json(
      errorResponse(ERROR_MESSAGES.CATEGORY_NOT_FOUND, 404)
    );
  }

  if (name) category.name = name;
  if (description) category.description = description;
  if (image) category.image = image;

  await category.save();

  return res.status(200).json(
    successResponse(category, 'Category updated successfully', 200)
  );
});

/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete a category (soft delete)
 * @access  Private/Admin
 */
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    return res.status(404).json(
      errorResponse(ERROR_MESSAGES.CATEGORY_NOT_FOUND, 404)
    );
  }

  category.isActive = false;
  await category.save();

  return res.status(200).json(
    successResponse({ id: category._id }, SUCCESS_MESSAGES.CATEGORY_DELETED, 200)
  );
});
