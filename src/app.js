import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { logger, requestLogger } from './middleware/logger.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

// Load environment variables
dotenv.config();

const app = express();

// ============== MIDDLEWARE ==============

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORS - Allow requests from all origins (configure in production)
app.use(cors({
  origin: '*',
  credentials: true,
}));

// Request Logging
app.use(logger);
app.use(requestLogger);

// ============== ROUTES ==============

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: '✅ API is running successfully',
    timestamp: new Date().toISOString(),
  });
});

// API Documentation
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'E-Commerce Product Catalog API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      categories: '/api/categories',
    },
    documentation: 'See README.md for complete API documentation',
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// ============== ERROR HANDLING ==============

// 404 Handler - Must be after all routes
app.use(notFoundHandler);

// Global Error Handler - Must be last
app.use(errorHandler);

export default app;
