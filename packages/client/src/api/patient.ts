import { Patient } from '../lib/types';

// mock data
export const getPatients = (): Promise<Patient[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Tim1',
          orderId: '1',
        },
        {
          id: '2',
          name: 'Tim2',
          orderId: '2',
        },
        {
          id: '3',
          name: 'Tim3',
          orderId: '3',
        },
        {
          id: '4',
          name: 'Tim4',
          orderId: '4',
        },
        {
          id: '5',
          name: 'Tim5',
          orderId: '5',
        },
      ]);
    }, 3000);
  });
};
