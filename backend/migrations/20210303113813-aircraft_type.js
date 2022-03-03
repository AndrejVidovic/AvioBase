'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.addColumn(
      "aircraft",// name of the Source model/table
      "type_id",// name of the key to be added
      {
        type:Sequelize.INTEGER,
        references:{
          model:"type",
          key:"id",
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE",
      } 
      
    )])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      "aircraft", // name of Source model
      "type_id" // key we want to remove
    );
  }
};
