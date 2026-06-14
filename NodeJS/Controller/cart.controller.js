import mongoose from "mongoose";
import Cart from "../model/cart.model.js";
import Product from "../model/product.model.js";

/**
 * Retrieves and formats a user's cart with populated product details.
 * Ensures a standardized response structure across all cart operations.
 * * @param {string} userId - The ID of the user whose cart is being retrieved.
 * @returns {Promise<Object|Array>} The formatted cart object, or an empty array if no cart exists.
 */
async function getFormattedCart(userId) {
  const cart = await Cart.findOne({ userId }).populate(
    "items.productId",
    "title price thumbnail images discountPercentage"
  );

  if (!cart) return [];

  const cartJson = cart.toJSON();
  return {
    ...cartJson,
    items: cart.items
      .filter(item => item.productId) 
      .map((item) => ({
        id: item.productId._id, 
        quantity: item.quantity,
        product: item.productId,
      })),
  };
}

/**
 * HTTP GET: Fetch the current user's cart.
 */
export async function getCart(req, res) {
  try {
    const cartData = await getFormattedCart(req.user.id);
    res.status(200).json({ success: true, data: cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * HTTP POST: Add an item to the cart or increment its quantity if it already exists.
 */
export async function addToCart(req, res) {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be greater than 0" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      await Cart.create({
        userId: req.user.id,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }

    const updatedCart = await getFormattedCart(req.user.id);
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * HTTP PUT: Update the exact quantity of an existing item in the cart.
 */
export async function updateCartItem(req, res) {
  try {
    const { quantity } = req.body;
    const { id: productId } = req.params;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be greater than 0" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id, "items.productId": productId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ success: false, message: "Item or Cart not found" });
    }

    const updatedCart = await getFormattedCart(req.user.id);
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * HTTP DELETE: Remove an item entirely from the user's cart.
 */
export async function removeFromCart(req, res) {
  try {
    const { id: productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $pull: { items: { productId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const updatedCart = await getFormattedCart(req.user.id);
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}