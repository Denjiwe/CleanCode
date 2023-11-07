import GetOrders from "../../application/usecase/get_orders/GetOrders";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";

export default class GetOrdersController {
  constructor(private readonly repositoryFactory: RepositoryFactory) {

  }

  async execute(params: any, body: any) {
    const getOrders = new GetOrders(this.repositoryFactory);
    return await getOrders.execute();
  }
}