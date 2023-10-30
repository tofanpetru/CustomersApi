import express, { Request, Response, Router } from 'express';
import { Customer } from '../../../repository/persistence/Customer';
import { PaginationService } from '../../../application/services/PaginationService';
import { ICustomerRepository } from '../../../repository/repository/interfaces/ICustomerRepository';
import { CreateCustomerValidator } from '../../validation/CreateCustomerValidator';
import { HttpStatus } from '../../../domain/enums/httpStatus';

export class CustomerRoutes {
    constructor(protected customerRepository: ICustomerRepository) {
    }

    public registerRoutes(): Router {
        const router = express.Router();

        this.registerGetAllCustomers(router);
        this.registerGetById(router);
        this.registerCreateNewCustomer(router, new CreateCustomerValidator(this.customerRepository));
        this.registerUpdateCustomer(router);
        this.registerDelete(router);

        return router;
    }

    protected registerCreateNewCustomer(router: Router, createCustomerValidator: CreateCustomerValidator) {
        /**
         * @swagger
         * /v1/customers:
         *   post:
         *     summary: Create a new customer
         *     description: Create a new customer
         *     tags:
         *       - Customers
         *     requestBody:
         *       description: The new customer
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Customer'
         *     responses:
         *       201:
         *         description: Successfully created the customer
         *         schema:
         *           $ref: '#/components/schemas/Customer'
         *       400:
         *         description: Bad request
         *       422:
         *         description: Unprocessable Entity
         *         content:
         *           application/json:
         *             example:
         *               errors: ["'Name' must not be empty.", "'Email' must be a valid email address."]
         */
        router.post('/', createCustomerValidator.getValidator(), async (req: Request, res: Response) => {
            try {
                const newCustomer: Customer = req.body;
                const addedCustomer = await this.customerRepository.createCustomer(newCustomer);

                res.status(HttpStatus.CREATED).json(addedCustomer);
            } catch (error: any) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
            }
        });
    }

    protected registerUpdateCustomer(router: Router) {
        /**
         * @swagger
         * /v1/customers/{id}:
         *   put:
         *     summary: Update customer by ID
         *     description: Update a customer by its ID
         *     tags:
         *       - Customers
         *     parameters:
         *       - name: id
         *         in: path
         *         description: Customer ID
         *     requestBody:
         *       description: The updated customer
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Customer'
         *     responses:
         *       200:
         *         description: Successfully updated the customer
         *         schema:
         *           $ref: '#/components/schemas/Customer'
         *       404:
         *         description: Customer not found with the specified ID
         *       400:
         *         description: Bad request
         */
        router.put('/:id', async (req: Request, res: Response) => {
            try {
                const customerId = req.params.id;
                const updatedCustomer: Customer = req.body;

                const updated = await this.customerRepository.updateCustomer(customerId, updatedCustomer);

                if (updated) {
                    res.status(HttpStatus.OK).json(updated);
                } else {
                    res.status(HttpStatus.NOT_FOUND).json({ error: 'Customer not found with ID ' + customerId });
                }
            } catch (error: any) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
            }
        });
    }

    protected registerDelete(router: Router) {
        /**
         * @swagger
         * /v1/customers/{id}:
         *   delete:
         *     summary: Delete customer by ID
         *     description: Delete a customer by its ID
         *     tags:
         *       - Customers
         *     parameters:
         *       - name: id
         *         in: path
         *         description: Customer ID
         *     responses:
         *       200:
         *         description: Successfully deleted the customer
         *         schema:
         *           $ref: '#/components/schemas/Customer'
         *       404:
         *         description: Customer not found with the specified ID
         *       400:
         *         description: Bad request
         */
        router.delete('/:id', async (req: Request, res: Response) => {
            try {
                const customerId = req.params.id;
                const deletedCustomer = await this.customerRepository.deleteCustomerById(customerId);

                if (deletedCustomer) {
                    res.status(HttpStatus.OK).json(deletedCustomer);
                } else {
                    res.status(HttpStatus.NOT_FOUND).json({ error: 'Customer not found with ID ' + customerId });
                }
            } catch (error: any) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
            }
        });

        return router;
    }

    protected registerGetById(router: Router) {
        /**
         * @swagger
         * /v1/customers/{id}:
         *   get:
         *     summary: Get customer by ID
         *     description: Get a customer by its ID
         *     tags:
         *       - Customers
         *     parameters:
         *       - name: id
         *         in: path
         *         description: Customer ID
         *     responses:
         *       200:
         *         description: Successfully found the customer
         *         schema:
         *           $ref: '#/components/schemas/Customer'
         *       404:
         *         description: Customer not found with the specified ID
         *       400:
         *         description: Bad request
         */
        router.get('/:id', async (req: Request, res: Response) => {
            try {
                const customerId = req.params.id;
                const customer = await this.customerRepository.getCustomerById(customerId);

                if (customer) {
                    res.status(HttpStatus.OK).json(customer);
                } else {
                    res.status(HttpStatus.NOT_FOUND).json({ error: 'Customer not found with ID ' + customerId });
                }
            } catch (error: any) {
                res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
            }
        });
    }

    protected registerGetAllCustomers(router: Router) {
        /**
         * @swagger
         * /v1/customers:
         *   get:
         *     summary: Get a list of customers
         *     description: Get a paginated list of customers
         *     tags:
         *       - Customers
         *     parameters:
         *       - name: page
         *         in: query
         *         description: Page number
         *         type: integer
         *       - name: perPage
         *         in: query
         *         description: Items per page
         *         type: integer
         *     responses:
         *       200:
         *         description: Successfully retrieved customers
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
    }
}