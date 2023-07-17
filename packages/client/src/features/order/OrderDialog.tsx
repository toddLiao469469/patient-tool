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

import { createOrdersActionCreator, fetchOrderActionCreator } from './order.action';
import { closeOrderDialog } from './orderDialog.slice';
import { addDraftOrder, resetOrder, updateDraftOrder } from './order.slice';

enum FormMode {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view',
  DRAFT = 'draft',
}

interface HeaderActionsProps {
  mode: FormMode;
  onModeChange: (mode: FormMode) => void;
  onSaveDraftOrder: () => void;
}
const HeaderActions: React.FC<HeaderActionsProps> = (props) => {
  const { mode, onModeChange, onSaveDraftOrder } = props;
  const order = useAppSelector((state) => state.order);
  const orderDialog = useAppSelector((state) => state.orderDialog);

  const draftOrder = order.draftOrder.find((item) => item.patientId === orderDialog.patientId);

  const modeTrigger = (firstMode: FormMode) => {
    if (mode === firstMode) {
      onModeChange(FormMode.VIEW);
      return;
    }
    onModeChange(firstMode);
  };

  if (order.data) {
    return (
      <div>
        {mode === FormMode.EDIT && <Button onClick={onSaveDraftOrder}>save draft</Button>}
        {mode === FormMode.VIEW && (
          <Button
            onClick={() => {
              modeTrigger(FormMode.EDIT);
            }}
          >
            edit{draftOrder && '(draft exists)'}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div>
      {mode === FormMode.CREATE && <Button onClick={onSaveDraftOrder}>save draft</Button>}
      {mode === FormMode.VIEW && (
        <Button
          onClick={() => {
            modeTrigger(FormMode.CREATE);
          }}
        >
          new{draftOrder && '(draft exists)'}
        </Button>
      )}
    </div>
  );
};

interface OrderFromProps {
  mode: FormMode;
  onMessageChange: (message: string) => void;
  message: string;
}

const OrderFrom: React.FC<OrderFromProps> = (props) => {
  const { mode, onMessageChange, message } = props;
  const order = useAppSelector((state) => state.order);
  const orderDialog = useAppSelector((state) => state.orderDialog);
  const draftOrder = order.draftOrder.find((item) => item.patientId === orderDialog.patientId);

  useEffect(() => {
    switch (mode) {
      case FormMode.CREATE:
        onMessageChange(draftOrder ? draftOrder.message : '');
        break;
      case FormMode.EDIT:
        onMessageChange(draftOrder ? draftOrder.message : order.data?.message || '');
        break;
      case FormMode.VIEW:
        break;
    }
  }, [draftOrder, mode, onMessageChange, order.data?.message]);

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

  const handleModeChange = useCallback((mode: FormMode) => {
    setMode(mode);
  }, []);

  const handleSaveDraftOrder = useCallback(() => {
    if (!orderDialog.patientId) {
      return;
    }

    const draftOrder = order.draftOrder.find((item) => item.patientId === orderDialog.patientId);

    if (!draftOrder) {
      dispatch(addDraftOrder({ patientId: orderDialog.patientId, message }));
      return;
    }

    dispatch(updateDraftOrder({ patientId: orderDialog.patientId, message }));
  }, [dispatch, message, order.draftOrder, orderDialog.patientId]);

  const handleSaveOrder = useCallback(() => {
    if (!orderDialog.patientId) {
      return;
    }

    if (!order.data) {
      dispatch(createOrdersActionCreator({ patientId: orderDialog.patientId, message }));
    }
  }, [dispatch, message, order.data, orderDialog.patientId]);

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
        <HeaderActions
          mode={mode}
          onModeChange={handleModeChange}
          onSaveDraftOrder={handleSaveDraftOrder}
        ></HeaderActions>
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
        <Button onClick={handleSaveOrder}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;
