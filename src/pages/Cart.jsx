import React from "react";
import { useSelector } from "react-redux";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
// import CartItem from "../components/CartItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  const taxAmt = Number(((subTotal * 8) / 100).toFixed(2));
  const total = (subTotal + taxAmt).toFixed(2);

  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const quantityMsg =
    quantity === 1 ? "1 item in your cart" : `${quantity} items in your cart`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Shopping Cart</h1>

      <p className="text-gray-500 mb-4">{quantityMsg}</p>

      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-8">
        🎉 Free Shipping on all products
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-8">
        {/* Cart Items */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Cart Items</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.title}</h3>

                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>

                <div className="font-semibold text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>

              // OR
              // <CartItem key={item.id} data={item} />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-fit sticky top-4">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${taxAmt}</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total</span>
              <span>${total}</span>
            </div>
           
            <hr />

          </div>

          <button className="w-full mt-6 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl flex items-center justify-center gap-2 transition">
            Proceed to Checkout
            <FaArrowRight />
          </button>

          <button className="w-full mt-3 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl flex items-center justify-center gap-2 transition">
            <FaArrowLeft />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
