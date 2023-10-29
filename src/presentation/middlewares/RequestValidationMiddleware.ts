import { Request, Response, NextFunction } from 'express';

export function RequestValidationMiddleware(
    requiredProps: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors: string[] = [];

        requiredProps.forEach(prop => {
            if (!req.body[prop]) {
                errors.push(`'${prop}' must not be empty.`);
            }
        });

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        next();
    };
}
