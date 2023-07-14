import { useEffect } from 'react';

import { Button, Card, Typography } from '@mui/material';

import { Patient } from '../lib/types';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchOrdersActionCreator } from '../saga/order';

type PatientCardProps = Patient;

const PatientCard: React.FC<PatientCardProps> = (props) => {
  const { name, orderId, id } = props;
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.order.data?.find((order) => order.id === orderId));

  return (
    <Card sx={{ padding: 2, justifyContent: 'flex-start', width: 400, height: 120 }}>
      <Typography variant="h5" textAlign="start" sx={{ marginBottom: 2 }}>
        name:{name}
      </Typography>
      {order ? <>{order.message}</> : <>none</>}
      <Button
        onClick={() => {
          console.log('order', orderId, order);
        }}
      >
        order
      </Button>
    </Card>
  );
};

export default PatientCard;
