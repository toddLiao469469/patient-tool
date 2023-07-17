import { takeLatest, put, call, all, takeEvery } from 'redux-saga/effects';

import { Order } from '../../lib/types';
import { ordersFail, ordersFetching, fetchOrderSuccess } from './order.slice';
import { getOrder, createOrder } from './order.service';
import {
  OrderSagaAction,
  fetchOrderActionCreator,
  createOrdersActionCreator,
} from './order.action';

function* fetchOrder(
  action: ReturnType<typeof fetchOrderActionCreator>,
): Generator<unknown, void, Order> {
  try {
    const { payload } = action;
    yield put(ordersFetching());

    const result = yield call(() => getOrder(payload));

    yield put(fetchOrderSuccess(result));
  } catch (error) {
    yield put(ordersFail('Error'));
  }
}

function* createOrderGenerator(
  action: ReturnType<typeof createOrdersActionCreator>,
): Generator<unknown, void, Order> {
  try {
    const { payload } = action;
    yield put(ordersFetching());

    const newOrder = yield call(() => createOrder(payload));
    yield put(ordersFetching());

    const result = yield call(() => getOrder(newOrder.orderId));
    yield put(fetchOrderSuccess(result));
  } catch (error) {
    yield put(ordersFail('Error'));
  }
}

export function* watchFetchOrder() {
  yield takeEvery(OrderSagaAction.FETCH_ORDER, fetchOrder);
}
export function* watchCreateOrder() {
  yield takeLatest(OrderSagaAction.CREATE_ORDER, createOrderGenerator);
}

export function* orderSaga() {
  yield all([watchFetchOrder(), watchCreateOrder()]);
}
