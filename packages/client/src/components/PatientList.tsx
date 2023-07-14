import { useEffect } from 'react';

import { CircularProgress, Stack } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../store';
import { fetchPatientActionCreator } from '../saga/patient';
import PatientCard from '../components/PatientCard';
import { fetchOrdersActionCreator } from '../saga/order';

const PatientList = () => {
  const dispatch = useAppDispatch();
  const patients = useAppSelector((state) => state.patient.data);
  const patientsFetching = useAppSelector((state) => state.patient.fetching);
  const patientsError = useAppSelector((state) => state.patient.error);
  useEffect(() => {
    dispatch(fetchPatientActionCreator());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOrdersActionCreator());
  }, [dispatch]);

  if (patientsFetching) {
    return <CircularProgress />;
  }

  if (patientsError) {
    return <div>error</div>;
  }
  return (
    <Stack spacing={2}>
      {patients &&
        patients.map(({ name, orderId, id }) => (
          <PatientCard key={id} name={name} orderId={orderId} id={id} />
        ))}
    </Stack>
  );
};

export default PatientList;
