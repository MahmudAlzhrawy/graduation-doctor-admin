"use client";
import { createSlice } from "@reduxjs/toolkit";
import { userObject } from "../../../utils/types";

export interface user {
  userToken: string | null;
  user: userObject | null;
}

// ✅ استخدم window فقط داخل هذا الشرط
let userFromLocalStorage: userObject | null = null;
let userTokenFromLocalStorage: string | null = null;

if (typeof window !== "undefined") {
  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("userToken");

  try {
    userFromLocalStorage =
      userString && userString !== "undefined" ? JSON.parse(userString) : null;
  } catch (e) {
    console.error("Failed to parse user JSON from localStorage", e);
    userFromLocalStorage = null;
  }

  userTokenFromLocalStorage = token ?? null;
}

// ✅ الحالة الأولية
const initialState: user = {
  userToken: userTokenFromLocalStorage,
  user: userFromLocalStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
      }
      state.userToken = null;
      state.user = null;
    },
    setCredentials: (state, { payload }) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("userToken", payload.userToken);
        localStorage.setItem("user", JSON.stringify(payload.user));
      }
      state.userToken = payload.userToken;
      state.user = payload.user;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
