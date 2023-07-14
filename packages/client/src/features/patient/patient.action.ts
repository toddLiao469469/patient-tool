export enum PatientSagaAction {
  FETCH_PATIENTS = 'patient/fetch-patients',
}

export const fetchPatientActionCreator = () => {
  return { type: PatientSagaAction.FETCH_PATIENTS };
};
