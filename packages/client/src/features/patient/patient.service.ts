import { Path, httpRequest } from '../../lib/request';
import { Patient } from '../../lib/types';

export const getPatients = (): Promise<Patient[]> => {
  return httpRequest<Patient[]>(Path.Patients, 'GET');
};
