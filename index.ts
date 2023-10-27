import express from 'express';
import { ConsoleService } from './src/application/services/ConsoleService';
import { registerDependencies } from './src/IoC/AddDependencyService';

const port = process.env.PORT || 3000;

const app = express();
registerDependencies(app);

app.listen(port, () => {
  const contentLines = [
    'API is available at http://localhost:' + port + '/customers',
    'Swagger UI is available at http://localhost:' + port + '/api-docs'];

  ConsoleService.printMessage(contentLines);
});