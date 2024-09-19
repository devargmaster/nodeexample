import Joi from 'joi';

const id = Joi.string().uuid();
const name = Joi.string().max(100);
const price = Joi.number().min(1);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image : image.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image : image
});

const getProductSchema = Joi.object({
  id: id.required()
});

export  { getProductSchema, createProductSchema, updateProductSchema };
