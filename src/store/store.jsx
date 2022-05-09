import { configureStore } from "@reduxjs/toolkit";
import { modalReducers } from "./modalSlice";
import { authReducer } from "./authSlice";
const store = configureStore({
  reducer: { modal: modalReducers, auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
