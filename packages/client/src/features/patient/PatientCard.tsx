import { Button, Card, Typography } from '@mui/material';

import { Patient } from '../../lib/types';
import { useAppDispatch } from '../../store';

import { fetchOrderActionCreator } from '../order/order.action';
import { openOrderDialog } from '../order/orderDialog.slice';

type PatientCardProps = Patient;

const PatientCard: React.FC<PatientCardProps> = (props) => {
  const { name, orderId, id } = props;
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ padding: 2, justifyContent: 'flex-start', width: 400, height: 120 }}>
      <Typography variant="h5" textAlign="start" sx={{ marginBottom: 2 }}>
        name:{name}
      </Typography>

      <Button
        onClick={() => {
          dispatch(openOrderDialog(id));
        }}
      >
        order
      </Button>
    </Card>
  );
};

export default PatientCard;
