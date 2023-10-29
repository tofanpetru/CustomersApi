import { Customer } from "../../persistence/Customer";

export interface ICustomerRepository {
    getCustomerById(customerId: string): Promise<Customer | null>;
    deleteCustomerById(customerId: string): Promise<Customer | null>;
    addCustomer(customer: Customer): Promise<Customer>;
    updateCustomer(customerId: string, updatedCustomer: Customer): Promise<Customer | null>;
}