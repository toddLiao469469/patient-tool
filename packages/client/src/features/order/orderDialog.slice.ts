// app/userReducer.ts

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Order } from '../../lib/types';

interface OrderDialogState {
  open: boolean;
  patientId?: string;
}

const initialState: OrderDialogState = {
  open: false,
  patientId: undefined,
};

const orderDialogSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openOrderDialog: (state, action: PayloadAction<string>) => {
      state.open = true;
      state.patientId = action.payload;
    },

    closeOrderDialog: (state) => {
      state.open = false;
    },
  },
});

export const { openOrderDialog, closeOrderDialog } = orderDialogSlice.actions;
export const orderDialogReducer = orderDialogSlice.reducer;
