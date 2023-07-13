import { useEffect } from 'react';

import { Button, Card, Typography } from '@mui/material';

import { Patient } from '../lib/types';

type PatientCardProps = Patient;

const PatientCard: React.FC<PatientCardProps> = (props) => {
  const { name, orderId, id } = props;

  return (
    <Card sx={{ padding: 2, justifyContent: 'flex-start', width: 400, height: 120 }}>
      <Typography variant="h5" textAlign="start" sx={{ marginBottom: 2 }}>
        name:{name}
      </Typography>
      <Button> order</Button>
    </Card>
  );
};

export default PatientCard;
