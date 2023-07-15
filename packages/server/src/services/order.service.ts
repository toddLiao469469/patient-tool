import Container, { Service } from 'typedi';


import OrderModel, { Order } from '../model/order.model';

@Service()
class OrderService {
  constructor() {
    this.orderModel = Container.get('OrderModel');
  }
  private orderModel: typeof OrderModel;

  getAllOrders = async (): Promise<Order[]> => {
    const result = await this.orderModel.find().lean()
    return result;
    };


  getOrder = async (id: string): Promise<Order> => {
    const result = await this.orderModel.findById(id).lean();
    if (result) {
      return result;
    } else {
      throw new Error('Order not found');
    }
  }
}

export default OrderService;
