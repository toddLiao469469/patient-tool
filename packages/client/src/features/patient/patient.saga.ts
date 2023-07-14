import { takeLatest, put, call } from 'redux-saga/effects';

import { fetchPatientsFetching, fetchPatientsSuccess, fetchPatientsFail } from './patient.slice';
import { getPatients } from './patient.service';
import { Patient } from '../../lib/types';
import { PatientSagaAction } from './patient.action';

function* fetchPatients(): Generator<unknown, void, Patient[]> {
  try {
    yield put(fetchPatientsFetching());

    const result = yield call(getPatients);

    yield put(fetchPatientsSuccess(result));
  } catch (error) {
    yield put(fetchPatientsFail('Error'));
  }
}

export function* patientSaga() {
  yield takeLatest(PatientSagaAction.FETCH_PATIENTS, fetchPatients);
}
