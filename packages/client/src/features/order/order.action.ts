import { Order } from '../../lib/types';

export enum OrderSagaAction {
  FETCH_ORDER = 'order/fetch-order',
  CREATE_ORDER = 'order/create-order',
  UPDATE_ORDER = 'order/update-order',
}

export const fetchOrderActionCreator = (payload: string) => {
  return { type: OrderSagaAction.FETCH_ORDER, payload };
};

interface CreateOrderPayload extends Omit<Order, 'orderId'> {
  patientId: string;
}

export const createOrdersActionCreator = (payload: CreateOrderPayload) => {
  return { type: OrderSagaAction.CREATE_ORDER, payload };
};

export const updateOrdersActionCreator = () => {
  return { type: OrderSagaAction.UPDATE_ORDER };
};
