import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

//cart slice
const cartSlice = createSlice({
  name: "cartslice",
  initialState,
  reducers: {
    //add to cart
    addToCart: (state, action) => {
      // console.log("action", action);
      const ifExist = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      // console.log(ifExist);
      if (ifExist >= 0) {
        state.cart[ifExist].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.cart = [...state.cart, temp];
      }
    },

    //remove from cart
    removeFromCart: (state, action) => {
      const data = state.cart.filter((ele) => ele.id !== action.payload);
      state.cart = data;
    },

    //remove single item from cart
    removeSingleItem: (state, action) => {
      const ifExist = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cart[ifExist].qnty >= 1) {
        state.cart[ifExist].qnty -= 1;
      }
    },

    //empty cart
    emptycart: (state, action) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, removeSingleItem, emptycart } =
  cartSlice.actions;
export default cartSlice.reducer;
