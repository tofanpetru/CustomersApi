import { Customer } from "../models/Customer";
import { faker } from '@faker-js/faker';

const db: Customer[] = [];

export const getCustomers = (): Customer[] => {
  return db;
}

export const addCustomer = (customer: Customer): Customer => {
  const existingCustomer = db.find((c) => c.email === customer.email);

  if (existingCustomer) {
    throw new Error('Customer with the same email already exists');
  }

  db.push(customer);
  return customer;
};


export const seedDatabase = (numberOfEntries: number): void => {
  for (let i = 1; i <= numberOfEntries; i++) {
    const customer: Customer = {
      id: i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };

    addCustomer(customer);
  }
}