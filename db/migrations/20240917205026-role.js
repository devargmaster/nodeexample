'use strict';
const {UserSchema, USER_TABLE} = require('./../models/user.model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verificar si la columna ya existe antes de intentar crearla
    const tableDescription = await queryInterface.describeTable('users');
    if (!tableDescription.role) {
      await queryInterface.addColumn('users', 'role', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'user',
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'role');
  },
};
