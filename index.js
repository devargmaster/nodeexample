import express from 'express';
import cors from 'cors';
import routerApi from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.js';
import { logErrors, boomErrorHandler, errorHandler } from './middlewares/error.handler.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS
const whitelist = [
  'http://localhost:8000',
  'https://hitflow.com.ar',
  'https://whispering-brook-12889-24774d694fdb.herokuapp.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
};

app.use(cors(corsOptions));

// Configuración de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Ruta base simple
app.get('/api', (req, res) => {
  res.send('API is running On HitFlow Team 14 septiembre');
});

// Configurar Rutas
routerApi(app); // Asegúrate de llamar a routerApi con app como argumento

// Middlewares de manejo de errores
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});