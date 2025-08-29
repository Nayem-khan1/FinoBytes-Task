import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import usersData from "../../utils/users.json";
import merchantsData from "../../utils/merchants.json";
import notifications from "../../utils/notifications.json";
import points from "../../utils/points.json";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "Member";
}

export interface Merchant {
  id: number;
  name: string;
  email: string;
  role: "Merchant";
}

export interface Purchase {
  id: number;
  customer: string;
  amount: number;
  status: "Pending" | "Approved";
}

export interface Notification {
  id: number;
  message: string;
}

export interface Points {
  total: number;
  pending: number;
  available: number;
}

export interface DataState {
  users: User[];
  merchants: Merchant[];
  notifications: Notification[];
  points: Points;
  purchases: Purchase[];
}

const users: User[] = usersData as User[];
const merchants: Merchant[] = merchantsData as Merchant[];

const initialState: DataState = {
  users,
  merchants,
  notifications,
  points,
  purchases: [
    { id: 1, customer: "John Doe", amount: 100, status: "Pending" },
    { id: 2, customer: "Jane Smith", amount: 200, status: "Pending" },
  ],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    approvePurchase: (state, action: PayloadAction<number>) => {
      const purchase = state.purchases.find((p: Purchase) => p.id === action.payload);
      if (purchase) {
        purchase.status = "Approved";
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((u: User) => u.id !== action.payload);
    },
    deleteMerchant: (state, action: PayloadAction<number>) => {
      state.merchants = state.merchants.filter((m: Merchant) => m.id !== action.payload);
    },
  },
});

export const { approvePurchase, deleteUser, deleteMerchant } = dataSlice.actions;
export default dataSlice.reducer;
