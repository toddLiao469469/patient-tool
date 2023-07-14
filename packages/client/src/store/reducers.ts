import { combineReducers } from '@reduxjs/toolkit';
import { patientReducer } from '../features/patient/patient.slice';
import { orderReducer } from '../features/order/order.slice';

const rootReducer = combineReducers({
  patient: patientReducer,
  order: orderReducer,
});

export default rootReducer;
