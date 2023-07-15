import { JsonController, Get, Param } from "routing-controllers";
import { Inject, Service } from "typedi";

import OrderService from "../services/order.service";

@JsonController()
@Service()
class OrderController {
  constructor(@Inject() private orderService: OrderService) {}

  @Get("/orders")
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get("/order/:id")
  getOrder(@Param('id') id: string) {
    console.log('id',id)
    return this.orderService.getOrder(id);
  }

}

export default OrderController;
