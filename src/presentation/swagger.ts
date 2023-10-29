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
        components: {
            schemas: {
                Customer: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        email: { type: 'string' }
                    },
                },
                Pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'integer' },
                        perPage: { type: 'integer' }
                    },
                },
            }
        }
    },
    apis: ['./src/presentation/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec };
