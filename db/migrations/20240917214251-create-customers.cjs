'use strict';

const {CustomerSchema, CUSTOMER_TABLE} = require('../models/customer.model.cjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CUSTOMER_TABLE,CustomerSchema);
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.drop(CUSTOMER_TABLE);
  }
};

