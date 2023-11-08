import OrderDAO from "../../application/dao/OrderDAO";
import GetOrders from "../../application/query/get_orders/GetOrders";
import Connection from "../database/Connection";

export default class GetOrdersController {
  constructor(readonly orderDAO: OrderDAO) {

  }

  async execute(params: any, body: any) {
    const getOrders = new GetOrders(this.orderDAO);
    return await getOrders.execute();
  }
}