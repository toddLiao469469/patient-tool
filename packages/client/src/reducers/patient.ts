// app/userReducer.ts

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PatientState {
  name: string;
  orderId: string;
}

const initialState: PatientState = {
  name: '',
  orderId: '',
};

export interface SetNamePayload {
  name: string;
}

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<SetNamePayload>) => {
      state.name = action.payload.name;
    },
  },
});

export const { setName } = patientSlice.actions;
export const patientReducer = patientSlice.reducer;
