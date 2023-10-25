import express, { Request, Response } from 'express';
import { Customer } from '../models/Customer';

const router = express.Router();

let customers: Customer[] = [];

router.get('/', (req: Request, res: Response) => {
    res.json(customers);
});

router.post('/', (req: Request, res: Response) => {
    const newCustomer: Customer = req.body;
    customers.push(newCustomer);
    res.status(201).json(newCustomer);
});

router.post('/', (req: Request, res: Response) => {
    try {
        const newCustomer: Customer = req.body;

        customers.push(newCustomer);

        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(500).json({ error: 'Could not create customer' });
    }
});


export default router;