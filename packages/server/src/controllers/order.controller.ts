import { JsonController, Get } from "routing-controllers";
import { Inject, Service } from "typedi";

import OrderService from "../services/order.service";

@JsonController("/orders")
@Service()
class OrderController {
  constructor(@Inject() private orderService: OrderService) {}

  @Get("/")
  getAllOrders() {
    return this.orderService.getAllOrders();
  }
}

export default OrderController;
