const express = require('express');
const productsRouter = require('./products.router');
const userRouter = require('./users.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1',router),
  router.use('/products', productsRouter);
  router.use('/users',userRouter);
  router.use('/categories',productsRouter);
}

module.exports = routerApi;
