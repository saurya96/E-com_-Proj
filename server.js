import 'dotenv/config';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import { config, validateEnv } from './src/config/environment.js';

// Validate required environment variables
try {
  validateEnv();
} catch (error) {
  console.error('❌ Environment Validation Error:', error.message);
  process.exit(1);
}

const PORT = config.PORT;
const NODE_ENV = config.NODE_ENV;

/**
 * Start Server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    app.get("/",(req,res){
      res.send("API is Working")
    })

    // Start Express Server
    const server = app.listen(PORT, () => {
      console.log('\n' + '='.repeat(60));
      console.log(`🚀 ${config.APP_NAME} is running`);
      console.log(`📍 Server URL: http://localhost:${PORT}`);
      console.log(`🔗 API Health Check: http://localhost:${PORT}/api/health`);
      console.log(`📚 API Docs: http://localhost:${PORT}/api`);
      console.log(`🌍 Environment: ${NODE_ENV}`);
      console.log('='.repeat(60) + '\n');
    });

    /**
     * Handle Graceful Shutdown
     */
    process.on('SIGTERM', () => {
      console.log('\n⚠️  SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('\n⚠️  SIGINT signal received: closing HTTP server');
      server.close(() => {
        console.log('✅ HTTP server closed');
        process.exit(0);
      });
    });

    /**
     * Handle Unhandled Rejections
     */
    process.on('unhandledRejection', (err) => {
      console.error('❌ Unhandled Rejection:', err);
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Server Startup Error:', error.message);
    process.exit(1);
  }
};

// Start the server
startServer();
