import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Amber Attire API',
            version: '1.0.0',
            description: 'Enterprise REST API for Amber Attire E-commerce platform',
            contact: {
                name: 'API Support',
                email: 'support@amberattire.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Development Server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/models/*.ts', './src/modules/**/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);
