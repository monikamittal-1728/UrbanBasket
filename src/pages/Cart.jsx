import React from "react";
import { useSelector } from "react-redux";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import CartItem from "../components/cart/CartItem";
import EmptyCart from "../components/cart/EmptyCart";
import { Link } from "react-router-dom";

// Cart component: displays shopping cart items, order summary,
// and checkout/continue shopping actions.
const Cart = () => {
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate subtotal (sum of item price * quantity)
  const subTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // Calculate tax (8% of subtotal)
  const taxAmt = Number(((subTotal * 8) / 100).toFixed(2));

  // Calculate total (subtotal + tax)
  const total = (subTotal + taxAmt).toFixed(2);

  // Calculate total quantity of items
  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Message based on quantity
  const quantityMsg =
    quantity === 1 ? "1 item in your cart" : `${quantity} items in your cart`;

  // If cart is empty, show EmptyCart component
  if (quantity === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
      <p className="text-gray-500 mb-4">{quantityMsg}</p>

      {/* Free shipping banner */}
      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-8">
        🎉 Free Shipping on all products
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-8">
        {/* Cart Items Section */}
        <div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} data={item} />
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-fit sticky top-4">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 text-gray-600">
            {/* Subtotal */}
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            {/* Tax */}
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${taxAmt}</span>
            </div>

            <hr />

            {/* Total */}
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <hr />
          </div>

          {/* Checkout button */}
          <Link to="/checkout">
            <button className="w-full mt-6 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl flex items-center justify-center gap-2 transition">
              Proceed to Checkout
              <FaArrowRight />
            </button>
          </Link>

          {/* Continue shopping button */}
          <Link to="/">
            <button className="w-full mt-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl flex items-center justify-center gap-2 transition">
              <FaArrowLeft />
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
