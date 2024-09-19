import express from 'express';
import userRouter from './users.router.js';
import customerRouter from './customer.router.js';

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1',router),
  router.use('/users',userRouter);
  router.use('/customers',customerRouter);

}

export default routerApi;
