import boom from '@hapi/boom';
import sequelize from '../libs/sequelize.cjs';
import Joi from 'joi';
const {models} = sequelize;
const createCustomerSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    userId: Joi.number().integer().required(),
    phone: Joi.string().optional(),
  });
class CustomerController {
    constructor() { }
    async find() {
        const rta = await models.Customer.findAll({ include: ['user'] });
        return rta;
    }
    async findOne(id) {
        const user = await models.Customer.findByPk(id); if (!user) { throw boom.notFound('customer not found'); }
        return user;
    }
   
    async create(req, res, next) {
        try {
          const { error, value } = createCustomerSchema.validate(req.body);
          if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }
    
          const newCustomer = await models.Customer.create(value);
          res.status(201).json(newCustomer);
        } catch (error) {
          console.error('Error creating customer:', error); // Log the full error
          if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Foreign key constraint error: userId does not exist or is duplicated' });
          }
          return res.status(500).json({ error: 'Internal server error' });
        }
      }

    async update(id, changes) {
        const model = await this.findOne(id);
        const rta = await model.update(changes);
        return rta;
    }
    async delete(id) {
        const model = await this.findOne(id);
        await model.destroy();
        return { rta: true };
    }
}

export default new CustomerController;