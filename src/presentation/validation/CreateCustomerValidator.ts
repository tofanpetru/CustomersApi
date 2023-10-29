import { body, check } from "express-validator";
import { ICustomerRepository } from "../../repository/repository/interfaces/ICustomerRepository";
import { CreateCustomValidator } from "./CreateCustomValidator";

export class CreateCustomerValidator {
    constructor(private customerRepository: ICustomerRepository) { }

    getValidator() {
        return CreateCustomValidator([
            body('name')
                .notEmpty()
                .withMessage("'Full Name' must not be empty."),
            body('email')
                .isEmail()
                .withMessage("'Email' must be a valid email address.")
                .notEmpty()
                .withMessage("'Email' must not be empty.")
                .custom(async (email) => {
                    if (await this.customerRepository.findByEmail(email)) {
                        throw new Error('Email address is already in use.');
                    }

                    return false;
                })
        ]);
    }
}