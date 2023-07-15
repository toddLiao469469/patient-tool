import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Patient } from '../../lib/types';

interface PatientState {
  data: Patient[] | null;
  error: string | null;
  fetching: boolean;
}

const initialState: PatientState = {
  data: null,
  error: null,
  fetching: false,
};
export interface ChangeOrderPayload {
  id: string;
  orderId: string;
}
export type SetPatientsPayload = Patient[];

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    fetchPatientsFetching: (state) => {
      state.fetching = true;
    },
    fetchPatientsSuccess: (state, action: PayloadAction<Patient[]>) => {
      state.data = action.payload;
      state.error = null;
      state.fetching = false;
    },
    fetchPatientsFail: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.fetching = false;
    },
  },
});

export const { fetchPatientsFetching, fetchPatientsSuccess, fetchPatientsFail } =
  patientSlice.actions;
export const patientReducer = patientSlice.reducer;
