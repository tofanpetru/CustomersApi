import { Customer } from "../../persistence/Customer";
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { DbContext } from "../../dbContext";
import { GenericRepository } from "../abstract/genericRepository";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";

class CustomerRepository extends GenericRepository<Customer> implements ICustomerRepository {
    constructor(dbContext: DbContext<Customer>) {
        super(dbContext);
        this.seedDatabase();
    }

    async getAll(): Promise<Customer[]> {
        return await this.findAll();
    }

    async createCustomer(newCustomer: Customer): Promise<Customer> {
        return await this.create(newCustomer);
    }

    async findByEmail(email: string): Promise<Customer | null> {
        return Promise.resolve(this.dbContext.items.find((customer) => customer.email === email) || null);
    }

    async updateCustomer(customerId: string, updatedCustomer: Customer): Promise<Customer | null> {
        if (await this.update(customerId, updatedCustomer)) {
            return updatedCustomer;
        }

        return null;
    }

    async getCustomerById(customerId: string): Promise<Customer | null> {
        return await this.findById(customerId);
    }

    async deleteCustomerById(customerId: string): Promise<Customer | null> {
        return await this.delete(customerId);
    }

    private seedDatabase() {
        if (this.dbContext.items.length === 0) {
            for (let i = 0; i < 290; i++) {
                const fakeData: Customer = {
                    _id: uuidv4(),
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                };
                this.dbContext.items.push(fakeData);
            }
        }
    }
}

export default CustomerRepository;
