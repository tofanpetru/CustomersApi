import {CustomerController} from "../../../presentation/controllers/v1/customerController";
import {DbContext} from '../../../repository/dbContext';
import {Customer} from '../../../repository/persistence/Customer';
import CustomerRepository from '../../../repository/repository/implementations/customerRepository';
import {HttpStatus} from "../../../domain/enums/httpStatus";
import {describe, expect, jest, test} from '@jest/globals';
import {testUtils} from "../../TestProps";

describe('CustomerController', () => {

    describe('Test Examples: createNewCustomer', () => {

        test('Should create new customer and respond with status code 201', async () => {
            const dbContext = new DbContext<Customer>();
            const customerRepository = new CustomerRepository(dbContext);
            const controller = new CustomerController(customerRepository);

            const payload = {
                name: 'foo',
                email: 'bar@email.com'
            }

            let req: any = {body: payload};
            let res = {} as unknown as Response;
            res.json = jest.fn();
            res.status = jest.fn(() => res);

            await controller.createNewCustomer(req, res)
            expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(payload))
        })

        test('On error should respond with status code 400', async () => {
            const dbContext = new DbContext<Customer>();
            let mockedCustomerRepository = new (<any>CustomerRepository)(dbContext) as jest.Mocked<CustomerRepository>;
            const controller = new CustomerController(mockedCustomerRepository);

            mockedCustomerRepository.createCustomer = jest.fn((customer: any) => {
                return new Promise(() => {
                    throw new Error('Bad error');
                })
            })

            const payload = {
                name: 'foo',
                email: 'bar@email.com'
            }

            let req: any = {body: payload};
            let res: any = testUtils.mockResponse()

            await controller.createNewCustomer(req, res)
            expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({}))
        })
    })

    describe('Exercise: getByID', () => {

        /**
         * 1 . Investigate failure and propose a resolution
         */

        test.skip('Should fetch customer by Id and respond with status code 200', async () => {
            const dbContext = new DbContext<Customer>();
            let mockedCustomerRepository = new (<any>CustomerRepository)(dbContext) as jest.Mocked<CustomerRepository>;
            const controller = new CustomerController(mockedCustomerRepository);

            const customer = {
                name: 'foo',
                email: 'updated@email.com'
            }

            mockedCustomerRepository.getCustomerById = jest.fn((id: string) => {
                return new Promise((resolve, reject) => {
                    reject(customer);
                })
            })

            let req: any = {params: {id: 1}};
            let res: any = testUtils.mockResponse()

            await controller.getByID(req, res)
            expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(customer))
        })
    })

    describe('Test Examples: updateCustomer', () => {

        test('Should update customer and respond with status code 200', async () => {
            const dbContext = new DbContext<Customer>();
            let mockedCustomerRepository = new (<any>CustomerRepository)(dbContext) as jest.Mocked<CustomerRepository>;
            const controller = new CustomerController(mockedCustomerRepository);

            mockedCustomerRepository.updateCustomer = jest.fn((id: string, customer: any) => {
                return new Promise((resolve, reject) => {
                    resolve(customer);
                })
            })

            const customer = {
                name: 'foo',
                email: 'updated@email.com'
            }

            let req: any = {params: {id: 1}, body: customer};
            let res: any = testUtils.mockResponse()

            await controller.updateCustomer(req, res)
            expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(customer))
        })

        test('Should respond with 404 if customer not found', async () => {
            const dbContext = new DbContext<Customer>();
            let mockedCustomerRepository = new (<any>CustomerRepository)(dbContext) as jest.Mocked<CustomerRepository>;
            const controller = new CustomerController(mockedCustomerRepository);

            mockedCustomerRepository.updateCustomer = jest.fn((id: string, customer: any) => {
                return new Promise((resolve, reject) => {
                    resolve(undefined);
                })
            })

            const customer = {
                name: 'foo',
                email: 'updated@email.com'
            }

            let req: any = {params: {id: 1}, body: customer};
            let res: any = testUtils.mockResponse()

            await controller.updateCustomer(req, res)
            expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({error: 'Customer not found with ID 1'}))
        })

        test('On error should respond with status code 400', async () => {
            const dbContext = new DbContext<Customer>();
            let mockedCustomerRepository = new (<any>CustomerRepository)(dbContext) as jest.Mocked<CustomerRepository>;
            const controller = new CustomerController(mockedCustomerRepository);

            mockedCustomerRepository.updateCustomer = jest.fn((id: string, customer: any) => {
                return new Promise((resolve, reject) => {
                    throw new Error('Update customer DB error')
                })
            })

            const customer = {
                name: 'foo',
                email: 'updated@email.com'
            }

            let req: any = {params: {id: 1}, body: customer};
            let res: any = testUtils.mockResponse()

            await controller.updateCustomer(req, res)
            expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({error: 'Update customer DB error'}))
        })
    })

    describe('Exercise: deleteCustomer', () => {

        /**
         * 2. Implement 3 tests based on test example above
         */

        test.skip('Should delete customer and respond with status code 200', async () => {})
        test.skip('Should respond with 404 if customer not found', async () => {})
        test.skip('On error should respond with status code 400', async () => {})
    })

    describe('Exercise: getAllCustomers', () => {

        /**
         * 3 . Investigate failure and propose a resolution
         */

        test.skip('Should fetch all customers and respond with status code 201', async () => {
            const dbContext = new DbContext<Customer>();
            let mockedCustomerRepository = new (<any> CustomerRepository)(dbContext) as jest.Mocked<CustomerRepository>;
            const controller = new CustomerController(mockedCustomerRepository);

            const customers = [{
                name: 'foo',
                email: 'updated@email.com'
            }, {
                name: 'foo2',
                email: 'updated2@email.com'
            }]

            mockedCustomerRepository.getAll = jest.fn(() => {
                return new Promise((resolve, reject) => {
                    resolve(customers);
                })
            })

            let req: any = {query: {page: 1, perPage: customers.length}};
            let res: any = testUtils.mockResponse()

            await controller.getAllCustomers(req, res)

            expect(res.json).toHaveBeenCalledTimes(1)
            expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
            let results = res.json.mock.calls[0][0].results
            expect(results).toEqual(customers)
        })
    })
})