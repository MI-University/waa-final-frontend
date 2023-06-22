import { createSlice } from '@reduxjs/toolkit';

const initialModalState = { modalOpen: false, modalContent: '' };

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialModalState,
  reducers: {
    open: (state) => {
      state.modalOpen = true;
    },
    close: (state) => {
      state.modalOpen = false;
      state.modalContent = '';
    },
    setContent: (state, action) => {
      console.log("action.payload",action.payload);
      state.modalContent = action.payload;
    }
  }
});

export default modalSlice;
