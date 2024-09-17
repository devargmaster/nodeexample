const { User, UserSchema } = require('./models/user.model');
const { Customer, CustomerSchema} = require('./models/customer.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
}

module.exports = setupModels;