import boom from '@hapi/boom';
import sequelize from '../libs/sequelize.cjs';
const { models } = sequelize;
class UserController {
  constructor() {}

  async create(req,res,next) {
    try{
      const data = req.body;
      const newUser = await models.User.create(data);
      res.status(201).json(newUser);
    }
    catch (error){
      next(error);
    }
    
  }

  async find(req, res, next) {
    try {
      const users = await models.User.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = await models.User.findByPk(id);
      if (!user) {
        throw boom.notFound('User not found');
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const changes = req.body;
      const user = await this.findOne(id);
      const updatedUser = await user.update(changes);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.findOne(id);
      await user.destroy();
      res.json({ id });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController;
