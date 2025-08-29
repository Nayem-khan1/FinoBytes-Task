import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import adminReducer from "../features/admin/adminSlice";
import merchantReducer from "../features/merchant/merchantSlice";
import memberReducer from "../features/member/memberSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    merchant: merchantReducer,
    member: memberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
