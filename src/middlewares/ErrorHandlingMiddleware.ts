import { Request, Response, NextFunction } from 'express';

export function ErrorHandlingMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
}
