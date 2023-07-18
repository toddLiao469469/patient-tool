import Container, { Service, Inject } from 'typedi';
import uuid from 'short-uuid';

import OrderModel, { Order } from '../model/order.model';
import PatientService from './patient.service';

export interface CreateOrderInput {
  message: string;
  patientId: string;
}
export interface UpdateOrderInput {
  message: string;
}

@Service()
class OrderService {
  constructor(@Inject() private patientService: PatientService) {
    this.orderModel = Container.get('OrderModel');
  }
  private orderModel: typeof OrderModel;

  getAllOrders = async (): Promise<Order[]> => {
    const result = await this.orderModel.find().lean();
    return result;
  };

  getOrder = async (orderId: string): Promise<Order> => {
    const result = await this.orderModel.findOne({ orderId }).lean();
    if (result) {
      return result;
    } else {
      throw new Error('Order not found');
    }
  };

  createOrder = async (input: CreateOrderInput): Promise<Order> => {
    const { patientId, message } = input;

    const order = new this.orderModel({ message, orderId: uuid().new() });

    const result = (await order.save()).toObject();

    this.patientService.updatePatientOrder(patientId, { orderId: result.orderId });

    return result;
  };

  updateOrder = async (orderId: string, input: UpdateOrderInput): Promise<Order> => {
    const result = await this.orderModel.findOneAndUpdate({ orderId }, { ...input }, { new: true });
    if (result) {
      return result;
    } else {
      throw new Error('Order not found');
    }
  };
}

export default OrderService;
