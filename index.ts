import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import bodyParser from 'body-parser';
import customerRoutes from './src/routes/customerRoutes';
import { registerCustomMiddleware } from './src/IoC/AddDependencyService';
import { ConsoleService } from './src/services/ConsoleService';
import { seedDatabase } from './src/infrastructure/dbContext';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

registerCustomMiddleware(app);

seedDatabase();

app.use('/customers', customerRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  const contentLines = [
    'API is available at http://localhost:' + port + '/customers',
    'Swagger UI is available at http://localhost:' + port + '/api-docs'];

  ConsoleService.printMessage(contentLines);
});

