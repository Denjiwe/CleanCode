import DatabaseRepositoryFactory from './infra/factory/DatabaseRepositoryFactory';
import ExpressAdapter from './infra/http/ExpressAdapter';
import RouterConfig from './infra/http/RouterConfig';

const repositoryFactory = new DatabaseRepositoryFactory();
const httpAdapter = new ExpressAdapter();
new RouterConfig(httpAdapter, repositoryFactory);
httpAdapter.listen(3000);