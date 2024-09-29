import express from 'express';
import userRouter from './users.router.js';
import customerRouter from './customer.router.js';
import categoriesRouter from './categories.router.js';
import productsRouter from './products.router.js';

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1',router),
  router.use('/users',userRouter);
  router.use('/customers',customerRouter);
  router.use('/categories',categoriesRouter);
  router.use('/products',productsRouter);
}

export default routerApi;
