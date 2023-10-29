import { Request, Response, NextFunction } from 'express';

export function LoggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction) {
  res.on('finish', () => console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`));
  next();
}
