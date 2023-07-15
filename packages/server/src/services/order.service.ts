import Container, { Service } from 'typedi';

import OrderModel, { Order } from '../model/order.model';

export interface CreateOrderInput {
  message: string;
}
export interface UpdateOrderInput {
  message: string;
}

@Service()
class OrderService {
  constructor() {
    this.orderModel = Container.get('OrderModel');
  }
  private orderModel: typeof OrderModel;

  getAllOrders = async (): Promise<Order[]> => {
    const result = await this.orderModel.find().lean();
    return result;
  };

  getOrder = async (id: string): Promise<Order> => {
    const result = await this.orderModel.findById(id).lean();
    if (result) {
      return result;
    } else {
      throw new Error('Order not found');
    }
  };

  createOrder = async (input: CreateOrderInput): Promise<Order> => {
    const result = await this.orderModel.create({ ...input });
    return result;
  };

  updateOrder = async (orderId: string, input: UpdateOrderInput): Promise<Order> => {
    const result = await this.orderModel.findByIdAndUpdate(orderId, { ...input }, { new: true });
    if (result) {
      return result;
    } else {
      throw new Error('Order not found');
    }
  };
}

export default OrderService;
