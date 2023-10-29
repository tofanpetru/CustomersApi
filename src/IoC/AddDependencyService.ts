import { Express } from 'express';
import { ErrorHandlingMiddleware } from '../presentation/routes/middlewares/ErrorHandlingMiddleware';
import { LoggingMiddleware } from '../presentation/routes/middlewares/LoggingMiddleware';
import { swaggerSpec } from '../../swagger';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { CustomerRoutes } from '../presentation/routes/customerRoutes';
import { DbContext } from '../repository/dbContext';
import { GenericRepository } from '../repository/repository/abstract/genericRepository';
import { Customer } from '../repository/persistence/Customer';

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
    const dbContext = new DbContext<Customer>(); 
    const customerRepository = new GenericRepository<Customer>(dbContext); 

    const customerRoutes = new CustomerRoutes(customerRepository);

    app.use('/customers', customerRoutes.registerRoutes());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
