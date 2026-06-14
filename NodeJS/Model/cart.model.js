import mongoose from "mongoose";

// ==========================================
// 1. SUB-SCHEMA: INDIVIDUAL CART ITEM
// ==========================================
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product", // References the 'product' model collection
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1, // Ensures a user cannot order fewer than 1 item
  },
});

// ==========================================
// 2. MAIN SCHEMA: USER SHOPPING CART
// ==========================================
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // References the 'User' model collection
    required: true,
    unique: true,  // Restricts structure to exactly one cart per user
  },
  items: [cartItemSchema], // Embedded array tracking products in the cart
}, { 
  timestamps: true // Automatically tracks 'createdAt' and 'updatedAt' changes
});

// Export Mongoose model mapping to the 'carts' collection
export default mongoose.model("Cart", cartSchema);