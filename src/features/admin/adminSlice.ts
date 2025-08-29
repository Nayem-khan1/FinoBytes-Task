import { createSlice } from "@reduxjs/toolkit";

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

export interface AdminState {
  users: User[];
  merchants: Merchant[];
}

const initialState: AdminState = {
  users: [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Member" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Member" },
  ],
  merchants: [
    {
      id: 1,
      name: "Super Store",
      email: "super@example.com",
      role: "Merchant",
    },
    { id: 2, name: "Mega Mart", email: "mega@example.com", role: "Merchant" },
  ],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
});

export default adminSlice.reducer;
