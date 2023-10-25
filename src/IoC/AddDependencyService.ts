import { Express } from 'express';
import { ErrorHandlingMiddleware } from '../middlewares/ErrorHandlingMiddleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';
import { seedDatabase } from '../infrastructure/dbContext';
import { swaggerSpec } from '../../swagger';
import swaggerUi from 'swagger-ui-express';
import customerRoutes from '../../src/routes/customerRoutes';
import bodyParser from 'body-parser';

export function registerDependencies(app: Express): void {
    registerServices(app);
    registerCustomMiddleware(app);
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
    seedDatabase();
}

function registerRoutes(app: Express): void {
    app.use('/customers', customerRoutes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}