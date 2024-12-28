import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Ensure you're using the default export

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
