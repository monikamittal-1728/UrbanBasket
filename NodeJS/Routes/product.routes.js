import { getProductById, getProducts } from "../Controller/product.controller.js";

export function routes(app) {
  app.get("/api/products", getProducts);
  app.get("/api/product/:id", getProductById);
}
