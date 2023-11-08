import GetOrder from "../../application/query/get_order/GetOrder";
import Connection from "../database/Connection";

export default class GetOrderController {
  constructor(private readonly connection: Connection) {

  }

  async execute(params: any, body: any) {
    const getOrder = new GetOrder(this.connection);
    return await getOrder.execute(params.code);
  }
}