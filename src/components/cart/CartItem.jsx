import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../store/cartSlice";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();
  let handleIncrease = () => {
    dispatch(increaseQuantity(data));
  };
  let handleDecrement = () => {
    dispatch(decreaseQuantity(data));
  };
  let handleRemoveItem = () => {
    dispatch(removeFromCart(data));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Product Image */}
        <img
          src={data.image}
          alt={data.title}
          className="w-24 h-24 object-contain rounded-xl bg-gray-100 p-2"
        />

        {/* Product Details */}
        <div className="flex-1 w-full">
          <p className="text-xs uppercase tracking-wide text-gray-400 font-medium mb-1">
            {data.category}
          </p>

          <h3 className="font-semibold text-gray-800 mb-2">{data.title}</h3>

          <p className="text-sm text-gray-500">${data.price} each</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={handleDecrement}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 hover:text-primary transition"
          >
            −
          </button>

          {/* Separator */}
          <div className="w-px h-5 bg-gray-200" />

          <span className="w-12 text-center font-medium">{data.quantity}</span>

          {/* Separator */}
          <div className="w-px h-5 bg-gray-200" />

          <button
            onClick={handleIncrease}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 hover:text-primary transition"
          >
            +
          </button>
        </div>
        {/* Price */}
        <div className="min-w-[90px] text-right">
          <p className="text-lg font-bold text-secondary">
            ${(data.price * data.quantity).toFixed(2)}
          </p>
        </div>

        {/* Remove */}
        <button
          onClick={handleRemoveItem}
          className="w-10 h-10 rounded-full flex items-center justify-center text-red-500 bg-gray-100/50 hover:bg-red-50 transition"
          aria-label="Remove item"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
