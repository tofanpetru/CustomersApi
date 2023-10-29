import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../domain/enums/httpStatus';

function ErrorHandlingMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    error: 'An error occurred while processing your request.',
    message: err.message
  });
}

export default ErrorHandlingMiddleware;
