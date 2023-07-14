import Container, { Service } from 'typedi';


import OrderModel, { Order } from '../model/order.model';

@Service()
class OrderService {
  constructor() {
    this.orderModel = Container.get('OrderModel');
  }
  private orderModel: typeof OrderModel;

  getAllOrders = async (): Promise<Order[]> => {
    const result = (await this.orderModel.find().exec()).map((r) => r.toObject());
    console.log(result);
    return result;
  };
}

export default OrderService;
