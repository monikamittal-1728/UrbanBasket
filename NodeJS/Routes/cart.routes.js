/* =========================================================================
   cart.routes.js - Cart Management Routing Configuration
   Maps shopping cart endpoints to their respective controllers.
   All routes in this file are protected by authentication middleware.
   ========================================================================= */

import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controller/cart.controller.js";
import protect from "../middleware/authMiddleware.js";

/**
 * Registers shopping cart routes with the main Express application instance.
 * @param {Express} app - The Express application instance from index.js
 */
export function cartRoutes(app) {
  // @route   GET /api/cart
  // @desc    Retrieve the current user's shopping cart items
  // @access  Private (Requires valid JWT token)
  app.get("/api/cart", protect, getCart);

  // @route   POST /api/cart
  // @desc    Add an item to the shopping cart
  // @access  Private (Requires valid JWT token)
  // Expects: { productId, quantity } in req.body
  app.post("/api/cart", protect, addToCart);

  // @route   PUT /api/cart/:id
  // @desc    Update the quantity of a specific item already in the cart
  // @access  Private (Requires valid JWT token)
  // Expects: { quantity } in req.body passed to the item matching the :id parameter
  app.put("/api/cart/:id", protect, updateCartItem);

  // @route   DELETE /api/cart/:id
  // @desc    Remove a specific item from the shopping cart entirely
  // @access  Private (Requires valid JWT token)
  app.delete("/api/cart/:id", protect, removeFromCart);
}