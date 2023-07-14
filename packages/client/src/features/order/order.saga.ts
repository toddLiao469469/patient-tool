import { takeLatest, put, call } from 'redux-saga/effects';

import { Order } from '../../lib/types';
import { fetchOrdersFail, fetchOrdersFetching, fetchOrdersSuccess } from './order.slice';
import { getOrders } from './order.service';
import { OrderSagaAction } from './order.action';

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
