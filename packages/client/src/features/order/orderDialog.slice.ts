import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
      state.patientId = undefined;
    },
  },
});

export const { openOrderDialog, closeOrderDialog } = orderDialogSlice.actions;
export const orderDialogReducer = orderDialogSlice.reducer;
