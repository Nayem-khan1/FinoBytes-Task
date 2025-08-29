import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

export interface MerchantState {
  purchases: Purchase[];
  contributionRate: number;
  notifications: Notification[];
}

const initialState: MerchantState = {
  purchases: [
    { id: 1, customer: "John Doe", amount: 100, status: "Pending" },
    { id: 2, customer: "Jane Smith", amount: 200, status: "Pending" },
  ],
  contributionRate: 5,
  notifications: [
    { id: 1, message: "New purchase approval request from John Doe." },
    { id: 2, message: "New purchase approval request from Jane Smith." },
  ],
};

const merchantSlice = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    approvePurchase: (state, action: PayloadAction<number>) => {
      const purchase = state.purchases.find((p) => p.id === action.payload);
      if (purchase) {
        purchase.status = "Approved";
      }
    },
    setContributionRate: (state, action: PayloadAction<number>) => {
      state.contributionRate = action.payload;
    },
  },
});

export const { approvePurchase, setContributionRate } = merchantSlice.actions;
export default merchantSlice.reducer;
