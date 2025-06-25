import { configureStore } from "@reduxjs/toolkit";
import { RootReducers } from "./RootReducers";
export const store = configureStore({
  reducer: RootReducers,
});
