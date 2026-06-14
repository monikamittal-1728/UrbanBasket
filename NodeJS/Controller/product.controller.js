import mongoose from "mongoose";
import Product from "../model/product.model.js";

/**
 * Controller: Fetch all products from the database
 * Selects only essential fields for performance optimization
 */
export async function getProducts(req, res) {
  try {
    // Retrieve products focusing specifically on display-ready attributes
    const products = await Product.find().select(
      "title price images category rating description stock thumbnail discountPercentage",
    );

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * Controller: Fetch a single product by its MongoDB unique identifier
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validation: Confirm path parameter matches standard ObjectId length/format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    // Validation: Explicit handle if database search returns null
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `No product found with id ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching product",
    });
  }
};