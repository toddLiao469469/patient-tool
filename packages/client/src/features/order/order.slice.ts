// app/userReducer.ts

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Order } from '../../lib/types';

interface OrderState {
  data: Order[] | null;
  error: string | null;
  fetching: boolean;
}

const initialState: OrderState = {
  data: null,
  error: null,
  fetching: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrdersFetching: (state) => {
      state.fetching = true;
    },
    fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      state.data = action.payload;
      state.error = null;
      state.fetching = false;
    },
    fetchOrdersFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.fetching = false;
    },
  },
});

export const { fetchOrdersFetching, fetchOrdersSuccess, fetchOrdersFail } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
