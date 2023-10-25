import { Customer } from './src/models/Customer';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Customer API',
            version: '1.0.0',
            description: 'API for managing customers',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec };
