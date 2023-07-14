import { combineReducers } from '@reduxjs/toolkit';
import { patientReducer } from './patient';
import { orderReducer } from './order';

const rootReducer = combineReducers({
  patient: patientReducer,
  order: orderReducer,
});

export default rootReducer;
