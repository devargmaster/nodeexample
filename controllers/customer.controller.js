import boom from '@hapi/boom';
import sequelize from '../libs/sequelize.cjs';

const {models} = sequelize;
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
    async create(data) {
        const newCustomer = await models.Customer.create(data, {
            include: ['user']
        }); return newCustomer;
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