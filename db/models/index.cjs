const { Customer, CustomerSchema } = require('./customer.model.cjs');
const { User, UserSchema } = require('./user.model.cjs');
const { Category, CategorySchema } = require('./category.model.cjs');
const { Product, ProductSchema } = require('./product.model.cjs');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}

module.exports = setupModels;