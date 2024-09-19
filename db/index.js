import { Customer,CustomerSchema } from './models/customer.model.js';
import { User,UserSchema } from './models/user.model.js';
function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
}

export default setupModels;