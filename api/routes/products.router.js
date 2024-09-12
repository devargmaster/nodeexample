const express = require('express');
const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.hander');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');
const router = express.Router();
const service = new ProductsService();

//todo lo que es routing deberia ser solo eso y no incluir logica de negocio
router.get('/', async (req, res,next) => {
  try
  {
    const products = await service.find();
    res.json(products);
  }
  catch(error)
  {
    next(error);
  }
});

router.get('/filter', async (req, res) => {
  res.send('soy filtro');
});


router.get('/:id', validatorHandler(getProductSchema,'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    }
    catch (error) {
      next(error);
    }
  }
);

router.post('/', validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const body = req.body;
  console.log('elbody', body);
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', validatorHandler(updateProductSchema,'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  }
  catch (error) {
    next(error);
  }

});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
}
);
module.exports = router;
