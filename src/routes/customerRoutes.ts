import express, { Request, Response } from 'express';
import { Customer } from '../models/Customer';
import { getCustomers, addCustomer } from '../infrastructure/dbContext';
import { CreateCustomerRequestValidator } from '../validation/CreateCustomerRequestValidator';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    const customers = getCustomers();
    res.json(customers);
});

router.post('/', CreateCustomerRequestValidator, (req: Request, res: Response) => {
    try {
        const newCustomer: Customer = req.body;
        const addedCustomer = addCustomer(newCustomer);

        res.status(201).json(addedCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Could not create customer' });
    }
});

export default router;