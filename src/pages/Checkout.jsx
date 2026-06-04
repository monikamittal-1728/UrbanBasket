// Import React and required hooks
import React, { useState } from "react";

// Redux hooks for dispatching actions and accessing store state
import { useDispatch, useSelector } from "react-redux";

// Component shown after successful checkout
import CheckoutDone from "../components/CheckoutDone";

// Redux action to clear cart
import { clearCart } from "../store/cartSlice";

const Checkout = () => {
  // Redux dispatch function
  const dispatch = useDispatch();

  // Controls whether checkout success screen should be shown
  const [checkoutDone, setcheckoutDone] = useState(false);

  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate subtotal (price × quantity for each cart item)
  const subTotal = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  // Calculate tax (8%) and round to 2 decimal places
  const taxAmt = Number(((subTotal * 8) / 100).toFixed(2));

  // Final total amount (subtotal + tax)
  const total = (subTotal + taxAmt).toFixed(2);

  // Form input state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    payment: "",
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // ZIP validation (must be exactly 6 digits)
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    } else if (!/^\d{6}$/.test(formData.zipCode)) {
      newErrors.zipCode = "PIN code must be 6 digits";
    }

    // Payment method validation
    if (!formData.payment) {
      newErrors.payment = "Please select a payment method";
    }

    // Update error state
    setErrors(newErrors);

    // Return true if no errors exist
    return Object.keys(newErrors).length === 0;
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    const isValid = validateForm();

    // If form invalid → scroll to top and stop
    if (!isValid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    // If valid → show success screen
    setcheckoutDone(true);

    // Clear cart after successful order
    dispatch(clearCart());
  };

  // Handle input change (text + radio inputs)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update specific form field dynamically
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error message for that field
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // If checkout completed → show success component
  if (checkoutDone) {
    const userdata = {
      name: formData.fullName.trim(),
      email: formData.email.trim(),
    };

    return <CheckoutDone data={userdata} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header Section */}
      <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      <p className="text-gray-500 mt-1 mb-8">
        Complete your order details below
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">

        {/* LEFT SIDE — Shipping + Payment */}
        <div>

          {/* Shipping Information */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-5">
              Shipping Information
            </h2>

            {/* User Input Form */}
            <form className="space-y-4">

              {/* Full Name Field */}
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email Field */}
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Address Field */}
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address}
                  </p>
                )}
              </div>

              {/* City + ZIP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* City */}
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.city}
                    </p>
                  )}
                </div>

                {/* ZIP Code */}
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
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold mb-2">
              Payment Method
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              This is a demo checkout.
            </p>

            <div className="space-y-3">
              {["card", "upi", "cash"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-primary transition"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={formData.payment === method}
                    onChange={handleChange}
                    className="accent-primary"
                  />
                  <span>
                    {method === "card"
                      ? "Credit Card"
                      : method === "upi"
                      ? "UPI"
                      : "Cash On Delivery"}
                  </span>
                </label>
              ))}
            </div>

            {errors.payment && (
              <p className="text-red-500 text-sm mt-2">
                {errors.payment}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE — Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit sticky top-4">
          <h2 className="text-xl font-bold mb-5">Order Summary</h2>

          {/* Cart Items */}
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
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-medium text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <hr />

          {/* Pricing Breakdown */}
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

          {/* Final Total */}
          <div className="flex justify-between py-4 text-lg font-bold text-gray-800">
            <span>Order Total</span>
            <span>${total}</span>
          </div>

          {/* Place Order Button */}
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