import { all } from 'redux-saga/effects';
import { patientSaga } from './patient';
import { orderSaga } from './order';

function* rootSaga() {
  yield all([patientSaga(), orderSaga()]);
}

export default rootSaga;
