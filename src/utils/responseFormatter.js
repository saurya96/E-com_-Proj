/**
 * Standardized API Response Formatter
 * All API responses follow this format for consistency
 */

export const successResponse = (data, message = 'Success', statusCode = 200) => {
  return {
    success: true,
    statusCode,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

export const errorResponse = (message = 'Error', statusCode = 500, errors = null) => {
  return {
    success: false,
    statusCode,
    message,
    errors,
    timestamp: new Date().toISOString(),
  };
};

export const paginatedResponse = (data, page, limit, total, message = 'Success') => {
  return {
    success: true,
    statusCode: 200,
    message,
    data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
    timestamp: new Date().toISOString(),
  };
};
