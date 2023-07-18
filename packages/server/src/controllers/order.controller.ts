import { JsonController, Get, Param, Patch, Body, Post } from 'routing-controllers';
import { Inject, Service } from 'typedi';

import OrderService, { CreateOrderInput, UpdateOrderInput } from '../services/order.service';

@JsonController()
@Service()
class OrderController {
  constructor(@Inject() private orderService: OrderService) {}

  @Get('/orders')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('/order/:id')
  getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }

  @Post('/order')
  createOrder(@Body() body: CreateOrderInput) {
    return this.orderService.createOrder(body);
  }

  @Patch('/order/:id')
  updateOrder(@Param('id') id: string, @Body() body: UpdateOrderInput) {
    return this.orderService.updateOrder(id, body);
  }
}

export default OrderController;
