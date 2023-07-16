import { Button, Card, Typography, styled, useTheme } from '@mui/material';

import { Patient } from '../../lib/types';
import { useAppDispatch } from '../../store';

import { openOrderDialog } from '../order/orderDialog.slice';

const TitleField = styled(Typography)`
  color: ${(props) => props.theme.palette.primary.main};
`;

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = (props) => {
  const theme = useTheme();

  const {
    patient: { name, patientId, createdAt, updatedAt },
  } = props;
  const dispatch = useAppDispatch();

  return (
    <Card sx={{ padding: 2, justifyContent: 'flex-start', width: 400, minHeight: 120 }}>
      <TitleField variant="subtitle1" textAlign="start" sx={{ color: theme.palette.primary.main }}>
        Name:
      </TitleField>
      <Typography variant="body1">{name}</Typography>
      <TitleField variant="subtitle1" textAlign="start">
        CreatedAt:
      </TitleField>
      <Typography variant="body1">{createdAt.valueOf()}</Typography>
      <TitleField variant="subtitle1" textAlign="start">
        UpdateAt:
      </TitleField>
      <Typography variant="body1">{updatedAt.valueOf()}</Typography>

      <div style={{ display: 'flex', flexDirection: 'row-reverse', marginTop: theme.spacing(4) }}>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(openOrderDialog(patientId));
          }}
        >
          order
        </Button>
      </div>
    </Card>
  );
};

export default PatientCard;
