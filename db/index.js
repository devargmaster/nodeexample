const { User, UserSchema } = require('./models/user.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModels;