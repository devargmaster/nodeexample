const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler } = require('./middlewares/error.handler');
const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);
app.use(logErrors);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
