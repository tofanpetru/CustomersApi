import express, { Request, Response } from 'express';
import { Customer } from '../models/Customer';
import { getCustomers, addCustomer } from '../infrastructure/dbContext';
import { CreateCustomerRequestValidator } from '../validation/CreateCustomerRequestValidator';
import { PaginationService } from '../services/PaginationService';

const router = express.Router();

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get a list of customers with pagination
 *     description: Retrieve a list of customers with optional pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination.
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: The number of items to display per page.
 *     responses:
 *       200:
 *         description: A list of customers with pagination info.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedCustomerResponse'
 */
router.get('/', (req: Request, res: Response) => {
    const customers = getCustomers();
    const { page, perPage } = req.query;

    const paginationService = new PaginationService<Customer>(customers);
    const pageInt = parseInt(page as string) || 1;
    const perPageInt = parseInt(perPage as string) || 10;

    const paginatedData = paginationService.paginate(pageInt, perPageInt);

    res.json(paginatedData);
});

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     description: Create a new customer record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: The created customer
 *       400:
 *         description: Bad request
 */
router.post('/', CreateCustomerRequestValidator, (req: Request, res: Response) => {
    try {
        const newCustomer: Customer = req.body;
        const addedCustomer = addCustomer(newCustomer);

        res.status(201).json(addedCustomer);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});//todo sa prinzi o exceptie custom, sa ie adaugat in middleware. sa se foloseasca statuscodes in loc de hartcodari

export default router;