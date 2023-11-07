import GetOrder from "../../application/usecase/get_order/GetOrder";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";

export default class GetOrderController {
  constructor(private readonly repositoryFactory: RepositoryFactory) {

  }

  async execute(params: any, body: any) {
    const getOrder = new GetOrder(this.repositoryFactory);
    return await getOrder.execute(params.code);
  }
}