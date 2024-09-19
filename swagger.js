// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://whispering-brook-12889-24774d694fdb.herokuapp.com/api/v1'
          : 'http://localhost:3000/api/v1',
      }
    ],
  },
  apis: ['routes/*.js'], // Rutas a tus archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app, port) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at ${process.env.NODE_ENV === 'production' ? 'https://whispering-brook-12889-24774d694fdb.herokuapp.com' : 'http://localhost'}:${port}/api-docs`);
}

export default swaggerDocs;