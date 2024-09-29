import express from 'express';
import ProductController from '../controllers/product.controller.js';
import validationHandler from '../middlewares/validator.handler.js';
import { createProductSchema, getProductSchema, updateProductSchema } from '../schemas/product.schema.js';

const router = express.Router();
const service = new ProductController();

router.get('/', async (req, res, next) => {
    try {
        res.json(await service.find());
    } catch (error) {
        next(error);
    }
}   );

router.get('/:id',  
    validationHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validationHandler(createProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newProduct = await service.create(body);
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validationHandler(getProductSchema, 'params'),
    validationHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validationHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            res.json(await service.delete(id));
        } catch (error) {
            next(error);
        }
    }
);

export default router;