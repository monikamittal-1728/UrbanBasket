import React from "react";
import PropTypes from "prop-types";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../store/cartSlice";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increaseQuantity(data));
  };

  const handleDecrement = () => {
    dispatch(decreaseQuantity(data));
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart(data));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Product Image + Details */}
        <div className="flex items-center gap-4 w-full sm:flex-1 min-w-0">
          <img
            src={data.image}
            alt={data.title}
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl bg-gray-100 p-2 flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-1">
              {data.category}
            </p>

            <h3 className="font-semibold text-gray-800 line-clamp-2">
              {data.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">${data.price} each</p>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={handleDecrement}
              disabled={data.quantity === 1}
              className={` w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition ${
                data.quantity === 1
                  ? "text-gray-300"
                  : "cursor-pointer hover:bg-gray-100 hover:text-primary"
              }`}
            >
              −
            </button>
            <div className="w-px h-5 bg-gray-200" />

            <span className="w-10 sm:w-12 text-center font-medium">
              {data.quantity}
            </span>

            <div className="w-px h-5 bg-gray-200" />

            <button
              onClick={handleIncrease}
              className="w-9 h-9 cursor-pointer  sm:w-10 sm:h-10 flex items-center justify-center hover:bg-gray-100 hover:text-primary transition"
            >
              +
            </button>
          </div>

          {/* Price */}
          <div className="min-w-[80px] sm:min-w-[90px] text-right">
            <p className="text-base sm:text-lg font-bold text-secondary">
              ${(data.price * data.quantity).toFixed(2)}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemoveItem}
            className="w-9 h-9 sm:w-10 sm:h-10 cursor-pointer  rounded-full flex items-center justify-center text-red-500 bg-gray-100/50 hover:bg-red-50 transition"
            aria-label="Remove item"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
