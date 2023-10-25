import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import customerRoutes from './src/routes/customerRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/customers', customerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API is available at http://localhost:${port}/customers`);
});
