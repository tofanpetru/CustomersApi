import { Express } from 'express';
import { LoggingMiddleware } from '../presentation/middlewares/LoggingMiddleware';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { CustomerRoutes } from '../presentation/routes/v1/customerRoutes';
import { DbContext } from '../repository/dbContext';
import { Customer } from '../repository/persistence/Customer';
import CustomerRepository from '../repository/repository/implementations/customerRepository';
import ErrorHandlingMiddleware from '../presentation/middlewares/ErrorHandlingMiddleware';
import { DefaultRoute } from '../presentation/routes/defaultRoute';
import { CustomerRoutesV2 } from '../presentation/routes/v2/customerRoutesV2';
import { swaggerSpec } from '../presentation/swagger';

export function registerDependencies(app: Express): void {
    registerCustomMiddleware(app);
    registerServices(app);
    registerRoutes(app);
}

function registerCustomMiddleware(app: Express): void {
    const customMiddlewares = [ErrorHandlingMiddleware, LoggingMiddleware];

    customMiddlewares.forEach((middleware) => {
        app.use(middleware);
    });

    console.log('Custom middleware registered: ', customMiddlewares);
}

function registerServices(app: Express): void {
    app.use(bodyParser.json());
}

export function registerRoutes(app: Express): void {
    const versions = [1, 2];
    const dbContext = new DbContext<Customer>();
    const customerRepository = new CustomerRepository(dbContext);

    const customerRoutes = new CustomerRoutes(customerRepository);
    const customerRoutesV2 = new CustomerRoutesV2(customerRepository);
    const defaultRoute = new DefaultRoute();

    app.use('/v1/customers', customerRoutes.registerRoutes());
    app.use('/v2/customers', customerRoutesV2.registerRoutes());
    app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/', defaultRoute.registerRoute());
}