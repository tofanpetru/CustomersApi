import { Customer } from "../models/Customer";

const db: Customer[] = [];

export const getCustomers = (): Customer[] => {
  return db;
}

export const addCustomer = (customer: Customer): Customer => {
  db.push(customer);
  return customer;
}

export const seedDatabase = (): void => {
    const customer1: Customer = {
      id: 1,
      name: 'Customer 1',
      email: 'customer1@example.com',
    };
  
    const customer2: Customer = {
      id: 2,
      name: 'Customer 2',
      email: 'customer2@example.com',
    };
  
    addCustomer(customer1);
    addCustomer(customer2);
  }