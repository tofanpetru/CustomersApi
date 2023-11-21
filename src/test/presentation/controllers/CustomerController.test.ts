import {CustomerController} from "../../../presentation/controllers/v1/customerController";
import {DbContext} from '../../../repository/dbContext';
import {Customer} from '../../../repository/persistence/Customer';
import CustomerRepository from '../../../repository/repository/implementations/customerRepository';
import {HttpStatus} from "../../../domain/enums/httpStatus";
import {describe, expect, jest, test} from '@jest/globals';

describe('Test Example: Create new customer controller', () => {

    const dbContext = new DbContext<Customer>();
    const customerRepository = new CustomerRepository(dbContext);
    const controller = new CustomerController(customerRepository);

    test('Should create new customer and respond with status code 201', async () => {
        const payload = {
            name: 'foo',
            email: 'bar@email.com'
        }

        let req: any = {body: payload};
        let res = {} as unknown as Response;
        res.json = jest.fn();
        res.status = jest.fn(()=> res);

        await controller.createNewCustomer(req, res)
        expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED)
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining(payload))
    })
})

describe('Exercise: Mocked functions',() => {

    test('Mock callback function',() => {
    })
})