import express, { Request, Response, Router } from 'express';
import { Customer } from '../../repository/persistence/Customer';
import { PaginationService } from '../../application/services/PaginationService';
import { ICustomerRepository } from '../../repository/repository/interfaces/ICustomerRepository';
import { CreateCustomerValidator } from '../validation/CreateCustomerValidator';

export class CustomerRoutes {
    constructor(private customerRepository: ICustomerRepository) {
    }

    public registerRoutes(): Router {
        const router = express.Router();
        const createCustomerValidator = new CreateCustomerValidator(this.customerRepository);

        router.get('/', async (req: Request, res: Response) => {
            const { page, perPage } = req.query;
            const customers = await this.customerRepository.getAll();

            const paginationService = new PaginationService<Customer>(customers);

            const paginatedData = paginationService.paginate({
                page: parseInt(page as string) || 1,
                perPage: parseInt(perPage as string) || 10,
                controllerName: 'customers',
            });

            res.json(paginatedData);
        });

        router.get('/:id', async (req: Request, res: Response) => {
            try {
                const customerId = req.params.id;
                const customer = await this.customerRepository.getCustomerById(customerId);

                if (customer) {
                    res.status(200).json(customer);
                } else {
                    res.status(404).json({ error: 'Customer not found with ID ' + customerId });
                }
            } catch (error: any) {
                res.status(400).json({ error: error.message });
            }
        });

        router.post('/', createCustomerValidator.getValidator(), async (req: Request, res: Response) => {
            try {
                const newCustomer: Customer = req.body;
                const addedCustomer = await this.customerRepository.createCustomer(newCustomer);

                res.status(201).json(addedCustomer);
            } catch (error: any) {
                res.status(400).json({ error: error.message });
            }
        });

        router.put('/:id', async (req: Request, res: Response) => {
            try {
                const customerId = req.params.id;
                const updatedCustomer: Customer = req.body;

                const updated = await this.customerRepository.updateCustomer(customerId, updatedCustomer);

                if (updated) {
                    res.status(200).json(updated);
                } else {
                    res.status(404).json({ error: 'Customer not found with ID ' + customerId });
                }
            } catch (error: any) {
                res.status(400).json({ error: error.message });
            }
        });

        return router;
    }
}