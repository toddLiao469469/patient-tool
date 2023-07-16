import { useCallback, useEffect, useState } from 'react';

import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../store';

import { fetchOrderActionCreator } from './order.action';
import { closeOrderDialog } from './orderDialog.slice';
import { resetOrder } from './order.slice';

enum FormMode {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view',
}

interface OrderFromProps {
  mode: FormMode;
  onMessageChange: (message: string) => void;
  message: string;
}

const OrderFrom: React.FC<OrderFromProps> = (props) => {
  const { mode, onMessageChange, message } = props;
  const order = useAppSelector((state) => state.order);

  useEffect(() => {
    switch (mode) {
      case FormMode.CREATE:
        onMessageChange('');
        break;
      case FormMode.EDIT:
        onMessageChange(order.data?.message || '');
        break;
      case FormMode.VIEW:
        break;
    }
  }, [mode, onMessageChange, order.data?.message]);

  if (!message && mode === FormMode.VIEW) {
    return <Alert severity="info">Order Not Found</Alert>;
  }

  return (
    <TextField
      autoFocus
      margin="dense"
      id="message"
      label="message"
      type="text"
      disabled={mode === FormMode.VIEW}
      fullWidth
      onChange={(e) => onMessageChange(e.target.value)}
      defaultValue={message}
      value={message}
    />
  );
};

const OrderDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.order);
  const patient = useAppSelector((state) => state.patient.data);
  const orderDialog = useAppSelector((state) => state.orderDialog);
  const [mode, setMode] = useState(FormMode.VIEW);

  const [message, setMessage] = useState<string>('');

  const handleClose = () => {
    setMode(FormMode.VIEW);
    dispatch(closeOrderDialog());
    dispatch(resetOrder());
  };

  const handleOrderMessageChange = useCallback((message: string) => {
    setMessage(message);
  }, []);

  useEffect(() => {
    const orderId = patient?.find((p) => p.patientId === orderDialog.patientId)?.orderId;

    if (orderId) {
      dispatch(fetchOrderActionCreator(orderId || ''));
      setMessage(order.data?.message || '');
      return;
    }

    setMessage('');
  }, [dispatch, order.data?.message, orderDialog.patientId, patient]);

  return (
    <Dialog open={orderDialog.open}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4"> Order</Typography>
        {order.data ? (
          <Button
            onClick={() => {
              if (mode === FormMode.EDIT) {
                setMode(FormMode.VIEW);
                return;
              }
              setMode(FormMode.EDIT);
            }}
          >
            edit
          </Button>
        ) : (
          <Button
            onClick={() => {
              if (mode === FormMode.CREATE) {
                setMode(FormMode.VIEW);
                return;
              }
              setMode(FormMode.CREATE);
            }}
          >
            new
          </Button>
        )}
      </DialogTitle>
      {order.fetching ? (
        <CircularProgress></CircularProgress>
      ) : (
        <DialogContent sx={{ width: 480 }}>
          <OrderFrom
            mode={mode}
            message={message}
            onMessageChange={handleOrderMessageChange}
          ></OrderFrom>
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;
