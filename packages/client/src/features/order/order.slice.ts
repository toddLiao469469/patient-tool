import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Order } from '../../lib/types';

interface DraftOrder extends Omit<Order, 'orderId'> {
  patientId: string;
}

interface OrderState {
  data: Order | null;
  draftOrder: DraftOrder[];
  error: string | null;
  fetching: boolean;
}

const initialState: OrderState = {
  data: null,
  draftOrder: [],
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

    addDraftOrder: (state, action: PayloadAction<DraftOrder>) => {
      state.draftOrder.push(action.payload);
    },

    removeDraftOrder: (state, action: PayloadAction<string>) => {
      state.draftOrder = state.draftOrder.filter((order) => order.patientId !== action.payload);
    },

    clearDraftOrder: (state) => {
      state.draftOrder = [];
    },

    updateDraftOrder: (state, action: PayloadAction<DraftOrder>) => {
      const { patientId } = action.payload;
      const index = state.draftOrder.findIndex((order) => order.patientId === patientId);
      if (index !== -1) {
        state.draftOrder[index] = action.payload;
      }
    },
  },
});

export const {
  ordersFetching,
  fetchOrderSuccess,
  ordersFail,
  resetOrder,
  addDraftOrder,
  removeDraftOrder,
  clearDraftOrder,
  updateDraftOrder,
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
