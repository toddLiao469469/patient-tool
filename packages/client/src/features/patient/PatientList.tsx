import { useEffect } from 'react';

import { CircularProgress, Stack } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../store';
import { fetchPatientActionCreator } from './patient.action';

import PatientCard from './PatientCard';

const PatientList = () => {
  const dispatch = useAppDispatch();
  const patients = useAppSelector((state) => state.patient.data);
  const patientsFetching = useAppSelector((state) => state.patient.fetching);
  const patientsError = useAppSelector((state) => state.patient.error);
  useEffect(() => {
    dispatch(fetchPatientActionCreator());
  }, [dispatch]);

  if (patientsFetching) {
    return <CircularProgress />;
  }

  if (patientsError) {
    return <div>error</div>;
  }
  return (
    <Stack spacing={4}>
      {patients &&
        patients.map((patient) => <PatientCard key={patient.patientId} patient={patient} />)}
    </Stack>
  );
};

export default PatientList;
