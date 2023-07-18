export enum Path {
  Patients = '/patients',
  Orders = '/orders',
  Order = '/order',
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const BaseURL = 'http://localhost:3010';

export const httpRequest = async <T>(path: string, method: Method, body?: unknown): Promise<T> => {
  const res = await fetch(`${BaseURL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res.json() as T;
};
