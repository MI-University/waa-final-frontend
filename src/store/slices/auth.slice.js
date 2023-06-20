import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { token: null, isAuthenticated: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    register: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      delete action.payload.token;
      state.user = action.payload;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      delete action.payload.token;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    }
  }
});

export default authSlice;
