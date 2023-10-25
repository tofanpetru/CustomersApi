import express, { Request, Response } from 'express';
import { Customer } from '../models/Customer';

const router = express.Router();

let customers: Customer[] = [];

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get a list of customers
 *     description: Retrieve a list of all customers.
 *     responses:
 *       200:
 *         description: A list of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
router.get('/', (req: Request, res: Response) => {
    res.json(customers);
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