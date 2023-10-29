import { Customer } from "../../persistence/Customer";
import { DbContext } from "../../dbContext";
import { GenericRepository } from "../abstract/genericRepository";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";

class CustomerRepository extends GenericRepository<Customer> implements ICustomerRepository {
    constructor(dbContext: DbContext<Customer>) {
        super(dbContext);
    }

    async getAll(): Promise<Customer[]> {
        return await this.findAll();
    }

    async createCustomer(newCustomer: Customer): Promise<Customer> {
        return await this.create(newCustomer);
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
}

export default CustomerRepository;
