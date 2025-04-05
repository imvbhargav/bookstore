import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: null,
  quantity: 0,
};

const fullCartSlice = createSlice({
  name: 'fullCart',
  initialState,
  reducers: {
    setFullCart: (state, action) => {
      const items = action.payload;
      state.items = items;
    },
    addFullItem: (state, action) => {
      const book = action.payload;
      const existingItem = state.items.find(item => item.slug === book.slug);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...book, quantity: book.quantity ?? 1 });
      }
    },
    removeFullItem: (state, action) => {
      const bookSlugToRemove = action.payload;
      state.items = state.items.filter(item => item.slug !== bookSlugToRemove);
    },
    updateFullItemQuantity: (state, action) => {
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
      }
    },
    clearFullCart: (state, action) => {
      state.items = [];
    },
  }
});

export const {  setFullCart, addFullItem, removeFullItem,
                updateFullItemQuantity, clearFullCart } = fullCartSlice.actions;

export const selectFullCartItems = (state) => state.fullCart.items;
export const selectFullCartTotalItems = (state) => (
  state.fullCart?.items?.reduce((total, item) => total + item.quantity, 0)
)
export const selectFullCartTotalPrice = (state) => (
  state.fullCart?.items?.reduce((total, item) => total + item.price * item.quantity, 0)
)

export default fullCartSlice.reducer;