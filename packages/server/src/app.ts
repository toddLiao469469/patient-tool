import 'reflect-metadata';
import express from 'express';
import { useContainer as routingUseContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import  PatientController from './controllers/patient.controller';

// 建立 TypeDI 容器
const container = Container.of();

// 將 TypeDI 容器與 routing-controllers 整合
routingUseContainer(container);

// 建立 Express 服務
const app = express();

// 使用 routing-controllers 創建路由
// eslint-disable-next-line react-hooks/rules-of-hooks
useExpressServer(app, {
  controllers: [PatientController]
});

// 啟動服務
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});