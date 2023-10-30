import express, { Request, Response, Router } from 'express';
import { HttpStatus } from '../../domain/enums/httpStatus';

export class DefaultRoute {
    public registerRoute(): Router {
        const router = express.Router();

        /**
         * @swagger
         * /:
         *   get:
         *     summary: Get a list of available endpoints
         *     description: Returns a list of all available endpoints
         *     tags:
         *       - Endpoints
         *     responses:
         *       200:
         *         description: Successfully retrieved the list of endpoints
         *         content:
         *           application/json:
         *             example:
         *               endpoints: ['/customers', '/api-docs']
         */
        router.get('/', (req: Request, res: Response) => {
            const availableEndpoints = [
                'http://localhost:3000/v1/customers',
                'http://localhost:3000/v2/customers',
                'http://localhost:3000/api-docs'
            ];
            res.status(HttpStatus.OK).json(availableEndpoints);
        });

        return router;
    }
}
