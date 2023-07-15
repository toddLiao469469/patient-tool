import { takeLatest, put, call, all, takeEvery } from 'redux-saga/effects';

import { Order } from '../../lib/types';
import { ordersFail, ordersFetching, fetchOrderSuccess } from './order.slice';
import { getOrder } from './order.service';
import { OrderSagaAction, fetchOrderActionCreator } from './order.action';

function* fetchOrder(
  action: ReturnType<typeof fetchOrderActionCreator>,
): Generator<unknown, void, Order> {
  try {
    const { payload } = action;
    yield put(ordersFetching());

    console.log('fetchOrder', payload);
    const result = yield call(() => getOrder(payload));
    console.log('result', result);
    yield put(fetchOrderSuccess(result));
  } catch (error) {
    yield put(ordersFail('Error'));
  }
}

export function* watchFetchOrder() {
  yield takeEvery(OrderSagaAction.FETCH_ORDER, fetchOrder);
}

export function* orderSaga() {
  yield all([watchFetchOrder()]);
}
