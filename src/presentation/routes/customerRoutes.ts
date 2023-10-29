import express, { Request, Response, Router } from 'express';
import { Customer } from '../../repository/persistence/Customer';
import { PaginationService } from '../../application/services/PaginationService';
import { ICustomerRepository } from '../../repository/repository/interfaces/ICustomerRepository';
import { CreateCustomerValidator } from '../validation/CreateCustomerValidator';
import { HttpStatus } from '../../domain/enums/httpStatus';

export class CustomerRoutes {
    constructor(private customerRepository: ICustomerRepository) {
    }

    public registerRoutes(): Router {
        const router = express.Router();
        const createCustomerValidator = new CreateCustomerValidator(this.customerRepository);

        /**
         * @swagger
         * /:
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
         *                 $ref: '#/definitions/Customer'
         *             pagination:
         *               $ref: '#/definitions/Pagination'
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

        /**
         * @swagger
         * /:id:
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
         *           $ref: '#/definitions/Customer'
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

        /**
         * @swagger
         * /:
         *   post:
         *     summary: Create a new customer
         *     description: Create a new customer
         *     tags:
         *       - Customers
         *     parameters:
         *       - in: body
         *         name: customer
         *         description: The new customer
         *         required: true
         *         schema:
         *           $ref: '#/definitions/Customer'
         *     responses:
         *       201:
         *         description: Successfully created the customer
         *         schema:
         *           $ref: '#/definitions/Customer'
         *       400:
         *         description: Bad request
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

        /**
         * @swagger
         * /:id:
         *   put:
         *     summary: Update customer by ID
         *     description: Update a customer by its ID
         *     tags:
         *       - Customers
         *     parameters:
         *       - name: id
         *         in: path
         *         description: Customer ID
         *       - in: body
         *         name: customer
         *         description: The updated customer
         *         required: true
         *         schema:
         *           $ref: '#/definitions/Customer'
         *     responses:
         *       200:
         *         description: Successfully updated the customer
         *         schema:
         *           $ref: '#/definitions/Customer'
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

        /**
         * @swagger
         * /:id:
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
         *           $ref: '#/definitions/Customer'
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
}