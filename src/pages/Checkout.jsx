import React, { useState } from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const subTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );
  const taxAmt = Number(((subTotal * 8) / 100).toFixed(2));
  const total = (subTotal + taxAmt).toFixed(2);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    payment: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }

    if (!formData.payment) {
      newErrors.payment = "Please select a payment method";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handlePlaceOrder = () => {
    const isValid = validateForm();

    if (!isValid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    alert("Order placed successfully!");
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      <p className="text-gray-500 mt-1 mb-8">
        Complete your order details below
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Left Side */}
        <div>
          {/* Shipping Information */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-5">Shipping Information</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.fullName
                      ? "border border-red-500"
                      : "border border-gray-200"
                  }`}
                />

                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="xyz@example.com"
                  className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email
                      ? "border border-red-500"
                      : "border border-gray-200"
                  }`}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.address
                      ? "border border-red-500"
                      : "border border-gray-200"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}{" "}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City Name"
                    className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.city
                        ? "border border-red-500"
                        : "border border-gray-200"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}{" "}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="100001"
                    className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.zipCode
                        ? "border border-red-500"
                        : "border border-gray-200"
                    }`}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.zipCode}
                    </p>
                  )}{" "}
                </div>
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold mb-2">Payment Method</h2>

            <p className="text-sm text-gray-500 mb-5">
              This is a demo checkout.
            </p>

            <div className="space-y-3">
              <label className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary transition">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  className="accent-primary"
                  checked={formData.payment === "card"}
                  onChange={handleChange}
                />
                <span>Credit Card</span>
              </label>

              <label className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary transition">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={formData.payment === "upi"}
                  onChange={handleChange}
                  className="accent-primary"
                />
                <span>UPI</span>
              </label>

              <label className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary transition">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={formData.payment === "cash"}
                  onChange={handleChange}
                  className="accent-primary"
                />
                <span>Cash On Delivery</span>
              </label>
            </div>
            {errors.payment && (
              <p className="text-red-500 text-sm mt-2">{errors.payment}</p>
            )}
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit sticky top-4">
          <h2 className="text-xl font-bold mb-5">Order Summary</h2>

          <div className="space-y-4 mb-5 max-h-80 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-contain bg-orange-50 rounded-lg p-1"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>

                <p className="font-medium text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <hr />

          <div className="space-y-3 py-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${subTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Tax (8%)</span>
              <span>${taxAmt}</span>
            </div>
          </div>

          <hr />

          <div className="flex justify-between py-4 text-lg font-bold text-gray-800">
            <span>Order Total</span>
            <span>${total}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-medium transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
