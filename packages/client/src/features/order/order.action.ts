export enum OrderSagaAction {
  FETCH_ORDERS = 'order/fetch-orders',
}

export const fetchOrdersActionCreator = () => {
  return { type: OrderSagaAction.FETCH_ORDERS };
};
