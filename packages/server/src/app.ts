import 'reflect-metadata';
import express from 'express';
import mongoose from 'mongoose';
import { useContainer as routingUseContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import PatientController from './controllers/patient.controller';

import PatientModel from './model/patient.model';
import orderRepo from './model/order.model';
import OrderController from './controllers/order.controller';
import OrderModel from './model/order.model';

const container = Container.of();
container.set('PatientModel', PatientModel);
container.set('OrderModel', OrderModel);

routingUseContainer(container);

const app = express();

mongoose
  .connect('mongodb://localhost/mydatabase')
  .then(() => {
    console.log('MongoDB 連線成功');

    initializeDefaultData();
  })
  .catch((error) => {
    console.error('MongoDB 連線失敗', error);
  });
// eslint-disable-next-line react-hooks/rules-of-hooks
useExpressServer(app, {
  controllers: [PatientController,OrderController],
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

async function initializeDefaultData() {
  const firstPatient = await PatientModel.findOne({ name: 'Patient 1' });
  const order = await orderRepo.findById(firstPatient?.orderId);

  console.log(order);

  try {
    const existingOrders = await orderRepo.find();
    if (existingOrders.length > 0) {
      console.log('預設醫囑已存在');
      return;
    }

    const defaultOrders = [
      { message: '每日服用一顆藥丸，飯後30分鐘。' },
      { message: '每天晚上休息充足，保持良好的睡眠品質。' },
      { message: '發燒時，每隔4小時服用解熱藥，並多喝水休息。' },
    ];

    const createdOrders = await orderRepo.create(defaultOrders);
    console.log('預設病患資料已建立', createdOrders);
  } catch (error) {
    console.error('初始化預設病患資料失敗', error);
  }

  try {
    const existingPatients = await PatientModel.find();
    if (existingPatients.length > 0) {
      console.log('預設病患資料已存在');
      return;
    }
    const defaultOrders = await orderRepo.find();
    const defaultPatients = [
      { name: 'Patient 1', orderId: defaultOrders[0]._id },
      { name: 'Patient 2' },
      { name: 'Patient 3', orderId: defaultOrders[1]._id },
      { name: 'Patient 4', orderId: defaultOrders[2]._id },
      { name: 'Patient 5' },
    ];

    const createdPatients = await PatientModel.create(defaultPatients);
    console.log('預設病患資料已建立', createdPatients);
  } catch (error) {
    console.error('初始化預設病患資料失敗', error);
  }
}
