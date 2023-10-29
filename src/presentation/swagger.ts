import swaggerJsdoc from "swagger-jsdoc";

export function generateSwaggerSpec(version: number) {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: `Customer API (v${version.toString()})`,
                version: version.toString(),
                description: `API for managing customers - Version ${version.toString()}`,
            },
            servers: [
                {
                    url: `http://localhost:3000/v${version.toString()}`,
                },
                {
                    url: `http://localhost:3000/v${version.toString()}`,
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
                    }
                },
            },
        },
        apis: [`./src/presentation/routes/v${version}/*.ts`, './src/presentation/routes/defaultRoute.ts'],
    };

    return swaggerJsdoc(options);
}