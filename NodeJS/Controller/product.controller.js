import mongoose from "mongoose";
import Product from "../Model/product.model.js";

export async function getProducts(req, res) {
  try {
    const products = await Product.find().select(
      "title price images category rating description stock thumbnail discountPercentage",
    );

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    // Product not found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: `No product found with id ${id}`,
      });
    }

    // Success
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