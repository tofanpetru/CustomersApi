import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import bodyParser from 'body-parser';
import customerRoutes from './src/routes/customerRoutes';
import { AddDependencyService } from './src/IoC/AddDependencyService';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const addDependencyService = new AddDependencyService(app);

addDependencyService.RegisterMiddlewareFromDirectory('./src/middlewares');

app.use('/customers', customerRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  const contentLines = [
    'API is available at http://localhost:' + port + '/customers',
    'Swagger UI is available at http://localhost:' + port + '/api-docs',
  ];

  const maxLength = Math.max(...contentLines.map(line => line.length));

  console.log('Server is running on port ' + port);
  console.log('+' + '-'.repeat(maxLength + 2) + '+');

  for (const line of contentLines) {
    const paddingLength = maxLength - line.length;
    const padding = ' '.repeat(Math.floor(paddingLength / 2));
    console.log(`| ${padding}${line}${padding}${' '.repeat(paddingLength % 2)} |`);
  }

  console.log('+' + '-'.repeat(maxLength + 2) + '+');
});

