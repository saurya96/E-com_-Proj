import mongoose from 'mongoose';

/**
 * Product Schema - Stores product information
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [2, 'Product name must be at least 2 characters long'],
      maxlength: [100, 'Product name cannot exceed 100 characters'],
      index: true, // Index for search queries
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [10, 'Description must be at least 10 characters long'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      validate: {
        validator: function (value) {
          return value > 0;
        },
        message: 'Price must be greater than 0',
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      default: 0,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: 'Stock cannot be negative',
      },
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length <= 5;
        },
        message: 'Maximum 5 images allowed',
      },
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be less than 0'],
      max: [100, 'Discount cannot exceed 100%'],
    },
    sku: {
      type: String,
      unique: true,
      sparse: true, // Allow null values
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Virtual for discounted price
 */
productSchema.virtual('discountedPrice').get(function () {
  return (this.price * (100 - this.discount)) / 100;
});

/**
 * Middleware to populate category and createdBy
 */
productSchema.pre(/^find/, function () {
  this.populate({
    path: 'category',
    select: 'name',
  }).populate({
    path: 'createdBy',
    select: 'name email',
  });
});

// Indexes for optimized queries
productSchema.index({ name: 'text', description: 'text' }); // Full-text search
productSchema.index({ category: 1 });
productSchema.index({ createdBy: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

export default mongoose.model('Product', productSchema);
