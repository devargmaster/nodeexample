const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const whitelist = ['http://localhost:8000','https://myapp.co'];
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

app.use(cors());

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
