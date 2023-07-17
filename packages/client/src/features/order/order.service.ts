import { Path, httpRequest } from '../../lib/request';
import { Order } from '../../lib/types';

// mock data
export const getOrders = (): Promise<Order[]> => {
  return httpRequest(Path.Orders, 'GET');
};

export const getOrder = (id: string): Promise<Order> => {
  return httpRequest(`${Path.Order}/${id}`, 'GET');
};

export const createOrder = (input: { message: string; patientId: string }): Promise<Order> => {
  return httpRequest(`${Path.Order}`, 'POST', input);
};
