const express = require('express');
const routerApi = require('./routes');
const swaggerDocs = require('./swagger');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
  ],
});
const {
  logErrors,
  ormErrorHandler,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
// Integracion de  Swagger

app.use(express.json());
const whitelist = ['http://localhost:8000', 'https://hitflow.com.ar'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};

app.use(cors());
app.get('/api', (req, res) => {
  res.send('Server Express HitFlow');
});

routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

swaggerDocs(app, port);
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
