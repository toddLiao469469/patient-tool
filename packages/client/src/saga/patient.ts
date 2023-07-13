import { takeLatest, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { setName, SetNamePayload } from '../reducers/patient';

function* setNameAsync(action: PayloadAction<SetNamePayload>) {
  yield put(setName(action.payload));
}

export function* patientSaga() {
  yield takeLatest('patient/setNameAsync', setNameAsync);
}
