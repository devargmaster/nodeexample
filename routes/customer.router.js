import express from 'express';
import CustomerController from '../controllers/customer.controller.js';
import validationHandler from '../middlewares/validator.handler.js';
import { createCustomerSchema, getCustomerSchema, updateCustomerSchema, } from '../schemas/customer.schema.js';

const router = express.Router();
const service = CustomerController;


router.get('/', async (req, res, next) => {
    try { res.json(await service.find()); } catch (error) { next(error); }
});
router.post('/', validationHandler(createCustomerSchema, 'body'), CustomerController.create);

router.patch('/:id', validationHandler(getCustomerSchema, 'params'), validationHandler(updateCustomerSchema, 'body'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const body = req.body; res.status(201).json(await service.update(id, body));
    } catch (error) {
        next(error);
    }
});
router.delete('/:id', validationHandler(getCustomerSchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        res.status(200).json(await service.delete(id));
    }
    catch (error) {
        next(error);
    }
});

export default router;