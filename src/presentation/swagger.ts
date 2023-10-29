import swaggerJsdoc from 'swagger-jsdoc';

const versions = ['v1', 'v2'];

const swaggerSpecs: any[] = [];

versions.forEach(version => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: `Customer API (v${version})`,
                version: version,
                description: `API for managing customers - Version ${version}`,
            },
            servers: [
                {
                    url: `http://localhost:3000/${version}`,
                },
            ],
            components: {
                schemas: {
                    Customer: {
                        type: 'object',
                        properties: {
                            name: { type: 'string' },
                            email: { type: 'string' },
                        },
                    },
                    Pagination: {
                        type: 'object',
                        properties: {
                            page: { type: 'integer' },
                            perPage: { type: 'integer' },
                        },
                    },
                },
            },
        },
        apis: [`./src/presentation/routes/${version}/*.ts`, './src/presentation/routes/*.ts'],
    };

    const swaggerSpec = swaggerJsdoc(options);
    swaggerSpecs.push(swaggerSpec);
});

const combinedSwaggerSpec = swaggerSpecs.reduce((combined, spec) => {
    combined.paths = { ...combined.paths, ...spec.paths };
    combined.components.schemas = { ...combined.components.schemas, ...spec.components.schemas };
    return combined;
}, swaggerSpecs[0]);

export { combinedSwaggerSpec };