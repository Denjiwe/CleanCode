"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Broker_1 = __importDefault(require("./infra/broker/Broker"));
const OrderDAODatabase_1 = __importDefault(require("./infra/dao/OrderDAODatabase"));
const PgPromiseConnectionAdapter_1 = __importDefault(require("./infra/database/PgPromiseConnectionAdapter"));
const DatabaseRepositoryFactory_1 = __importDefault(require("./infra/factory/DatabaseRepositoryFactory"));
const ExpressAdapter_1 = __importDefault(require("./infra/http/ExpressAdapter"));
const RouterConfig_1 = __importDefault(require("./infra/http/RouterConfig"));
const repositoryFactory = new DatabaseRepositoryFactory_1.default();
const connection = PgPromiseConnectionAdapter_1.default.getInstance();
const orderDAO = new OrderDAODatabase_1.default(connection);
const httpAdapter = new ExpressAdapter_1.default();
const broker = new Broker_1.default();
new RouterConfig_1.default(httpAdapter, repositoryFactory, orderDAO, broker);
httpAdapter.listen(3000);
