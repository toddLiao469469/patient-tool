import MuiSnackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from '../../store';
import { closeSnackbar } from './snackbar.slice';

const Snackbar = () => {
  const snackbar = useAppSelector((state) => state.snackbar);
  const dispatch = useAppDispatch();

  return (
    <MuiSnackbar
      open={snackbar.open}
      onClose={() => {
        dispatch(closeSnackbar());
      }}
      autoHideDuration={2_000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity={snackbar.severity}
        variant={snackbar.variant}
        sx={{ minWidth: 200, display: 'flex', alignItems: 'center' }}
      >
        <Typography variant="h6">{snackbar.message}</Typography>
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
