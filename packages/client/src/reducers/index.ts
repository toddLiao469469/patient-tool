import { combineReducers } from '@reduxjs/toolkit';
import { patientReducer } from './patient';

const rootReducer = combineReducers({
  patient: patientReducer,
});

export default rootReducer;
