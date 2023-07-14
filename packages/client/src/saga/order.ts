import { takeLatest, put, call } from 'redux-saga/effects';

import { Order } from '../lib/types';
import { fetchOrdersFail, fetchOrdersFetching, fetchOrdersSuccess } from '../reducers/order';
import { getOrders } from '../api/order';

export enum OrderSagaAction {
  FETCH_ORDERS = 'order/fetch-orders',
}

export const fetchOrdersActionCreator = () => {
  return { type: OrderSagaAction.FETCH_ORDERS };
};

function* fetchOrders(): Generator<unknown, void, Order[]> {
  try {
    yield put(fetchOrdersFetching());

    const result = yield call(getOrders);
    console.log('result', result);
    yield put(fetchOrdersSuccess(result));
  } catch (error) {
    yield put(fetchOrdersFail('Error'));
  }
}

export function* orderSaga() {
  yield takeLatest(OrderSagaAction.FETCH_ORDERS, fetchOrders);
}
