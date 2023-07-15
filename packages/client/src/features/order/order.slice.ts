import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Order } from '../../lib/types';

interface CacheOrder extends Order {
  userId: string;
}

interface OrderState {
  data: Order | null;
  cacheOrder: CacheOrder[];
  error: string | null;
  fetching: boolean;
}

const initialState: OrderState = {
  data: null,
  cacheOrder: [],
  error: null,
  fetching: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    ordersFetching: (state) => {
      state.fetching = true;
    },
    ordersFail: (state, action: PayloadAction<string>) => {
      state.data = null;
      state.error = action.payload;
      state.fetching = false;
    },
    fetchOrderSuccess: (state, action: PayloadAction<Order>) => {
      state.data = action.payload;
      state.error = null;
      state.fetching = false;
    },
    resetOrder: (state) => {
      state.data = null;
      state.error = null;
      state.fetching = false;
    },

    addCacheOrder: (state, action: PayloadAction<CacheOrder>) => {
      state.cacheOrder.push(action.payload);
    },

    removeCacheOrder: (state, action: PayloadAction<string>) => {
      state.cacheOrder = state.cacheOrder.filter((order) => order.userId !== action.payload);
    },

    clearCacheOrder: (state) => {
      state.cacheOrder = [];
    },

    updateCacheOrder: (state, action: PayloadAction<CacheOrder>) => {
      const { userId } = action.payload;
      const index = state.cacheOrder.findIndex((order) => order.userId === userId);
      if (index !== -1) {
        state.cacheOrder[index] = action.payload;
      }
    },
  },
});

export const { ordersFetching, fetchOrderSuccess, ordersFail, resetOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
