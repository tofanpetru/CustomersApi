import { Request, Response, Router } from 'express';
import { ICustomerRepository } from '../../repository/repository/interfaces/ICustomerRepository';
import { CustomerRoutes } from './customerRoutes';

export class CustomerRoutesV2 extends CustomerRoutes {
    constructor(customerRepository: ICustomerRepository) {
        super(customerRepository);
    }

    public registerRoutes(): Router {
        let router = super.registerRoutes();

        return router;
    }

    protected override registerGetAllCustomers(router: Router): void {
        router.get('/', async (req: Request, res: Response) => {
            res.json("customers");
        });
    }
}
