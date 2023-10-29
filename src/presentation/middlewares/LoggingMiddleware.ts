import { Request, Response, NextFunction } from 'express';

export function LoggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${req.statusCode}`);
  next();
}
