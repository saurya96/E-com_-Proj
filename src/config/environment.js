/**
 * Environment Configuration
 */
export const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || 'ecommerce_catalog',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  API_VERSION: process.env.API_VERSION || 'v1',
  APP_NAME: process.env.APP_NAME || 'E-Commerce API',
};

/**
 * Validate required environment variables
 */
export const validateEnv = () => {
  const requiredEnvs = ['MONGODB_URI', 'JWT_SECRET'];
  const missing = requiredEnvs.filter(env => !process.env[env]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};
