import { combineReducers } from '@reduxjs/toolkit';

import { patientReducer } from '../features/patient/patient.slice';
import { orderReducer } from '../features/order/order.slice';
import { orderDialogReducer } from '../features/order/orderDialog.slice';

const rootReducer = combineReducers({
  patient: patientReducer,
  order: orderReducer,
  orderDialog: orderDialogReducer,
});

export default rootReducer;
