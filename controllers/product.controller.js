
import { faker, da } from '@faker-js/faker';
import boom from '@hapi/boom';
import {sequelize} from '../libs/sequelize.cjs';

class ProductsService {
  constructor(){
   this.products = [];
  //  this.generate();
  }
  // generate(){
  //   const limit = 100;
  //   for (let index = 0; index <limit; index++){
  //    this.products.push({
  //      id:faker.datatype.uuid(),
  //      name: faker.commerce.productName(),
  //      price: parseInt(faker.commerce.price(),10),
  //      image: faker.image.imageUrl(),
  //      isBlock: faker.datatype.boolean()
  //    });
  //   }
  // }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data // Combina las propiedades de data con las de newProduct
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    // return new Promise((resolve,reject)=>{
    //   setTimeout(()=>{
    //     resolve(this.products);
    //   },5000);
    // });
    const query = 'SELECT * FROM tasks';
    const [data,metadata] = await sequelize.query(query);

    return {
      data,
      metadata
    };
  }

 async  findOne(id){
    const product = this.products.find(item => item.id===id);
    if(!product){
      throw boom.notFound('Product not found');
    }
    if (product.isBlock){
      throw boom.conflict('Product is blocked');
    }
    return product;
  }

 async  update(id,changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];

  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Product not found');
    }
    this.products.splice(index,1);
    return {id};
  }
}

export default ProductsService;
