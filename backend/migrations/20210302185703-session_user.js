'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.addColumn(
      "session",// name of the Source model/table
      "user_id",// name of the key to be added
      {
        type:Sequelize.INTEGER,
        references:{
          model:"user",
          key:"id",
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE",
      } 
      
    )])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "session", // name of Source model
      "user_id" // key we want to remove
    );
  }
};
