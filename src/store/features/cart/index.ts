import { createSlice } from "@reduxjs/toolkit";

export type CartState = {
  [key: string]: number;
};

const initialState: CartState = {};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTicket: (state, { payload }) => {
      const amount = state[payload] || 0;
      state[payload] = amount + 1;
    },
    removeTicket: (state, { payload }) => {
      const amount = state[payload];
      if (!amount) {
        return;
      }

      if (amount === 1) {
        delete state[payload];
        return;
      }

      state[payload] = amount - 1;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
