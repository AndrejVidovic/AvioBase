'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('aircraft', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      registration: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      old: {
        type: Sequelize.DECIMAL
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('aircraft');
  }
};