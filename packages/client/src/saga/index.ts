import { all } from 'redux-saga/effects';
import { patientSaga } from './patient';

function* rootSaga() {
  yield all([patientSaga()]);
}

export default rootSaga;
