import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const CheckoutDone = ({ data }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("here");
    
    const timer = setTimeout(() => {
        
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <FaCheckCircle className="text-5xl text-green-500" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Order Placed!</h1>

        {/* Message */}
        <p className="text-gray-600 leading-relaxed">
          Thank you,
          <span className="font-semibold text-gray-800"> {data?.name}</span>
          ! Your order has been confirmed.
        </p>

        <p className="text-gray-600 mt-2">
          A receipt will be sent to
          <span className="font-medium text-primary"> {data?.email}</span>.
        </p>

        {/* Divider */}
        <div className="my-6 border-t border-gray-100"></div>

        {/* Redirect Message */}
        <p className="text-sm text-gray-500">
          Redirecting you to the home page in a few seconds...
        </p>

        {/* Loading dots */}
        <div className="flex justify-center gap-1 mt-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>

        <Link to="/">
          <button className="mt-16 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

CheckoutDone.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

CheckoutDone.defaultProps = {
  data: null,
};
export default CheckoutDone;
