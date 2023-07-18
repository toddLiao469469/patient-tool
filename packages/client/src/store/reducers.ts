import { combineReducers } from '@reduxjs/toolkit';

import { patientReducer } from '../features/patient/patient.slice';
import { orderReducer } from '../features/order/order.slice';
import { orderDialogReducer } from '../features/order/orderDialog.slice';
import { snackbarReducer } from '../features/snackbar/snackbar.slice';

const rootReducer = combineReducers({
  patient: patientReducer,
  order: orderReducer,
  orderDialog: orderDialogReducer,
  snackbar: snackbarReducer,
});

export default rootReducer;
