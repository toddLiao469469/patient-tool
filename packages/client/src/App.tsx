import { Container, styled } from '@mui/material';

import PatientList from './features/patient/PatientList';
import OrderDialog from './features/order/OrderDialog';
import Snackbar from './features/snackbar/Snackbar';

const PageBase = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: '100vh',
}));

function App() {
  return (
    <PageBase>
      <Container
        sx={{
          padding: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 400,
          height: '100%',
        }}
      >
        <OrderDialog />
        <Snackbar />
        <PatientList />
      </Container>
    </PageBase>
  );
}

export default App;
