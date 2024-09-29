
import boom from '@hapi/boom';
import sequelize from '../libs/sequelize.cjs';

const { models } = sequelize;

class ProductController {
  constructor(){
   this.models =sequelize.models;
  }


  async create(data) {
    const newProduct = await this.models.Product.create(data);
    return newProduct;
  }

  async find(){
    const products = await this.models.Product.findAll();
    return products;
  }

 async  findOne(id){
    const product = await this.models.Product.findByPk(id);
    if(!product){
      throw boom.notFound('Product not found');
    }
    return product;
  }

 async  update(id,changes){
    const product = await this.findOne(id);
    const updatedProduct = await product.update(changes);
    return updatedProduct;

  }

  async delete(id){
    const product = await this.findOne(id);
    await product.destroy();
    return {id};
  }
}

export default ProductController;
