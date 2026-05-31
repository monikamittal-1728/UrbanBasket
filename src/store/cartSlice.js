import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
        
    },
    removeFromCart: (state, action) => {},
    increaseQuantity: (state, action) => {},
    decreaseQuantity: (state, action) => {},
    clearCart: (state) =>{
        state.items = [];
    }
  },
});


export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;