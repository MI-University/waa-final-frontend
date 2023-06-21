import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authSlice from './slices/auth.slice';
import propertySlice from './slices/property.slice';

const persistConfig = {
  key: 'root',
  storage
};
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  property: propertySlice.reducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const authActions = authSlice.actions;
export const propertyActions = propertySlice.actions;

export const persistor = persistStore(store);
