import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/responseFormatter.js';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/errorMessages.js';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * @route   GET /api/products
 * @desc    Get all products with pagination, filtering, and sorting
 * @access  Public
 */
export const getAllProducts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, minPrice, maxPrice, sort = '-createdAt' } = req.query;

  // Build filter object
  const filter = { isActive: true };

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  // Execute query
  const products = await Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit))
    .populate('category', 'name')
    .populate('createdBy', 'name email');

  // Get total count
  const total = await Product.countDocuments(filter);

  return res.status(200).json(
    paginatedResponse(products, page, limit, total, SUCCESS_MESSAGES.PRODUCTS_FETCHED)
  );
});

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate('category')
    .populate('createdBy', 'name email');

  if (!product) {
    return res.status(404).json(
      errorResponse(ERROR_MESSAGES.PRODUCT_NOT_FOUND, 404)
    );
  }

  return res.status(200).json(
    successResponse(product, 'Product fetched successfully', 200)
  );
});

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private
 */
export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, images, discount, sku, tags } = req.body;

  // Check if category exists
  const categoryExists = await Category.findById(category);
  if (!categoryExists) {
    return res.status(400).json(
      errorResponse(ERROR_MESSAGES.CATEGORY_NOT_FOUND, 400)
    );
  }

  // Check if product with same name exists
  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    return res.status(400).json(
      errorResponse(ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS, 400)
    );
  }

  // Create new product
  const product = new Product({
    name,
    description,
    price,
    category,
    stock,
    images: images || [],
    discount: discount || 0,
    sku,
    tags: tags || [],
    createdBy: req.userId,
  });

  await product.save();
  await product.populate('category', 'name');
  await product.populate('createdBy', 'name email');

  return res.status(201).json(
    successResponse(product, SUCCESS_MESSAGES.PRODUCT_CREATED, 201)
  );
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, stock, images, discount, sku, tags } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json(
      errorResponse(ERROR_MESSAGES.PRODUCT_NOT_FOUND, 404)
    );
  }

  // Check authorization - only creator or admin can update
  if (product.createdBy.toString() !== req.userId && req.user?.role !== 'admin') {
    return res.status(403).json(
      errorResponse(ERROR_MESSAGES.PERMISSION_DENIED, 403)
    );
  }

  // Validate category if provided
  if (category) {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json(
        errorResponse(ERROR_MESSAGES.CATEGORY_NOT_FOUND, 400)
      );
    }
    product.category = category;
  }

  // Update fields
  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (stock !== undefined) product.stock = stock;
  if (images) product.images = images;
  if (discount !== undefined) product.discount = discount;
  if (sku) product.sku = sku;
  if (tags) product.tags = tags;

  await product.save();
  await product.populate('category', 'name');
  await product.populate('createdBy', 'name email');

  return res.status(200).json(
    successResponse(product, SUCCESS_MESSAGES.PRODUCT_UPDATED, 200)
  );
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product (soft delete)
 * @access  Private
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json(
      errorResponse(ERROR_MESSAGES.PRODUCT_NOT_FOUND, 404)
    );
  }

  // Check authorization - only creator or admin can delete
  if (product.createdBy.toString() !== req.userId && req.user?.role !== 'admin') {
    return res.status(403).json(
      errorResponse(ERROR_MESSAGES.PERMISSION_DENIED, 403)
    );
  }

  // Soft delete
  product.isActive = false;
  await product.save();

  return res.status(200).json(
    successResponse(
      { id: product._id },
      SUCCESS_MESSAGES.PRODUCT_DELETED,
      200
    )
  );
});

/**
 * @route   GET /api/products/category/:categoryId
 * @desc    Get products by category
 * @access  Public
 */
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  // Check if category exists
  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).json(
      errorResponse(ERROR_MESSAGES.CATEGORY_NOT_FOUND, 404)
    );
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const products = await Product.find({ category: categoryId, isActive: true })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('category', 'name')
    .populate('createdBy', 'name email');

  const total = await Product.countDocuments({ category: categoryId, isActive: true });

  return res.status(200).json(
    paginatedResponse(products, page, limit, total, SUCCESS_MESSAGES.PRODUCTS_FETCHED)
  );
});
