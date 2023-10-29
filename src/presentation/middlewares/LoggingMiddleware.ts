import { Request, Response, NextFunction } from 'express';

export function LoggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.on('finish', () => {
    console.log(`\n[${new Date().toISOString()}]`);
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    console.log(`Response Status: ${res.statusCode}`);
  });

  next();
}
