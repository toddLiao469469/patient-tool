import { Order } from '../../lib/types';

const mockOrders: Order[] = [
  {
    id: '4370c9c5-3ae5-887e-a5d9-9b2caef0023b',
    message: '這是醫囑1',
  },
  {
    id: 'b2eddec2-e589-7025-fc70-a797f72319f7',
    message: '這是醫囑2',
  },
  {
    id: 'b3d3ab0f-fb89-08d4-4d52-5815195e2263',
    message: '這是醫囑3',
  },
];

// mock data
export const getOrders = (): Promise<Order[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 3000);
  });
};

export const getOrder = (id: string): Promise<Order> => {
  console.log('getOrder', id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = mockOrders.find((order) => order.id === id);
      if (order) {
        resolve(order);
      } else {
        reject(new Error('Order not found'));
      }
    }, 3000);
  });
};

export const createOrder = (order: Order): Promise<Order> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(order);
    }, 3000);
  });
};
