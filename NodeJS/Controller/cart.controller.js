import Cart from "../Model/cart.model.js";
import Product from "../Model/product.model.js";

export async function getCart(req, res) {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "items.productId",
      "title price thumbnail images discountPercentage",
    );
    if (!cart) return res.status(200).json({ success: true, data: [] });
      const cartData = {
      ...cart.toJSON(),
      items: cart.items.map((item) => ({
        id: item._id,
        quantity: item.quantity,
        product: item.productId, // 👈 rename here
      })),
    };
    res.status(200).json({ success: true, data: cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
export async function addToCart(req, res) {
  const { productId, quantity = 1 } = req.body;
  try {
    // Validate that the product exists before adding to cart
    const product = await Product.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    let cart = await Cart.findOne({ userId: req.user.id }); //check if user had anything already in cart
    if (!cart) {
      //create new cart
      cart = await Cart.create({
        userId: req.user.id,
        items: [{ productId, quantity }],
      });
    } else {
      //update old cart
      // check if product already in cart
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId,
      );
      if (existingItem) {
        //Increase Quantity
        existingItem.quantity += quantity;
      } else {
        //add new item
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
export async function updateCartItem(req, res) {
  try {
    const { quantity } = req.body;
    const { id: productId } = req.params;
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId,
    );
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function removeFromCart(req, res) {
  try {
    const { id: productId } = req.params;
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
