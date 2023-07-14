import { Patient } from '../../lib/types';

// mock data
export const getPatients = (): Promise<Patient[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: '4bcc7427-a5f1-ce21-8468-1c8f0b8a8d16',
          name: 'Tim1',
          orderId: '4370c9c5-3ae5-887e-a5d9-9b2caef0023b',
        },
        {
          id: '1c8b00c1-fe54-cd17-191c-d04d2b7248e0',
          name: 'Tim2',
        },
        {
          id: 'ecd29f9a-dd8c-811e-4c40-35768975fe7c',
          name: 'Tim3',
          orderId: 'b2eddec2-e589-7025-fc70-a797f72319f7',
        },
        {
          id: '5d9bfb7f-1653-f24f-4731-a9c526d68a09',
          name: 'Tim4',
          orderId: 'b3d3ab0f-fb89-08d4-4d52-5815195e2263',
        },
        {
          id: '28b59f4e-1fe2-3521-4261-435bf5bae699',
          name: 'Tim5',
        },
      ]);
    }, 3000);
  });
};
