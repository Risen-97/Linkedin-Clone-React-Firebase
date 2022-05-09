import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalPost: null,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,

  reducers: {
    openModal: (state, action) => {
      state.modalPost = action.payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalPost = null;
    },
  },
});

export const modalReducers = modalSlice.reducer;

export const modalActions = modalSlice.actions;
