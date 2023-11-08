import Connection from "../../../infra/database/Connection";
import GetOrdersOutput from "./GetOrdersOutput";


export default class GetOrders {
  constructor(readonly connection: Connection) {
  }

  async execute(): Promise<GetOrdersOutput> {
    const orders = await this.connection.query("select * from ccca.order", []);
    const getOrdersOutput = new GetOrdersOutput();
    for (const order of orders) {
      getOrdersOutput.addOrder(order.code, order.total);
    }
    return getOrdersOutput;
  }
}