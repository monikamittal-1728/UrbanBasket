/* =========================================================================
   product.routes.js - Product Catalog Routing Configuration
   Maps public e-commerce product display endpoints to their respective controllers.
   ========================================================================= */

import { getProductById, getProducts } from "../Controller/product.controller.js";

/**
 * Registers product display routes with the main Express application instance.
 * @param {Express} app - The Express application instance from index.js
 */
export function routes(app) {
  // @route   GET /api/products
  // @desc    Retrieve a list of all products (with optional filtering/pagination)
  // @access  Public (Anyone can browse items)
  app.get("/api/products", getProducts);

  // @route   GET /api/products/:id
  // @desc    Retrieve detailed information for a single specific product
  // @access  Public (Anyone can view details)
  // Expects: MongoDB ObjectId passed as the :id parameter in the URL path
  app.get("/api/products/:id", getProductById);
}