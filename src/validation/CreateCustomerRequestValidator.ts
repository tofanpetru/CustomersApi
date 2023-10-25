import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const CreateCustomerRequestValidator = [
  body('name')
    .notEmpty()
    .withMessage("'Full Name' must not be empty."),
  body('email')
    .notEmpty()
    .withMessage("'Email' must not be empty.")
    .isEmail()
    .withMessage("'Email' must be a valid email address."),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
];
