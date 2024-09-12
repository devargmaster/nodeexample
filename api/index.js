const express = require('express');
const routerApi = require('./routes');
const swaggerDocs = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
// Integracion de  Swagger


const whitelist = ['http://localhost:8000','https://hitflow.com.ar','https://whispering-brook-12889-24774d694fdb.herokuapp.com'];
const options = {
  origin : (origin, callback) => {
    if (whitelist.includes(origin) || !origin)
    {
      callback(null,true)
    }
    else {
      callback(new Error('No permitido'));
    }
  }
}

app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (como las de Swagger UI)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json()); // Middleware para parsear JSON

// Configurar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configurar Rutas
routerApi(app);

// Middlewares de manejo de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});