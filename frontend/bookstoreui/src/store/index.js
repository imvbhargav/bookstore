import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlices';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});