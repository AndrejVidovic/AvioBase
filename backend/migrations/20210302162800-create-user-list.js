'use strict';

const user = require("../models/user");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_list', {
      list_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references:{
          model:'list',
          key:'id',
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE",
      },
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references:{
          model:'user',
          key:'id',
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE",
      },
     
     
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_list');
  }
};