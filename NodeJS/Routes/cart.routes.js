import { getCart, addToCart, updateCartItem, removeFromCart } from "../controllers/cart.controller.js";
import { protect } from "../middleware/authMiddleware.js";

export function cartRoutes(app) {
  app.get("/api/cart",        protect, getCart);        
  app.post("/api/cart",       protect, addToCart);
  app.put("/api/cart/:id",    protect, updateCartItem);
  app.delete("/api/cart/:id", protect, removeFromCart);
}