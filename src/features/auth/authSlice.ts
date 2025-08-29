import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
  userRole: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  userRole: localStorage.getItem("userRole"),
  isAuthenticated: !!localStorage.getItem("token"),
};

interface LoginPayload {
  role: string;
  token: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { role, token } = action.payload;
      state.token = token;
      state.userRole = role;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
    },
    logout: (state) => {
      state.token = null;
      state.userRole = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
