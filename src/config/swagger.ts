import swaggerJSDoc from 'swagger-jsdoc'

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RESTful Journey API',
      version: '1.0.0',
      description: 'API documentation for Journey App'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: [
    './src/route/*.ts',
    './src/controller/*.ts',
    './src/docs/swaggerDocs.ts'
  ]
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
