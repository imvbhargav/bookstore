import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlices';
import fullCartReducer from './slices/fullCartSlices';


export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    fullCart: fullCartReducer,
  },
});