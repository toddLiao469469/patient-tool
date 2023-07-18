import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SnackbarProps } from '@mui/material/Snackbar';
import { AlertProps } from '@mui/material/Alert';

interface SnackbarState {
  open: SnackbarProps['open'];
  message: SnackbarProps['message'];
  severity: AlertProps['severity'];
  variant: AlertProps['variant'];
}

const initialState: SnackbarState = {
  open: false,
  message: '',
  severity: 'success',
  variant: 'filled',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction<Omit<SnackbarState, 'open'>>) => {
      state = { open: true, ...action.payload };

      return state;
    },

    closeSnackbar: (state) => {
      state = initialState;

      return state;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export const snackbarReducer = snackbarSlice.reducer;
