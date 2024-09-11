const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');
const {models} = require('./../libs/sequelize');
class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return data;
  }

  async find() {

      const rta = await models.User.findAll();
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user)
    {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const rta =  (await this.findOne(id)).update(changes);
    return rta;
  }

  async delete(id) {
    await  this.findOne(id).destroy();
    return { id };
  }
}

module.exports = UserService;
