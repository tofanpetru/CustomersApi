import express, { Request, Response } from 'express';
import { Customer } from '../../repository/persistence/Customer';
import { getCustomers, addCustomer, updateCustomer, getCustomerById } from '../../repository/dbContext';
import { CreateCustomerRequestValidator } from '../validation/CreateCustomerRequestValidator';
import { PaginationService } from '../../application/services/PaginationService';

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
 */
router.get('/', (req: Request, res: Response) => {
    const customers = getCustomers();
    const { page, perPage } = req.query;

    const paginationService = new PaginationService<Customer>(customers);

    const paginatedData = paginationService.paginate({
        page: parseInt(page as string) || 1,
        perPage: parseInt(perPage as string) || 10,
        controllerName: 'customers',
    });

    res.json(paginatedData);
});

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     description: Retrieve a customer by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the customer to retrieve.
 *     responses:
 *       200:
 *         description: A customer with the specified ID.
 *       404:
 *         description: Customer not found.
 */
router.get('/:id', (req: Request, res: Response) => {
    try {
        const customerId = parseInt(req.params.id);

        if (isNaN(customerId) || customerId < 1) {
            res.status(400).json({ error: 'Invalid customer ID' });
            return;
        }

        const customer = getCustomerById(customerId);

        res.status(200).json(customer);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
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

router.put('/:id', (req: Request, res: Response) => {
    try {
        const customerId = parseInt(req.params.id);
        const updatedCustomer: Customer = req.body;

        const updated = updateCustomer(customerId, updatedCustomer);

        if (updated) {
            res.status(200).json(updated);
            return;
        }

        res.status(404).json({ error: 'Customer not found with ID ' + customerId });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;