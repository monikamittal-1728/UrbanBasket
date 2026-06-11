/* =========================================================================
   index.js - RESTful API for User Management
   Built with Node.js, Express & MongoDB
   ========================================================================= */

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { cartRoutes, routes } from "./Routes/product.routes.js";

// Create an Express application instance
const app = express();

// Define the port the server will listen on
const PORT = 3000;

// Middleware to parse incoming JSON payloads (Essential for handling req.body)
app.use(express.json());
app.use(cors());
/* =========================================================================
   1. DATABASE CONNECTION (MongoDB via Mongoose)
   ========================================================================= */

// Connect to the local MongoDB instance under the explicit database name 'urbanbasket'
mongoose.connect("mongodb://127.0.0.1:27017/urbanbasket");

const db = mongoose.connection;

// Event Listener: Fires once when the connection is successfully established
db.on("open", () => {
  console.log("🚀 UrbanBasket Database connection is successful!");
});

// Event Listener: Fires if the database connection encounters an error
db.on("error", (err) => {
  console.error("❌ UrbanBasket Database connection failed:", err);
});

/* =========================================================================
   2. START THE SERVER
   ========================================================================= */

// Instruct the Express application to begin listening for client requests
app.listen(PORT, () => {
  console.log(`✅ Server is running smoothly at http://localhost:${PORT}`);
});

routes(app);
cartRoutes(app);
