import { useEffect, useState } from 'react';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store';

import { fetchOrderActionCreator } from './order.action';
import { closeOrderDialog } from './orderDialog.slice';
import { resetOrder } from './order.slice';

const OrderDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.order);
  const patient = useAppSelector((state) => state.patient.data);
  const orderDialog = useAppSelector((state) => state.orderDialog);

  const [message, setMessage] = useState<string>(order.data?.message || '');

  useEffect(() => {
    const orderId = patient?.find((p) => p.id === orderDialog.patientId)?.orderId;
    if (orderId) {
      dispatch(fetchOrderActionCreator(orderId || ''));
      return;
    }

    dispatch(resetOrder());
  }, [dispatch, orderDialog.patientId, patient]);

  console.log(order);
  return (
    <Dialog open={orderDialog.open}>
      <DialogTitle>Order </DialogTitle>
      {order.fetching ? (
        <CircularProgress></CircularProgress>
      ) : (
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="message"
            type="text"
            fullWidth
            onChange={(e) => setMessage(e.target.value)}
            defaultValue={order.data?.message || ''}
            value={order.data?.message}
          />
        </DialogContent>
      )}

      <DialogActions>
        <Button
          onClick={() => {
            dispatch(closeOrderDialog());
          }}
        >
          Cancel
        </Button>
        {/* <Button onClick={handleCreateOrder}>Create</Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;
