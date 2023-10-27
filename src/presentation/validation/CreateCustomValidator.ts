import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';


export const CreateCustomValidator = (validationRules: ValidationChain[]) => {
    return [
        ...validationRules,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                return res.status(400).json({ errors: errorMessages });
            }
            next();
        },
    ];
};