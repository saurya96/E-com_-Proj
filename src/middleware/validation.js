import Joi from 'joi';
import { errorResponse } from '../utils/responseFormatter.js';
import { ERROR_MESSAGES } from '../utils/errorMessages.js';

/**
 * Validation Schemas using Joi
 */

export const validationSchemas = {
  // Auth Validation
  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  // Product Validation
  createProduct: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(10).max(2000).required(),
    price: Joi.number().positive().required(),
    category: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    images: Joi.array().items(Joi.string().uri()).max(5),
    discount: Joi.number().min(0).max(100),
    sku: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  }),

  updateProduct: Joi.object({
    name: Joi.string().min(2).max(100),
    description: Joi.string().min(10).max(2000),
    price: Joi.number().positive(),
    category: Joi.string(),
    stock: Joi.number().min(0),
    images: Joi.array().items(Joi.string().uri()).max(5),
    discount: Joi.number().min(0).max(100),
    sku: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  }),

  // Category Validation
  createCategory: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(500),
    image: Joi.string().uri(),
  }),
};

/**
 * Validation Middleware Factory
 * @param {string} schemaName - Name of the validation schema
 * @returns {Function} Middleware function
 */
export const validate = (schemaName) => {
  return (req, res, next) => {
    const schema = validationSchemas[schemaName];

    if (!schema) {
      return res.status(500).json(
        errorResponse('Validation schema not found', 500)
      );
    }

    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json(
        errorResponse(ERROR_MESSAGES.VALIDATION_ERROR, 400, errors)
      );
    }

    req.body = value;
    next();
  };
};
