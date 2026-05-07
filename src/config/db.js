import mongoose from 'mongoose';

/**
 * Connect to MongoDB Database
 * @returns {Promise} MongoDB connection promise
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB_NAME || 'ecommerce_catalog',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected Successfully`);
    const databaseName = conn.connection.name || conn.connection.db?.databaseName || conn.connection.db?.name || process.env.MONGODB_DB_NAME || 'ecommerce_catalog';
    console.log(`📍 Database: ${databaseName}`);
    console.log(`🔗 Host: ${conn.connection.host}`);

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB
 */
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB Disconnected');
  } catch (error) {
    console.error(`❌ Error disconnecting MongoDB: ${error.message}`);
    process.exit(1);
  }
};
