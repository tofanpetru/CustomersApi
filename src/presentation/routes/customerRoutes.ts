import express, { Request, Response } from 'express';
import { Customer } from '../../repository/persistence/Customer';
import CustomerRepository from '../../repository/repository/implementations/customerRepository';
import { CreateCustomerRequestValidator } from '../validation/CreateCustomerRequestValidator';
import { PaginationService } from '../../application/services/PaginationService';
import { DbContext } from '../../repository/dbContext'; 

const router = express.Router();

const dbContext = new DbContext<Customer>();
const customerRepository = new CustomerRepository(dbContext);

router.get('/', async (req: Request, res: Response) => {
    const { page, perPage } = req.query;
    const customers = await customerRepository.findAll();
    
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
        const customer = await customerRepository.getCustomerById(customerId);

        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({ error: 'Customer not found with ID ' + customerId });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/', CreateCustomerRequestValidator, async (req: Request, res: Response) => {
    try {
        const newCustomer: Customer = req.body;
        const addedCustomer = await customerRepository.createCustomer(newCustomer);

        res.status(201).json(addedCustomer);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    try {
        const customerId = req.params.id;
        const updatedCustomer: Customer = req.body;

        const updated = await customerRepository.updateCustomer(customerId, updatedCustomer);

        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({ error: 'Customer not found with ID ' + customerId });
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router;