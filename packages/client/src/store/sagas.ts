import { all } from 'redux-saga/effects';
import { patientSaga } from '../features/patient/patient.saga';
import { orderSaga } from '../features/order/order.saga';

function* rootSaga() {
  yield all([patientSaga(), orderSaga()]);
}

export default rootSaga;
