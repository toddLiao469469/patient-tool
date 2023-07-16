import { Path, httpRequest } from '../../lib/request';
import { Order } from '../../lib/types';

// mock data
export const getOrders = (): Promise<Order[]> => {
  return httpRequest(Path.Orders, 'GET');
};

export const getOrder = (id: string): Promise<Order> => {
  return httpRequest(`${Path.Order}/${id}`, 'GET');
};

export const createOrder = (order: Order): Promise<Order> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(order);
    }, 3000);
  });
};
