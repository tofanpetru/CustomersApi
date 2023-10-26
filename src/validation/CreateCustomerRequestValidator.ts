import { body } from "express-validator";
import { CreateCustomValidator } from "./CreateCustomValidator";

export const CreateCustomerRequestValidator = CreateCustomValidator([
  body('name')
    .notEmpty()
    .withMessage("'Full Name' must not be empty."),
  body('email')
    .notEmpty()
    .withMessage("'Email' must not be empty.")
    .isEmail()
    .withMessage("'Email' must be a valid email address."),
]);
