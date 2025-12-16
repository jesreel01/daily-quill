import config from './index.js'

export const swaggerOptions = {
  openapi: {
    openapi: '3.0.3',
    info: {
      title: 'Daily Quill API',
      description: 'API documentation for Daily Quill application',
      version: '1.0.0',
      contact: {
        name: 'API Support',
        email: 'support@dailyquill.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://${config.host}:${config.port}`,
        description: 'Development server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
    tags: [
      { name: 'users', description: 'User management endpoints' },
      { name: 'health', description: 'Health check endpoints' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        apiKey: {
          type: 'apiKey',
          name: 'x-api-key',
          in: 'header',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer' },
            error: { type: 'string' },
            message: { type: 'string' },
          },
          required: ['statusCode', 'error', 'message'],
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            name: {
              type: 'string',
              description: 'User full name',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
          required: ['id', 'email', 'name'],
        },
      },
    },
    externalDocs: {
      description: 'Find more information here',
      url: 'https://github.com/yourusername/daily-quill',
    },
  },
}

export const swaggerUiOptions = {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    syntaxHighlight: {
      theme: 'monokai',
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
}

export default { swaggerOptions, swaggerUiOptions }
