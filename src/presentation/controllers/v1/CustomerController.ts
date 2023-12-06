import {Customer} from "../../../repository/persistence/Customer";
import {HttpStatus} from "../../../domain/enums/httpStatus";
import {Request, Response} from "express";
import {ICustomerRepository} from "../../../repository/repository/interfaces/ICustomerRepository";
import {PaginationService} from "../../../application/services/PaginationService";

export class CustomerController {

    constructor(protected customerRepository: ICustomerRepository) {}

    public async createNewCustomer(req: Request, res: Response) {
        try {
            const newCustomer: Customer = req.body;
            const addedCustomer = await this.customerRepository.createCustomer(newCustomer);

            res.status(HttpStatus.CREATED).json(addedCustomer);
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({error: error.message});
        }
    }

    public async updateCustomer(req: Request, res: Response) {
        try {
            const customerId = req.params.id;
            const updatedCustomer: Customer = req.body;

            const updated = await this.customerRepository.updateCustomer(customerId, updatedCustomer);

            if (updated) {
                res.status(HttpStatus.OK).json(updated);
            } else {
                res.status(HttpStatus.NOT_FOUND).json({error: 'Customer not found with ID ' + customerId});
            }
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({error: error.message});
        }
    }

    public async deleteCustomer(req: Request, res: Response) {
        try {
            const customerId = req.params.id;
            const deletedCustomer = await this.customerRepository.deleteCustomerById(customerId);

            if (deletedCustomer) {
                res.status(HttpStatus.OK).json(deletedCustomer);
            } else {
                res.status(HttpStatus.NOT_FOUND).json({error: 'Customer not found with ID ' + customerId});
            }
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({error: error.message});
        }
    }

    public async getByID(req: Request, res: Response) {
        try {
            const customerId = req.params.id;
            const customer = await this.customerRepository.getCustomerById(customerId);

            if (customer) {
                res.status(HttpStatus.OK).json(customer);
            } else {
                res.status(HttpStatus.NOT_FOUND).json({error: 'Customer not found with ID ' + customerId});
            }
        } catch (error: any) {
            res.status(HttpStatus.BAD_REQUEST).json({error: error.message});
        }
    }

    public async getAllCustomers(req: Request, res: Response) {
        const {page, perPage} = req.query;
        const customers = await this.customerRepository.getAll();

        const paginationService = new PaginationService<Customer>(customers);

        const paginatedData = paginationService.paginate({
            page: parseInt(page as string) || 1,
            perPage: parseInt(perPage as string) || 10,
            controllerName: 'customers',
        });

        res.json(paginatedData);
    }
}