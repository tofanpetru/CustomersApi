import { Customer } from "./persistence/Customer";
import { faker } from '@faker-js/faker';

const db: Customer[] = [];

export const getCustomers = (): Customer[] => {
  return db;
}

export const getCustomerById = (customerId: number) => {

  if (isNaN(customerId) || customerId < 1) {
    throw new Error('Invalid customer id: ' + customerId);
  }

  const customer = db.find((c) => c.id === customerId);

  if (customer) {
    return customer;
  }

  throw new Error('Customer with Id' + customerId + ' does not exist');
};

export const deleteCustomerById = (customerId: number) => {
  if (isNaN(customerId) || customerId < 1) {
    throw new Error('Invalid customer ID: ' + customerId);
  }

  const existingCustomerIndex = db.findIndex((c) => c.id === customerId);

  if (existingCustomerIndex === -1) {
    throw new Error('Customer with ID ' + customerId + ' does not exist');
  }

  const deletedCustomer = db.splice(existingCustomerIndex, 1)[0];

  return deletedCustomer;
};

export const addCustomer = (customer: Customer): Customer => {
  const existingCustomer = db.find((c) => c.email === customer.email);
  //add valdiation for id, name.
  if (existingCustomer) {
    throw new Error('Customer with the same email already exists');
  }

  db.push(customer);
  return customer;
};

export const updateCustomer = (customerId: number, updatedCustomer: Customer): Customer | undefined => {
  const existingCustomerIndex = db.findIndex((c) => c.id === customerId);

  if (existingCustomerIndex === -1) {
    throw new Error('Customer with the specified id:' + customerId + ' does not exist');
  }

  const existingCustomer = db[existingCustomerIndex];

  db[existingCustomerIndex] = {
    ...existingCustomer,
    name: updatedCustomer.name,
  };

  return db[existingCustomerIndex];
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