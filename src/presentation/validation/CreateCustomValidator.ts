import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { HttpStatus } from '../../domain/enums/httpStatus';


export const CreateCustomValidator = (validationRules: ValidationChain[]) => {
    return [
        ...validationRules,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors: errorMessages });
            }
            next();
        },
    ];
};