'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.addColumn(
      "company",// name of the Source model/table
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
      
    ),
    queryInterface.addColumn(
      "company",// name of the Source model/table
      "list_id",// name of the key to be added
      {
        type:Sequelize.INTEGER,
        references:{
          model:"list",
          key:"id",
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE",
      } 
      
    )])
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.removeColumn(
      "company", // name of Source model
      "user_id" // key we want to remove
    ),
    queryInterface.removeColumn(
      "company", // name of Source model
      "list_id" // key we want to remove
    ),
    
  ]);
    }
};
