import mongoose from "mongoose";

// ==========================================
// 1. SUB-SCHEMA: PRODUCT REVIEWS
// ==========================================
const reviewSchema = new mongoose.Schema({
  reviewerName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// ==========================================
// 2. MAIN SCHEMA: PRODUCT DETAILS
// ==========================================
const productSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    sku: {
      type: String,
      unique: true, // Prevents duplicate stock keeping units
    },

    // Pricing Fields
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },

    // Inventory & Metrics
    stock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5, // Aggregated product rating
    },

    // Media Assets (URLs)
    thumbnail: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],

    // Logistics & Policies
    warrantyInformation: {
      type: String,
    },
    shippingInformation: {
      type: String,
    },
    returnPolicy: {
      type: String,
    },

    // Embedded Sub-document Array
    reviews: [reviewSchema],
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
    toJSON: { virtuals: true }, // Ensures virtual properties are included when serialized
  },
);

// Export Mongoose model mapping to the 'products' collection
export default mongoose.model("product", productSchema);
