/* =========================================================================
   auth.routes.js - Authentication Routing Configuration
   Maps authentication endpoints to their respective controllers
   ========================================================================= */

import { register, login } from "../controller/auth.controller.js";

/**
 * Registers authentication routes with the main Express application instance.
 * @param {Express} app - The Express application instance from index.js
 */
export function authRoutes(app) {
  // Route for user registration (Sign-up)
  // Expects: User details in req.body
  app.post("/api/auth/register", register); 

  // Route for user login (Sign-in)
  // Expects: Credentials in req.body | Returns: Authentication token (JWT)
  app.post("/api/auth/login", login);
}