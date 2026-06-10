import mongoose  from "mongoose";

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

const productSchema = new mongoose.Schema(
  {
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
      unique: true,
    },

    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    images: [
      {
        type: String,
      },
    ],

    warrantyInformation: {
      type: String,
    },

    shippingInformation: {
      type: String,
    },

    returnPolicy: {
      type: String,
    },

    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("product", productSchema);