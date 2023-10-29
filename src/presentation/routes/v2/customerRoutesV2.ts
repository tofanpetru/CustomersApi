import { Request, Response, Router } from 'express';
import { ICustomerRepository } from '../../../repository/repository/interfaces/ICustomerRepository';
import { CustomerRoutes } from '../v1/customerRoutes';

export class CustomerRoutesV2 extends CustomerRoutes {
    constructor(protected customerRepository: ICustomerRepository) {
        super(customerRepository);
    }

    public registerRoutes(): Router {
        let router = super.registerRoutes();

        return router;
    }

    protected override registerGetAllCustomers(router: Router): void {
        /**
         * @swagger
         * /v2/customers:
         *   get:
         *     summary: Get a list of customers (v2)
         *     description: Get a paginated list of customers for version 2
         *     tags:
         *       - Customers
         *     responses:
         *       200:
         *         description: Successfully retrieved customers for v2
         *         schema:
         *           type: object
         *           properties:
         *             data:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Customer'
         *             pagination:
         *               $ref: '#/components/schemas/Pagination'
         *       400:
         *         description: Bad request
         */
        router.get('/', async (req: Request, res: Response) => {
            const customers = await this.customerRepository.getAll();

            res.json(customers);
        });
    }
}
