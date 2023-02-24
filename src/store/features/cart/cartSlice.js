import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(itemcart, { payload }) {
      //   console.log(payload);
      //uid is the unique id of the item
      const { id } = payload;

      const find = itemcart.find((item) => item.id === id);
      if (find) {
        return itemcart.map((item) =>
          item.id === id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        );
      } else {
        itemcart.push({
          ...payload,
          quantity: 1,
        });
      }
    },
    increment(itemcart, { payload }) {
      return itemcart.map((item) =>
        item.id === payload
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      );
    },
    decrement(itemcart, { payload }) {
      return itemcart.map((item) =>
        item.id === payload
          ? {
            ...item,
            quantity: item.quantity - 1,
          }
          : item
      );
    },
    removeItem: (itemcart, action) => {
      const itemId = action.payload;
      return itemcart.filter((item) => item.id !== itemId);
    },
    clear(itemcart) {
      return [];
    },
  },
});

export const { addToCart, increment, decrement, removeItem, clear } =
  cartSlice.actions;
const cartReducer = cartSlice.reducer;

export default cartReducer;
