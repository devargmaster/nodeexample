const express = require('express');
const ProductsService = require('./../services/product.service')
const router = express.Router();
const service = new ProductsService();

//todo lo que es routing deberia ser solo eso y no incluir logica de negocio
router.get('/',(req,res)=>{
  const products = service.find();
  res.json(products);
 });

 router.get('/filter',(req,res) =>{
  res.send('soy filtro');
});


router.get('/:id',(req,res) =>{
const {id} = req.params;
const product = service.findOne(id);
res.json(product);
});

router.post('/',(req,res)=>{
  const body = req.body;
  console.log('elbody',body);
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',(req,res)=>{
  const {id} = req.params;
  const body = req.body;
  const product = service.update(id,body);
  res.json(product);
});

router.delete('/:id',(req,res)=>{
  const {id} = req.params;
  const rta = service.delete(id);
  res.json(rta);
}
);
module.exports = router;
