import express, { Request, Response, Router } from 'express';
import { HttpStatus } from '../../domain/enums/httpStatus';

export class DefaultRoute {
    public registerRoute(): Router {
        const router = express.Router();

        router.get('/', (req: Request, res: Response) => {
            const availableEndpoints = [
                'http://localhost:3000/customers',
                'http://localhost:3000/api-docs',
            ];
            res.status(HttpStatus.OK).json(availableEndpoints);
        });

        return router;
    }
}
