import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const email = localStorage.getItem('user');
    const key = email ? `cart_${email}` : 'cart';
    let cartInStorage = localStorage.getItem(key);

    if (!cartInStorage) {

      // Check if the user added any items before loggin in.
      if (email) cartInStorage = localStorage.getItem('cart');
      else return { items: [] };
    }

    return JSON.parse(cartInStorage);
  } catch (err) {
    console.error("Could not get cart items from cart!", err);
    return { items: [] };
  }
};

const addCartItemsToStorage = (cart) => {
  try {
    const email = localStorage.getItem('user');
    const key = email ? `cart_${email}` : 'cart';

    const cartToStorage = JSON.stringify(cart);
    localStorage.setItem(key, cartToStorage);
  } catch (err) {
    console.error("Could insert cart items to local storage!", err);
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const book = action.payload;
      const existingItem = state.items.find(item => item.slug === book.slug);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...book, quantity: book.quantity ?? 1 });
      }
      addCartItemsToStorage(state);
    },
    removeItem: (state, action) => {
      const bookSlugToRemove = action.payload;
      state.items = state.items.filter(item => item.slug !== bookSlugToRemove);
    },
    updateItemQuantity: (state, action) => {
      const { slug, type } = action.payload;

      const bookToUpdate = state.items.find(item => item.slug === slug);

      if (bookToUpdate) {
        if (type === 'increment') {
          bookToUpdate.quantity += 1;
        } else if (type === 'decrement') {
          if (bookToUpdate.quantity <= 1) {
            state.items = state.items.filter(item => item.slug !== slug);
          } else {
            bookToUpdate.quantity -= 1;
          }
        }
        addCartItemsToStorage(state);
      }
    },
    clearCart: (state, action) => {
      state.items = [];
      addCartItemsToStorage(state);
    },
    refreshCart: (state, action) => {
      state.items = loadCartFromStorage().items;
    }
  }
});

export const { addItem, removeItem, updateItemQuantity, clearCart, refreshCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalItems = (state) => (
  state.cart.items.reduce((total, item) => total + item.quantity, 0)
)
export const selectCartTotalPrice = (state) => (
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
)

export default cartSlice.reducer;