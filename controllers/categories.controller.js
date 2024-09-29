import boom from '@hapi/boom';
import sequelize from './../libs/sequelize.cjs';
const { models } = sequelize;
class CategoryController {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

export default new CategoryController;
