const { configureStore } = require('@reduxjs/toolkit');
const { default: authSlice } = require('./slices/auth.slice');

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
});

export const authActions = authSlice.actions;
