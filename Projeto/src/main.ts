import Broker from './infra/broker/Broker';
import OrderDAODatabase from './infra/dao/OrderDAODatabase';
import PgPromiseConnectionAdapter from './infra/database/PgPromiseConnectionAdapter';
import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory';
import ExpressAdapter from './infra/http/ExpressAdapter';
import RouterConfig from './infra/http/RouterConfig';

const repositoryFactory = new DatabaseRepositoryFactory();
const connection = PgPromiseConnectionAdapter.getInstance();
const orderDAO = new OrderDAODatabase(connection);
const httpAdapter = new ExpressAdapter();
const broker = new Broker();
new RouterConfig(httpAdapter, repositoryFactory, orderDAO, broker);
httpAdapter.listen(3000);