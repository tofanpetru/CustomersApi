import { Express } from 'express';
import { ErrorHandlingMiddleware } from '../middlewares/ErrorHandlingMiddleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';

export function registerCustomMiddleware(app: Express): void {
    const customMiddlewares = [ErrorHandlingMiddleware, LoggingMiddleware];

    customMiddlewares.forEach((middleware) => {
        app.use(middleware);
    });

    console.log('Custom middleware registered: ', customMiddlewares);
}
