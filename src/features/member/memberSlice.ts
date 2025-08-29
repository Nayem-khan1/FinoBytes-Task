import { createSlice } from "@reduxjs/toolkit";

export interface Points {
  total: number;
  pending: number;
  available: number;
}

export interface MemberState {
  points: Points;
}

const initialState: MemberState = {
  points: {
    total: 1000,
    pending: 200,
    available: 800,
  },
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {},
});

export default memberSlice.reducer;
