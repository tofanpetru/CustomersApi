import { Customer } from "../../persistence/Customer";

export interface ICustomerRepository {
    getAll(): Promise<Customer[]>;
    createCustomer(newCustomer: Customer): Promise<Customer>;
    updateCustomer(customerId: string, updatedCustomer: Customer): Promise<Customer | null>;
    getCustomerById(customerId: string): Promise<Customer | null>;
    deleteCustomerById(customerId: string): Promise<Customer | null>;
}