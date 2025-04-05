import { createSlice } from '@reduxjs/toolkit';

const addUserToStorage = (email) => {
  try {
    localStorage.setItem('user', email);
  } catch (err) {
    console.error("Could insert user to local storage!", err);
  }
};

const removeUserFromStorage = () => {
  try {
    localStorage.removeItem('user');
  } catch (err) {
    console.error("Could remove user from local storage!", err);
  }
};

const initialState = {
  isLoggedIn: false,
  email: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { isAdmin, email } = action.payload;
      state.isLoggedIn = true;
      state.isAdmin = isAdmin;
      state.email = email;
      addUserToStorage(email);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.email = null;
      removeUserFromStorage();
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;