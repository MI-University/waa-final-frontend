import { createSlice } from '@reduxjs/toolkit';

const initialPropertyState = { properties: [] };

const propertySlice = createSlice({
  name: 'property',
  initialState: initialPropertyState,
  reducers: {
    save: (state, action) => {
      state.properties.push(action.payload);
    },
    unsave: (state, action) => {
      state.properties =
        state.properties?.filter(
          (property) => property.id !== action.payload
        ) || [];
    }
  }
});

export default propertySlice;
