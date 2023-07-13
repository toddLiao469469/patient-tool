import { takeLatest, put, delay, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  fetchPatientsFetching,
  fetchPatientsSuccess,
  fetchPatientsFail,
} from '../reducers/patient';
import { getPatients } from '../api/patient';
import { Patient } from '../lib/types';

export enum PatientSagaAction {
  FETCH_PATIENTS = 'patient/fetch-patients',
  FETCH_PATIENTS_SUCCESS = 'patient/fetch-patients-success',
  FETCH_PATIENTS_FAIL = 'patient/fetch-patients-fail',
  FETCH_PATIENTS_FETCHING = 'patient/fetch-patients-fetching',
}

export const fetchPatientActionCreator = () => {
  return { type: PatientSagaAction.FETCH_PATIENTS };
};

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
